import React from 'react';

export interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
	return (
		<ul>
			<li>Product 1</li>
			<li>Product 2</li>
			<li>Product 3</li>
		</ul>
	);
};

export default HomePage;
