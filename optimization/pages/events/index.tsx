import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { EventDetails } from '../../types';
import { getAllEvents } from '../../utils/api';

export interface EventsPageProps {
	events: EventDetails[];
}

const EventsPage: NextPage<EventsPageProps> = ({ events }) => {
	const router = useRouter();

	const findEventsHandler = (year: string, month: string) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	};

	return (
		<>
			<Head>
				<title>All Events</title>
				<meta name="description" content="Find a lot of great events that allow you to evolve..." />
			</Head>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</>
	);
};

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
	const events = await getAllEvents();

	return {
		props: {
			events,
		},
		revalidate: 60,
	};
};

export default EventsPage;
