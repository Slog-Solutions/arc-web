// server/server.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Configure body-parser with high limit for large base64 file payloads
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

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
