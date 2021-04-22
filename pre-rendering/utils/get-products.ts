import { Product } from '../pages';
import fs from 'fs/promises';
import path from 'path';

export async function getProducts(): Promise<Product[]> {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

	const jsonData = await fs.readFile(filePath);
	const data: { products: Product[] } = JSON.parse(jsonData.toString());

	return data.products;
}
