import React from 'react';
import Link from 'next/link';

import classes from './button.module.css';

export interface ButtonProps {
	link?: string;
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, link, onClick }) => {
	if (link) {
		return (
			<Link href={link}>
				<a className={classes.btn}>{children}</a>
			</Link>
		);
	}

	return (
		<button className={classes.btn} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
