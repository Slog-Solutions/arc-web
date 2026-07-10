// server/server.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Configure body-parser with high limit for general JSON transactions
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Configure multer disk storage to save videos directly to public/videos/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = '../public/images';
    if (file.mimetype.startsWith('video/')) {
      folder = '../public/videos';
    }
    const uploadPath = path.join(__dirname, folder);
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    // Sanitize filename to avoid spaces and special characters
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${base}_${Date.now()}${ext}`);
  }
});

const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 200 * 1024 * 1024 } // 200MB video file limit
});

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ Error: MONGODB_URI is not defined in parent directory's .env file!");
  process.exit(1);
}

const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("✅ Connected successfully to MongoDB Atlas!");
    db = client.db('arc_museum');
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

  // 1. Endpoint to handle video uploads by writing directly to public/videos/
  app.post('/api/upload-video', upload.single('video'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No video file provided' });
      }

      console.log(`✅ Saved video file locally: ${req.file.filename} (${req.file.size} bytes)`);
      
      // Return the public URL path served by Vite
      const publicUrl = `/videos/${req.file.filename}`;
      res.json({ success: true, url: publicUrl });

    } catch (err) {
      console.error("Local upload handler error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // 2. Endpoint to handle image uploads by writing directly to public/images/
  app.post('/api/upload-image', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      console.log(`✅ Saved image file locally: ${req.file.filename} (${req.file.size} bytes)`);
      
      // Return the public URL path served by Vite
      const publicUrl = `/images/${req.file.filename}`;
      res.json({ success: true, url: publicUrl });

    } catch (err) {
      console.error("Local image upload handler error:", err);
      res.status(500).json({ error: err.message });
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
