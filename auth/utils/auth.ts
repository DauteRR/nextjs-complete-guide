import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
	return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPasword: string) {
	return await compare(password, hashedPasword);
}
