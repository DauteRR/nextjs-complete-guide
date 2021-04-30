import { GetStaticProps, NextPage } from 'next';
import React from 'react';
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
