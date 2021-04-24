import classes from './event-content.module.css';

import React from 'react';

export interface EventContentProps {}

export const EventContent: React.FC<EventContentProps> = ({ children }) => {
	return <section className={classes.content}>{children}</section>;
};
