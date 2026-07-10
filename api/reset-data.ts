// api/reset-data.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, all } = req.body || {};

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('museum_data');

    if (all) {
      await collection.deleteMany({});
      return res.status(200).json({ success: true, message: 'All data database reset' });
    }

    if (!id) {
      return res.status(400).json({ error: 'Document ID or all flag is required' });
    }

    await collection.deleteOne({ _id: id });
    return res.status(200).json({ success: true, message: `Document ${id} reset` });
  } catch (error: any) {
    console.error('reset-data api error:', error);
    return res.status(500).json({ error: error.message || 'Failed to reset data' });
  }
}
