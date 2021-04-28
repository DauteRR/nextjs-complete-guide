import { NextApiRequest, NextApiResponse } from 'next';
import { registerEmail } from '../../data/register-email';

interface NewsletterSubscriptionBody {
	email: string;
}

export interface NewsletterSubscriptionResponse {
	message: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<NewsletterSubscriptionResponse>) {
	// Delay simulation
	await new Promise(resolve => setTimeout(resolve, Math.random() * (3000 - 1000) + 1000));

	if (req.method === 'POST') {
		const { email } = req.body as NewsletterSubscriptionBody;

		// Dummy validation
		if (!email || !email.includes('@') || email === '') {
			res.status(422).json({ message: 'Invalid email address' });
			return;
		}

		try {
			await registerEmail(email);
			res.status(201).json({ message: 'Success!!' });
			return;
		} catch (error) {
			res.status(422).json({ message: error.message });
			return;
		}
	}

	res.setHeader('Allow', ['POST']);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
