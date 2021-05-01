import React from 'react';
import Link from 'next/link';

import classes from './main-navigation.module.css';

export interface MainNavigationProps {}

export const MainNavigation: React.FC<MainNavigationProps> = ({}) => {
	return (
		<header className={classes.header}>
			<Link href="/">
				<a>
					<div className={classes.logo}>Next Auth</div>
				</a>
			</Link>
			<nav>
				<ul>
					<li>
						<Link href="/auth">Login</Link>
					</li>
					<li>
						<Link href="/profile">Profile</Link>
					</li>
					<li>
						<button>Logout</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
