import React from 'react';
import classes from './event-summary.module.css';

export interface EventSummaryProps {
	title: string;
}

export const EventSummary: React.FC<EventSummaryProps> = ({ title }) => {
	return (
		<section className={classes.summary}>
			<h1>{title}</h1>
		</section>
	);
};

export default EventSummary;
