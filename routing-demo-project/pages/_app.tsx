import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/layout/layout';

const App = (props: AppProps) => {
	const { Component, pageProps } = props;

	return (
		<Layout>
			{' '}
			<Component {...pageProps} />
		</Layout>
	);
};

export default App;
