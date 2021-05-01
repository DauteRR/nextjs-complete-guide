import { MongoClient } from 'mongodb';
import { NextApiResponse } from 'next';

export async function connectToDatabase(res?: NextApiResponse): Promise<MongoClient> {
	let client: MongoClient;

	try {
		client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (err) {
		console.error('Connection failed:', err.message);
		if (res) res.status(500).json({ message: 'Could not connect to database.' });
	}

	return client;
}
