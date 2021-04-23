import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

const EventsPage: NextPage = () => {
	const router = useRouter();
	// TODO
	const events = [];

	const findEventsHandler = (year: string, month: string) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	};

	return (
		<>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</>
	);
};

export default EventsPage;
