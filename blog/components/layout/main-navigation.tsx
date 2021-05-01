import React from 'react';
import Logo from './logo';
import Link from 'next/link';
import Image from 'next/image';

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
					<li>
						<Link href="/contact">Contact</Link>
					</li>
					<div className={classes.github}>
						<Link href="https://github.com/DauteRR/nextjs-complete-guide">
							<a>
								<Image src="/images/site/github-logo.png" width={120} height={120} />
							</a>
						</Link>
					</div>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
