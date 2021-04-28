import fs from 'fs/promises';
import path from 'path';

export async function registerEmail(email: string): Promise<void> {
	const filePath = path.join(process.cwd(), 'data', 'newsletter.json');

	const jsonData = await fs.readFile(filePath);
	const registeredEmails: string[] = JSON.parse(jsonData.toString());

	if (registeredEmails.includes(email)) {
		throw new Error('Already registered');
	}

	registeredEmails.push(email);

	await fs.writeFile(filePath, JSON.stringify(registeredEmails));
}
