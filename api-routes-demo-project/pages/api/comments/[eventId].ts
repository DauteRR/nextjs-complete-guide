import { NextApiRequest, NextApiResponse } from 'next';

export interface CommentInput {
	email: string;
	name: string;
	content: string;
}

export interface EventComment extends CommentInput {
	timestamp: number;
}

interface CreateCommentBody extends CommentInput {}

interface CreateCommentResponse {
	message: string;
}

export interface GetCommentsResponse {
	comments: EventComment[];
}

function handler(
	req: NextApiRequest,
	res: NextApiResponse<GetCommentsResponse | CreateCommentResponse>
) {
	const { eventId } = req.query as { eventId: string };
	if (req.method === 'GET') {
		res.status(200).json({ comments: [] });
		return;
	}

	if (req.method === 'POST') {
		const { email, name, content } = req.body as CreateCommentBody;

		// Dummy validation
		if (!email.includes('@') || !name || name.trim() === '' || !content || content.trim() === '') {
			res.status(422).json({ message: 'Invalid input' });
		}

		const newComment: EventComment = {
			timestamp: Date.now(),
			content,
			email,
			name,
		};
		console.log(newComment);

		res.status(201).json({ message: 'Success!!' });
		return;
	}

	res.setHeader('Allow', ['GET', 'POST']);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
