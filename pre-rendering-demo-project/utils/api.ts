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
