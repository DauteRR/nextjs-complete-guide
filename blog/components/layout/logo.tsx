import React from 'react';

import classes from './logo.module.css';

export interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
	return <div className={classes.logo}>DogeBlog</div>;
};

export default Logo;
