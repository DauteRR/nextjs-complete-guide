import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { EventContent } from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getEventById } from '../../data/events';

const EventDetailPage: NextPage = () => {
	const { query } = useRouter();

	const { eventId } = query;
	const eventDetails = getEventById(eventId as string);

	if (!eventDetails) {
		return (
			<>
				<ErrorAlert>
					<p>No event found!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show al events</Button>
				</div>
			</>
		);
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
