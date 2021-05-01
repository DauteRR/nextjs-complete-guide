import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, verifyPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';
import { getSession } from 'next-auth/client';

export interface ChangelPasswordInput {
	newPassword: string;
	oldPassword: string;
}

export interface ChangePasswordBody extends ChangelPasswordInput {}

export interface ChangePasswordResponse {
	message: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ChangePasswordResponse>) {
	if (req.method === 'PATCH') {
		const { newPassword, oldPassword } = req.body as ChangePasswordBody;

		const session = await getSession({ req });

		if (!session) {
			res.status(401).json({ message: 'Unathorized' });
			return;
		}

		const { email } = session.user;

		// Dummy validation
		if (!newPassword || newPassword.trim().length < 7) {
			res.status(422).json({ message: 'Invalid input' });
			return;
		}

		const client = await connectToDatabase(res);
		if (client === undefined) {
			res.status(500).json({ message: 'Could not connect to database.' });
			return;
		}

		const db = client.db(process.env.MONGODB_DB_NAME);
		const user = await db.collection('users').findOne({ email });

		if (!user) {
			await client.close();
			res.status(422).json({ message: 'User not found' });
			return;
		}

		const passwordsAreEqual = await verifyPassword(oldPassword, user.password);

		if (!passwordsAreEqual) {
			await client.close();
			res.status(403).json({ message: 'Wrong old password!' });
			return;
		}

		const hashedNewPassword = await hashPassword(newPassword);

		try {
			await db.collection('users').updateOne({ email }, { $set: { password: hashedNewPassword } });
		} catch (err) {
			await client.close();
			res.status(500).json({ message: 'Password update failed failed' });
			return;
		}

		await client.close();
		res.status(200).json({ message: 'Password updated' });
		return;
	}

	res.setHeader('Allow', ['PATCH']);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
