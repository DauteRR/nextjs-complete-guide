import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const SelectedClientProjectPage: NextPage = () => {
	const { query } = useRouter();

	console.log(query);

	return (
		<div>
			<h1>The Project Page for a Specific Project for a Selected Client</h1>
		</div>
	);
};

export default SelectedClientProjectPage;
