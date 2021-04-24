import '../styles/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Layout from '../components/layout/layout';

const App = (props: AppProps) => {
	const { Component, pageProps } = props;

	return (
		<Layout>
			<Head>
				<title>NextEvents</title>
				<meta name="description" content="Find a lot of great events that allow you to evolve..." />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
};

export default App;
