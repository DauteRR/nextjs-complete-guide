import React, { useState } from 'react';

export type NotificationStatus = 'success' | 'error' | 'pending';

export interface NotificationType {
	title: string;
	message: string;
	status: NotificationStatus;
}

type Context = {
	notification?: NotificationType;
	showNotification(notification: NotificationType): void;
	hideNotification(): void;
};

const defaultValues: Context = {
	hideNotification: () => {},
	showNotification: () => {},
};

export const NotificationContext = React.createContext<Context>(defaultValues);

export const NotificationContextProvider: React.FC = ({ children }) => {
	const [notification, setNotification] = useState<NotificationType>(undefined);

	function showNotification(notificationData: NotificationType) {
		setNotification(notificationData);

		if (notificationData.status !== 'pending') {
			setTimeout(hideNotification, 2000);
		}
	}

	function hideNotification() {
		setNotification(undefined);
	}

	return (
		<NotificationContext.Provider
			value={{
				hideNotification,
				showNotification,
				notification,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = (): Context => {
	return React.useContext(NotificationContext);
};
