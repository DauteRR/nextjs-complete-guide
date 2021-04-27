import fs from 'fs/promises';
import path from 'path';
import { EventComment } from '../pages/api/comments/[eventId]';

export async function getComments(): Promise<Record<string, EventComment[]>> {
	const filePath = path.join(process.cwd(), 'data', 'comments.json');

	const jsonData = await fs.readFile(filePath);
	const comments: Record<string, EventComment[]> = JSON.parse(jsonData.toString());

	return comments;
}

export async function saveComment(eventId: string, comment: EventComment): Promise<void> {
	const filePath = path.join(process.cwd(), 'data', 'comments.json');

	const jsonData = await fs.readFile(filePath);
	const comments: Record<string, EventComment[]> = JSON.parse(jsonData.toString());

	if (comments[eventId] === undefined) {
		comments[eventId] = [];
	}

	comments[eventId].push(comment);

	await fs.writeFile(filePath, JSON.stringify(comments));
}
