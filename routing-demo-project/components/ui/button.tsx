import React from 'react';
import Link from 'next/link';

import classes from './button.module.css';

export interface ButtonProps {
	link: string;
}

export const Button: React.FC<ButtonProps> = ({ children, link }) => {
	return (
		<Link href={link}>
			<a className={classes.btn}>{children}</a>
		</Link>
	);
};

export default Button;
