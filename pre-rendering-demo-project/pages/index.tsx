import { GetStaticProps, NextPage } from 'next';
import EventList from '../components/events/event-list';
import { EventDetails } from '../types';
import { getFeaturedEvents } from '../utils/api';

export interface HomePageProps {
	featuredEvents: EventDetails[];
}

const HomePage: NextPage<HomePageProps> = ({ featuredEvents }) => {
	return (
		<div>
			<EventList items={featuredEvents} />
		</div>
	);
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: { featuredEvents },
		revalidate: 1800,
	};
};

export default HomePage;
