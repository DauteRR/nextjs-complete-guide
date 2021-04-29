import '../styles/globals.css';
import { AppProps } from 'next/app';

const App = (props: AppProps) => {
	const { Component, pageProps } = props;

	return <Component {...pageProps} />;
};

export default App;
