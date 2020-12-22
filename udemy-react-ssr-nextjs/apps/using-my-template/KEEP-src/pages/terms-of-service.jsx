//

import React from 'react';

import MainLayout from '../components/MainLayout';

import SubpageHeader from '../components/SubpageHeader';
import TermsOfService from '../components/TermsOfService';

import createMetaData from '../lib/createMetaData';

import json from '../data/pages/terms-of-service.json';

export default () => {
	const { site, page, seo } = createMetaData(json);
	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<TermsOfService />
		</MainLayout>
	);
};
