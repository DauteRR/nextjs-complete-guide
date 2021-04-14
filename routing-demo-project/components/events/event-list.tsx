import React from 'react';
import { EventDetails } from '../../types';
import EventItem from './event-item';

export interface EventListProps {
	items: EventDetails[];
}

export const EventList: React.FC<EventListProps> = ({ items }) => {
	return (
		<ul>
			{items.map(event => (
				<EventItem key={event.id} details={event} />
			))}
		</ul>
	);
};

export default EventList;
