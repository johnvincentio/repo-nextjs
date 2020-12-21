//

import React from 'react';

import { MainLayout, SubpageHeader, createMetaData } from '../components';

import About from '../components/About';
import CallToAction from '../components/CallToAction';

import json from '../data/pages/about.json';

const about = () => {
	// console.log('about.jsx; json ', json);
	const { site, page, seo } = createMetaData(json);
	// console.log('pages/about; site ', site, ' page ', page, ' seo ', seo);

	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<About />
			<CallToAction />
		</MainLayout>
	);
};

export default about;
