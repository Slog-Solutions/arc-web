// server/server.js
const express = require('express');
const cors = require('cors');
const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Configure body-parser with high limit for general JSON transactions
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Configure multer memory storage for GridFS uploads
const upload = multer({ 
  storage: multer.memoryStorage(), 
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB video file limit
});

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ Error: MONGODB_URI is not defined in parent directory's .env file!");
  process.exit(1);
}

const client = new MongoClient(uri);
let db;
let bucket;

async function connectDB() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("✅ Connected successfully to MongoDB Atlas!");
    db = client.db('arc_museum');
    bucket = new GridFSBucket(db, { bucketName: 'videos' });
  } catch (err) {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1);
  }
}

connectDB().then(() => {
  // Routes
  app.get('/api/get-all-data', async (req, res) => {
    try {
      const collection = db.collection('museum_data');
      const documents = await collection.find({}).toArray();
      const dataMap = documents.reduce((acc, doc) => {
        acc[doc._id] = doc.data;
        return acc;
      }, {});
      res.json({ success: true, data: dataMap });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 1. Endpoint to handle video uploads directly to MongoDB GridFS
  app.post('/api/upload-video', upload.single('video'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No video file provided' });
      }

      console.log(`Uploading video file to GridFS: ${req.file.originalname} (${req.file.size} bytes)`);
      
      const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });

      uploadStream.write(req.file.buffer);
      uploadStream.end();

      uploadStream.on('finish', () => {
        const fileId = uploadStream.id;
        console.log(`✅ Uploaded successfully to GridFS! ID: ${fileId}`);
        res.json({ success: true, url: `/api/video-stream?id=${fileId}` });
      });

      uploadStream.on('error', (err) => {
        console.error("GridFS upload stream error:", err);
        res.status(500).json({ error: err.message });
      });

    } catch (err) {
      console.error("Upload handler error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // 2. Endpoint to stream videos with HTTP Range support for seeking
  app.get('/api/video-stream', async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return res.status(400).send("Video ID is required");
    }

    try {
      const fileId = new ObjectId(id);
      
      // Fetch metadata to check if file exists and get size
      const filesCollection = db.collection('videos.files');
      const fileMetadata = await filesCollection.findOne({ _id: fileId });

      if (!fileMetadata) {
        return res.status(404).send("Video not found");
      }

      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileMetadata.length - 1;
        const chunksize = (end - start) + 1;

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileMetadata.length}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': fileMetadata.contentType || 'video/mp4',
        });

        const downloadStream = bucket.openDownloadStream(fileId, {
          start,
          end: end + 1 // download stream end is exclusive
        });

        downloadStream.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileMetadata.length,
          'Content-Type': fileMetadata.contentType || 'video/mp4',
        });

        const downloadStream = bucket.openDownloadStream(fileId);
        downloadStream.pipe(res);
      }
    } catch (err) {
      console.error("Video stream error:", err);
      res.status(500).send("Error streaming video");
    }
  });

  app.post('/api/save-data', async (req, res) => {
    const { id, data } = req.body || {};
    if (!id) {
      return res.status(400).json({ error: 'Document ID is required' });
    }
    try {
      const collection = db.collection('museum_data');
      await collection.updateOne(
        { _id: id },
        { $set: { data, updatedAt: Date.now() } },
        { upsert: true }
      );
      res.json({ success: true });
    } catch (err) {
      console.error("Save error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/reset-data', async (req, res) => {
    const { id, all } = req.body || {};
    try {
      const collection = db.collection('museum_data');
      if (all) {
        await collection.deleteMany({});
        return res.json({ success: true, message: 'All data database reset' });
      }
      if (!id) {
        return res.status(400).json({ error: 'Document ID or all flag is required' });
      }
      await collection.deleteOne({ _id: id });
      res.json({ success: true, message: `Document ${id} reset` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`🚀 Express backend server running on http://localhost:${PORT}`);
  });
});
