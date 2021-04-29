import { NextPage } from 'next';
import React from 'react';
import { FeaturedPosts } from '../components/home-page/featured-posts';
import { Hero } from '../components/home-page/hero';

export interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = ({}) => {
	return (
		<>
			<Hero />
			<FeaturedPosts />
		</>
	);
};

export default HomePage;
