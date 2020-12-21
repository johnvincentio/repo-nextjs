//

import React from 'react';

import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

import SEO from './Seo';

import { siteType, pageMetaDataType, seoType } from '../types';

const MainLayout = (props) => {
	const {
		site, page, seo, children,
	} = props;
	// console.log('MainLayout; site ', site, ' page ', page, ' seo ', seo);

	return (
		<>
			<SEO seo={seo} />
			<Header site={site} page={page} />
			{children}
			<Footer site={site} />
		</>
	);
};

MainLayout.propTypes = {
	site: siteType.isRequired,
	page: pageMetaDataType.isRequired,
	seo: seoType.isRequired,
	children: PropTypes.node.isRequired,
};

export default MainLayout;
