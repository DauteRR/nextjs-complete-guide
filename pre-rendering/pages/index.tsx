import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { getProducts } from '../utils/get-products';
import { removeDuplicatesAndSort } from '../utils/remove-duplicates-and-sort';

export interface Product {
	id: string;
	title: string;
	description: string;
}

export interface HomePageProps {
	products: Product[];
}

export const HomePage: React.FC<HomePageProps> = ({ products }) => {
	const uniqueProducts = removeDuplicatesAndSort<Product>(products, 'title');

	return (
		<ul>
			{uniqueProducts.map(product => (
				<li key={product.id}>
					<Link href={`/products/${product.id}`}>{product.title}</Link>
				</li>
			))}
		</ul>
	);
};

export const getStaticProps: GetStaticProps<HomePageProps> = async context => {
	const products = await getProducts();

	if (products.length === 0) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			products,
		},
	};
};

export default HomePage;
