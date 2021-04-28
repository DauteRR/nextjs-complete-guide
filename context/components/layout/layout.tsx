import React from 'react';
import { useNotification } from '../../store/notification-context';
import Notification from '../ui/notification';
import MainHeader from './main-header';

export interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { notification } = useNotification();

	return (
		<>
			<MainHeader />
			<main>{children}</main>
			<Notification {...notification} />
		</>
	);
};

export default Layout;
