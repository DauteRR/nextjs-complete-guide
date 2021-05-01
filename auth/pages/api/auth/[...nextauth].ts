import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { hashPassword, verifyPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials: { email: string; password: string }) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection('users');

				const user = await usersCollection.findOne({ email: credentials.email });

				if (!user) {
					await client.close();
					throw new Error('Invalid credentials');
				}

				const isValid = await verifyPassword(credentials.password, user.password);

				if (!isValid) {
					await client.close();
					throw new Error('Invalid credentials');
				}

				await client.close();
				return {
					email: user.email,
				};
			},
		}),
	],
});
