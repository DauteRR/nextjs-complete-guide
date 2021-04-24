import { EventDetails } from '../types';

export async function getAllEvents(): Promise<EventDetails[]> {
	const response = await fetch(
		'https://nextjs-complete-guide-course-default-rtdb.europe-west1.firebasedatabase.app/events.json'
	);
	const data: EventDetails[] = await response.json();

	return data;
}

export async function getFeaturedEvents(): Promise<EventDetails[]> {
	const allEvents = await getAllEvents();
	return allEvents.filter(event => event.isFeatured);
}

export async function getEventById(id: string): Promise<EventDetails | undefined> {
	const allEvents = await getAllEvents();
	return allEvents.find(event => event.id === id);
}

export async function getFilteredEvents(dateFilter: {
	year: number;
	month: number;
}): Promise<EventDetails[]> {
	const { year, month } = dateFilter;
	const events = await getAllEvents();

	let filteredEvents = events.filter(event => {
		const eventDate = new Date(event.date);
		return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
	});

	return filteredEvents;
}
