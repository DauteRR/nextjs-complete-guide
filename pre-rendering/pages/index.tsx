import { GetStaticProps } from 'next';
import React from 'react';
import fs from 'fs/promises';
import path from 'path';

export interface Product {
	id: string;
	title: string;
}

export interface HomePageProps {
	products: Product[];
}

export const HomePage: React.FC<HomePageProps> = ({ products }) => {
	return (
		<ul>
			{products.map(product => (
				<li key={product.id}>{product.title}</li>
			))}
		</ul>
	);
};

export const getStaticProps: GetStaticProps<HomePageProps> = async context => {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

	const jsonData = await fs.readFile(filePath);
	const data: { products: Product[] } = JSON.parse(jsonData.toString());

	return {
		props: {
			products: data.products,
		},
	};
};

export default HomePage;
