import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { Product } from '..';
import { getProducts } from '../../utils/get-products';

export interface ProductDetailsPageParsedUrlQuery {
	[key: string]: string | string[];
	pid: string;
}

export interface ProductDetailsPageProps {
	product: Product;
}

const ProductDetailsPage: NextPage<ProductDetailsPageProps> = ({ product }) => {
	return (
		<>
			<h1>{product.title}</h1>
			<p>{product.description}</p>
		</>
	);
};

export const getStaticProps: GetStaticProps<
	ProductDetailsPageProps,
	ProductDetailsPageParsedUrlQuery
> = async context => {
	const { params } = context;
	const productId = params.pid as string;

	const products = await getProducts();
	const product = products.find(current => current.id === productId);

	if (product === undefined) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			product,
		},
	};
};

export const getStaticPaths: GetStaticPaths<ProductDetailsPageParsedUrlQuery> = async context => {
	const products = await getProducts();
	const ids = products.map(product => product.id);

	return {
		// paths: ids.map(id => ({ params: { pid: id } })),
		paths: [
			{ params: { pid: '1' } },
			{ params: { pid: '2' } },
			{ params: { pid: '3' } },
			{ params: { pid: '4' } },
			{ params: { pid: '5' } },
			{ params: { pid: '6' } },
			{ params: { pid: '7' } },
			{ params: { pid: '8' } },
			{ params: { pid: '9' } },
		],
		fallback: 'blocking',
	};
};

export default ProductDetailsPage;
