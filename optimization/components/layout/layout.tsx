import React from 'react';
import MainHeader from './main-header';

export interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<MainHeader />
			<main>{children}</main>
		</>
	);
};

export default Layout;
