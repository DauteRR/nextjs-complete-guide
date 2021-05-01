import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';

export interface SignupInput {
	email: string;
	password: string;
}

export interface SignupBody extends SignupInput {}

export interface SignupResponse {
	message: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<SignupResponse>) {
	if (req.method === 'POST') {
		const { email, password } = req.body as SignupBody;

		// Dummy validation
		if (!email || !email.includes('@') || !password || password.trim().length < 7) {
			res.status(422).json({ message: 'Invalid input' });
			return;
		}

		console.log('Connecting to database');
		const client = await connectToDatabase(res);
		if (client === undefined) {
			console.error('Connection failed: undefined mongo client');
			res.status(500).json({ message: 'Could not connect to database.' });
			return;
		}

		const db = client.db(process.env.MONGODB_DB_NAME);
		try {
			console.log('Storing user');
			const hashedPassword = await hashPassword(password);

			const result = await db.collection('users').insertOne({
				email,
				password: hashedPassword,
			});
		} catch (err) {
			await client.close();
			console.error('Storing message failed');
			res.status(500).json({ message: 'Storing message failed' });
			return;
		}

		await client.close();
		res.status(201).json({ message: 'Created user!' });
		return;
	}

	res.setHeader('Allow', ['POST']);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
