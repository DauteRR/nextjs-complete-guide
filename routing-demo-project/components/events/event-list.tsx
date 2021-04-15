import React from 'react';
import { EventDetails } from '../../types';
import { EventItem } from './event-item';
import classes from './event-list.module.css';

export interface EventListProps {
	items: EventDetails[];
}

export const EventList: React.FC<EventListProps> = ({ items }) => {
	return (
		<ul className={classes.list}>
			{items.map(event => (
				<EventItem key={event.id} details={event} />
			))}
		</ul>
	);
};

export default EventList;
