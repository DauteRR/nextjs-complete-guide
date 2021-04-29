import React from 'react';
import Logo from './logo';
import Link from 'next/link';

import classes from './main-navigation.module.css';

export interface MainNavigationProps {}

export const MainNavigation: React.FC<MainNavigationProps> = ({}) => {
	return (
		<header className={classes.header}>
			<Link href="/">
				<a>
					<Logo />
				</a>
			</Link>
			<nav>
				<ul>
					<li>
						<Link href="/posts">Posts</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link href="/contact">Contact</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
