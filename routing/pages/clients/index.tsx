import { NextPage } from 'next';
import Link from 'next/link';

const ClientsPage: NextPage = () => {
	const clients = [
		{ id: 'peter', name: 'Peter Parker' },
		{ id: 'max', name: 'Maximilian' },
	];

	return (
		<div>
			<h1>The Clients Page</h1>
			<ul>
				{clients.map(client => (
					<li key={client.id}>
						<Link
							href={{
								pathname: '/clients/[clientId]',
								query: {
									clientId: client.id,
								},
							}}
						>
							{client.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ClientsPage;
