import { NextPage } from 'next';
import { getFeaturedEvents } from '../data/events';

const HomePage: NextPage = () => {
	const featuredEvents = getFeaturedEvents();

	return (
		<div>
			<h1>Home Page</h1>
		</div>
	);
};

export default HomePage;
