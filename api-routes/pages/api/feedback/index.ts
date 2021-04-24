import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface RequestBody {
	email: string;
	feedback: string;
}

export interface Feedback {
	timestamp: number;
	email: string;
	feedback: string;
}

interface PostResponse {
	message: string;
	feedback: Feedback;
}

export interface GetResponse {
	feedback: Feedback[];
}

export function buildFeedbackPath(): string {
	return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractData(filePath: string): Feedback[] {
	const fileData = fs.readFileSync(filePath);
	return JSON.parse(fileData.toString()) as Feedback[];
}

function saveData(filePath: string, data: Feedback[]): void {
	fs.writeFileSync(filePath, JSON.stringify(data));
}

function handler(req: NextApiRequest, res: NextApiResponse<PostResponse | GetResponse>) {
	if (req.method === 'POST') {
		const { email, feedback } = req.body as RequestBody;

		const newFeedback: Feedback = {
			timestamp: Date.now(),
			email,
			feedback,
		};

		const filePath = buildFeedbackPath();
		const data = extractData(filePath);
		data.push(newFeedback);
		saveData(filePath, data);

		res.status(201).json({
			message: 'Sucess',
			feedback: newFeedback,
		});
		return;
	}

	if (req.method === 'GET') {
		const filePath = buildFeedbackPath();
		const data = extractData(filePath);

		res.status(200).json({ feedback: data });
		return;
	}

	res.setHeader('Allow', ['POST', 'GET']);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
