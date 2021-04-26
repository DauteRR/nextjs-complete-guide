import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { EventContent } from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { EventDetails } from '../../types';
import { getEventById, getFeaturedEvents } from '../../utils/api';

export interface EventDetailPageUrlParams {
	[key: string]: string | string[];
	eventId: string;
}

export interface EventDetailPageProps {
	eventDetails: EventDetails;
}

const EventDetailPage: NextPage<EventDetailPageProps> = ({ eventDetails }) => {
	const pageHeadData = (
		<Head>
			<title>{eventDetails?.title ?? 'Event not found'}</title>
			<meta name="description" content={eventDetails?.description ?? 'Event not found'} />
		</Head>
	);

	if (!eventDetails) {
		return (
			<>
				{pageHeadData}
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
			{pageHeadData}
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

export const getStaticProps: GetStaticProps<
	EventDetailPageProps,
	EventDetailPageUrlParams
> = async ({ params }) => {
	const { eventId } = params;

	const eventDetails = await getEventById(eventId);

	return {
		props: {
			eventDetails,
		},
		revalidate: 60,
	};
};

export const getStaticPaths: GetStaticPaths<EventDetailPageUrlParams> = async () => {
	const allEvents = await getFeaturedEvents();
	const paths = allEvents.map(event => ({ params: { eventId: event.id } }));

	return {
		paths,
		fallback: 'blocking',
	};
};

export default EventDetailPage;
