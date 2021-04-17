import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { EventList } from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../data/events';

const FilteredEventsPage: NextPage = () => {
	const { query } = useRouter();
	const { slug } = query;

	if (!slug) {
		return <p className="center">Loading...</p>;
	}

	const [filteredYear, filteredMonth] = slug as string[];

	const year = parseInt(filteredYear);
	const month = parseInt(filteredMonth);

	if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
		return (
			<>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show al events</Button>
				</div>
			</>
		);
	}

	const filteredEvents = getFilteredEvents({ year, month });

	if (filteredEvents.length === 0) {
		return (
			<>
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
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
};

export default FilteredEventsPage;
