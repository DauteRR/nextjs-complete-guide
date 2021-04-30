import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { FeaturedPosts } from '../components/home-page/featured-posts';
import { Hero } from '../components/home-page/hero';
import { Post } from '../types';
import { getFeaturedPosts } from '../utils/posts';

export interface HomePageProps {
	featuredPosts: Post[];
}

const HomePage: NextPage<HomePageProps> = ({ featuredPosts }) => {
	return (
		<>
			<Head>
				<title>Doge Blog</title>
				<meta name="description" content="I post about programming and web development" />
			</Head>
			<Hero />
			<FeaturedPosts posts={featuredPosts} />
		</>
	);
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	const featuredPosts = getFeaturedPosts();

	return {
		props: {
			featuredPosts,
		},
	};
};

export default HomePage;
