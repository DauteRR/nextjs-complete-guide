import classes from './notification.module.css';
import { useNotification, NotificationType } from '../../store/notification-context';

import React from 'react';

export interface NotificationProps extends NotificationType {}

export const Notification: React.FC<NotificationProps> = ({ title, message, status }) => {
	const { hideNotification } = useNotification();

	let statusClasses = '';

	if (status === 'success') {
		statusClasses = classes.success;
	}

	if (status === 'error') {
		statusClasses = classes.error;
	}

	if (status === 'pending') {
		statusClasses = classes.pending;
	}

	const activeClasses = `${classes.notification} ${statusClasses}`;

	return (
		<div className={activeClasses} onClick={hideNotification}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
};

export default Notification;
