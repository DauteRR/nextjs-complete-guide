import { NextApiRequest, NextApiResponse } from 'next';

interface NewsletterSubscriptionBody {
	email: string;
}

interface NewsletterSubscriptionResponse {
	message: string;
}

function handler(req: NextApiRequest, res: NextApiResponse<NewsletterSubscriptionResponse>) {
	if (req.method === 'POST') {
		const { email } = req.body as NewsletterSubscriptionBody;

		// Dummy validation
		if (!email || !email.includes('@')) {
			res.status(422).json({ message: 'Invalid email address' });
			return;
		}

		console.log(email);

		res.status(201).json({ message: 'Success!!' });
		return;
	}

	res.setHeader('Allow', ['POST']);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
