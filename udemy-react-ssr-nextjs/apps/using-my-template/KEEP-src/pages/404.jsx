//

import React from 'react';

import { MainLayout, SubpageHeader, createMetaData } from '../components';

import json from '../data/pages/error-404.json';

const NotFoundPage = () => {
	const { site, page, seo } = createMetaData(json);
	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
		</MainLayout>
	);
};

export default NotFoundPage;
