import '../styles/globals.css';
import { AppProps } from 'next/app';
import { Layout } from '../components/layout/layout';
import { Provider } from 'next-auth/client';

const App = (props: AppProps) => {
	const { Component, pageProps } = props;

	return (
		<Provider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
};

export default App;
