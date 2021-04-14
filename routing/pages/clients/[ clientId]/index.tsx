import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const ClientProjectsPage: NextPage = () => {
	const router = useRouter();

	const loadProjectHandler = () => {
		router.push({
			pathname: '/clients/[clientId]/[clientProjectId]',
			query: {
				clientId: 'max',
				clientProjectId: 'project-a',
			},
		});
	};

	return (
		<div>
			<h1>The Projects of a Given Client</h1>
			<button onClick={loadProjectHandler}>Load Project A</button>
		</div>
	);
};

export default ClientProjectsPage;
