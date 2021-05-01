import React from 'react';
import classes from './starting-page.module.css';

export interface StartingPageProps {}

export const StartingPage: React.FC<StartingPageProps> = ({}) => {
	return (
		<section className={classes.starting}>
			<h1>Welcome on Board!</h1>
		</section>
	);
};

export default StartingPage;
