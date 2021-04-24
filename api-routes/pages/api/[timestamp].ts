import { NextApiRequest, NextApiResponse } from 'next';
import { buildFeedbackPath, extractData, Feedback } from './feedback';

interface Response {
	feedback: Feedback;
}

function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (req.method === 'GET') {
		const { timestamp } = req.query as { timestamp: string };

		const filePath = buildFeedbackPath();
		const data = extractData(filePath);
		const feedback = data.find(item => item.timestamp === parseInt(timestamp));

		res.status(200).json({ feedback });
		return;
	}

	res.setHeader('Allow', ['GET']);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
