import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import Head from 'next/head';

const App = (props: AppProps) => {
	const { Component, pageProps } = props;

	return (
		<Layout>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
};

export default App;
