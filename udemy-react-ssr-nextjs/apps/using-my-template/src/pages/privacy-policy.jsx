//

import React from 'react';

import MainLayout from '../components/MainLayout';

import SubpageHeader from '../components/SubpageHeader';
import PrivacyPolicy from '../components/PrivacyPolicy';

import createMetaData from '../lib/createMetaData';

import json from '../data/pages/privacy-policy.json';

export default () => {
	const { site, page, seo } = createMetaData(json);
	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<PrivacyPolicy />
		</MainLayout>
	);
};
