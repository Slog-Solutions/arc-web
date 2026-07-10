// api/save-data.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, data } = req.body || {};

  if (!id) {
    return res.status(400).json({ error: 'Document ID is required' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('museum_data');

    await collection.updateOne(
      { _id: id },
      { $set: { data, updatedAt: Date.now() } },
      { upsert: true }
    );

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('save-data api error:', error);
    return res.status(500).json({ error: error.message || 'Failed to save data' });
  }
}
