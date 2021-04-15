import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { EventContent } from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById } from '../../data/events';

const EventDetailPage: NextPage = () => {
	const { query } = useRouter();

	const { eventId } = query;
	const eventDetails = getEventById(eventId as string);

	if (!eventDetails) {
		return <p>No event found!</p>;
	}

	return (
		<>
			<EventSummary title={eventDetails.title} />
			<EventLogistics
				address={eventDetails.location}
				date={eventDetails.date}
				image={eventDetails.image}
				imageAlt={eventDetails.title}
			/>
			<EventContent>
				<p>{eventDetails.description}</p>
			</EventContent>
		</>
	);
};

export default EventDetailPage;
