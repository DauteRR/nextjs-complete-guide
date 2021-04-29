import React from 'react';
import MainNavigation from './main-navigation';

export interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<MainNavigation />
			<main>{children}</main>
		</>
	);
};

export default Layout;
