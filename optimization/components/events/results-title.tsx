import Button from '../ui/button';
import classes from './results-title.module.css';

import React from 'react';

export interface ResultsTitleProps {
	date: Date;
}

export const ResultsTitle: React.FC<ResultsTitleProps> = ({ date }) => {
	const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	return (
		<section className={classes.title}>
			<h1>Events in {humanReadableDate}</h1>
			<Button link="/events">Show all events</Button>
		</section>
	);
};

export default ResultsTitle;
