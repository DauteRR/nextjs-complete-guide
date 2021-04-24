import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface RequestBody {
	email: string;
	feedback: string;
}

interface Feedback {
	timestamp: number;
	email: string;
	feedback: string;
}

interface Response {
	message: string;
	feedback: Feedback;
}

function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (req.method === 'POST') {
		const { email, feedback } = req.body as RequestBody;

		const newFeedback: Feedback = {
			timestamp: Date.now(),
			email,
			feedback,
		};

		const filePath = path.join(process.cwd(), 'data', 'feedback.json');
		const fileData = fs.readFileSync(filePath);
		const data: Feedback[] = JSON.parse(fileData.toString());
		data.push(newFeedback);
		fs.writeFileSync(filePath, JSON.stringify(data));
		res.status(201).json({
			message: 'Sucess',
			feedback: newFeedback,
		});
		return;
	}

	res.setHeader('Allow', ['POST']);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
