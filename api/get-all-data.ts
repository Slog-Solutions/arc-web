// api/get-all-data.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('museum_data');
    const documents = await collection.find({}).toArray();

    // Reduce list of documents to a map of { [id]: data }
    const dataMap = documents.reduce((acc: any, doc: any) => {
      acc[doc._id] = doc.data;
      return acc;
    }, {});

    return res.status(200).json({ success: true, data: dataMap });
  } catch (error: any) {
    console.error('get-all-data api error:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch database data' });
  }
}
