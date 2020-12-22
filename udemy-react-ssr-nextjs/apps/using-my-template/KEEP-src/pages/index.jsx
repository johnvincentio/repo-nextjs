//

import React from 'react';

import MainLayout from '../components/MainLayout';

import Intro from '../components/Intro';
import Services from '../components/Services';
import CallToAction from '../components/CallToAction';

import createMetaData from '../lib/createMetaData';

import json from '../data/pages/home.json';

const Home = () => {
	// console.log('Home; page ', json);
	const { site, page, seo } = createMetaData(json);
	return (
		<MainLayout site={site} page={page} seo={seo}>
			<Intro page={page} />
			<Services />
			<CallToAction />
		</MainLayout>
	);
};

export default Home;
