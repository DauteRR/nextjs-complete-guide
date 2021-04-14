import { NextPage } from 'next';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../data/events';

const HomePage: NextPage = () => {
	const featuredEvents = getFeaturedEvents();

	return (
		<div>
			<EventList items={featuredEvents} />
		</div>
	);
};

export default HomePage;
