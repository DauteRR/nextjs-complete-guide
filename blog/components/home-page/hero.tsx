import React from 'react';
import Image from 'next/image';
import classes from './hero.module.css';

export interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src="/images/site/dog.jpg"
					alt="An image showing Doge"
					width={326}
					height={492}
				></Image>
			</div>
			<h1>Hi, I'm Doge</h1>
			<p>I blog about web development - especially frontend frameworks like Vue or React.</p>
		</section>
	);
};

export default Hero;
