//

import React from 'react';
import App, { Container } from 'next/app';
import Navbar from '../components/Navbar';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps };
	}


	render() {
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<Navbar />
				<p>Begin _app</p>
				<Component { ...pageProps } />
				<p>End _app</p>
			</Container>
		);
	}
}

// function MyApp({ Component, pageProps }) {
// 	return <Component {...pageProps} />
// }

// MyApp.getInitialProps = async (appContext) => {
// 	// calls page's `getInitialProps` and fills `appProps.pageProps`
// 	const appProps = await App.getInitialProps(appContext);

// 	return { ...appProps }
// }

export default MyApp;

/*
function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />
}
*/
