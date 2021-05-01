import { NextPage } from 'next';
import React from 'react';
import { StartingPage } from '../components/starting-page/starting-page';

export interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = ({}) => {
	return <StartingPage />;
};

export default HomePage;
