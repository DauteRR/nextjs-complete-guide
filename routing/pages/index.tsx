import { NextPage } from 'next';
import Link from 'next/link';

const HomePage: NextPage = () => {
	return (
		<div>
			<h1>The Home Page</h1>
			<ul>
				<li>
					<Link href="/portfolio">Portfolio</Link>
				</li>
				<li>
					<Link href="/clients">Clients</Link>
				</li>
			</ul>
		</div>
	);
};

export default HomePage;
