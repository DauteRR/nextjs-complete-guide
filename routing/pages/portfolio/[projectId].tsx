import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const PortfolioProjectPage: NextPage = () => {
	const { pathname, query } = useRouter();

	console.log(pathname);
	console.log(query.projectId);

	return (
		<div>
			<h1>The Portfolio Project Page</h1>
		</div>
	);
};

export default PortfolioProjectPage;
