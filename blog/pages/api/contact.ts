import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export interface MessageInput {
	email: string;
	name: string;
	content: string;
}

export interface Message extends MessageInput {
	id: string;
}

export interface ContactBody extends MessageInput {}

export interface ContactResponse {
	message: string;
	result?: Message;
}

async function connectToDatabase(res: NextApiResponse<ContactResponse>): Promise<MongoClient> {
	let client: MongoClient;

	try {
		client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (err) {
		console.error('Connection failed:', err.message);
		res.status(500).json({ message: 'Could not connect to database.' });
	}

	return client;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ContactResponse>) {
	if (req.method === 'POST') {
		const { email, name, content } = req.body as ContactBody;

		// Dummy validation
		if (
			!email ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!content ||
			content.trim() === ''
		) {
			res.status(422).json({ message: 'Invalid input' });
			return;
		}

		const newMessage: Message = { id: '', email, name, content };

		console.log('Connecting to database');
		const client = await connectToDatabase(res);
		if (client === undefined) {
			console.error('Connection failed: undefined mongo client');
			res.status(500).json({ message: 'Could not connect to database.' });
			return;
		}

		const db = client.db(process.env.MONGODB_DB_NAME);
		try {
			console.log('Storing message');
			const result = await db.collection('messages').insertOne(newMessage);
			newMessage.id = result.insertedId;
		} catch (err) {
			await client.close();
			console.error('Storing message failed');
			res.status(500).json({ message: 'Storing message failed' });
			return;
		}

		await client.close();
		res.status(201).json({ message: 'Success!!', result: newMessage });
		return;
	}

	res.setHeader('Allow', ['POST']);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
