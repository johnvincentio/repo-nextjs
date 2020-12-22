//

import React from 'react';

import MainLayout from '../components/MainLayout';

import SubpageHeader from '../components/SubpageHeader';

import CallToAction from '../components/CallToAction';
import Portfolio from '../components/Portfolio';
import Technologies from '../components/Technologies';

import createMetaData from '../lib/createMetaData';

import json from '../data/pages/portfolio.json';

const portfolio = () => {
	const { site, page, seo } = createMetaData(json);
	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<Portfolio />
			<Technologies />
			<CallToAction />
		</MainLayout>
	);
};

export default portfolio;
