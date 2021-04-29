import { NextPage } from 'next';
import React from 'react';
import { FeaturedPosts } from '../components/home-page/featured-posts';
import { Hero } from '../components/home-page/hero';
import { Post } from '../types';

export interface HomePageProps {}

const DUMMY_POSTS: Post[] = [
	{
		date: '2021-01-10',
		description:
			'NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
		slug: 'getting-started-with-nextjs',
		image: 'getting-started-with-nextjs.jpg',
		title: 'Getting Started with NextJS',
	},
];

const HomePage: NextPage<HomePageProps> = ({}) => {
	return (
		<>
			<Hero />
			<FeaturedPosts posts={DUMMY_POSTS} />
		</>
	);
};

export default HomePage;
