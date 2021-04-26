import { GetServerSideProps, NextPage } from 'next';
import { EventList } from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Head from 'next/head';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { EventDetails } from '../../types';
import { getFilteredEvents } from '../../utils/api';

export interface FilteredEventsPageUrlParams {
	[key: string]: string | string[];
	slug: string[];
}

export interface FilteredEventsPageProps {
	filteredEvents: EventDetails[];
	invalidFilter?: boolean;
	year: number;
	month: number;
}

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = ({
	filteredEvents,
	invalidFilter,
	year,
	month,
}) => {
	const pageHeadData = (
		<Head>
			<title>{`${month}/${year} events`}</title>
			<meta name="description" content={`All events for ${month}/${year}`} />
		</Head>
	);

	if (invalidFilter) {
		return (
			<>
				{pageHeadData}
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show al events</Button>
				</div>
			</>
		);
	}

	if (filteredEvents.length === 0) {
		return (
			<>
				{pageHeadData}
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show al events</Button>
				</div>
			</>
		);
	}

	const date = new Date(year, month - 1);

	return (
		<>
			{pageHeadData}
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
};

export const getServerSideProps: GetServerSideProps<
	FilteredEventsPageProps,
	FilteredEventsPageUrlParams
> = async ({ params }) => {
	const { slug } = params;

	const [filteredYear, filteredMonth] = slug as string[];

	const year = parseInt(filteredYear);
	const month = parseInt(filteredMonth);

	if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
		return {
			props: {
				filteredEvents: [],
				month,
				year,
				invalidFilter: true,
			},
		};
	}

	const filteredEvents = await getFilteredEvents({
		month,
		year,
	});

	return {
		props: {
			filteredEvents,
			year,
			month,
		},
	};
};

export default FilteredEventsPage;
