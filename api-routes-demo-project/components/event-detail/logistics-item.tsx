import classes from './logistics-item.module.css';

import React from 'react';

export interface LogisticsItemProps {
	icon: React.FC;
}

export const LogisticsItem: React.FC<LogisticsItemProps> = ({ icon: Icon, children }) => {
	return (
		<li className={classes.item}>
			<span className={classes.icon}>
				<Icon />
			</span>
			<span className={classes.content}>{children}</span>
		</li>
	);
};

export default LogisticsItem;
