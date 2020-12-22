//

// blogs should be
// type: 'article',

// import { useStaticQuery, graphql } from 'gatsby';

// buildTime(formatString: "DD/MM/YYYY")

import site from '../config';

function updatePageMetaData(page) {
	// console.log('updatePageMetaData; page ', page);
	const yaml = {
		meta_title: page.meta_title || '',
		meta_description: page.meta_description || '',
		meta_keywords: page.meta_keywords || '',

		title: page.title || '',
		subtitle: page.subtitle || '',
		subsubtitle: page.subsubtitle || '',
		lead: page.lead || '',

		permalink: page.permalink || '/',

		type: page.type || 'website',
	};
	// console.log('updatePageMetaData; yaml ', yaml);
	return yaml;
}

function buildSeoMetaData(yaml) {
	const {
		siteMetadata: { pathPrefix, canonicalUrl, config },
	} = site;
	// console.log('BuildSeo; site ', site, ' config ', config);
	// console.log('BuildSeo; yaml ', yaml);

	const seo = {
		title: yaml.meta_title || config.metaTitle,
		description: yaml.meta_description || config.metaDescription,
		keywords: yaml.meta_keywords || config.metaKeywords,

		author: config.author,

		lang: config.siteLanguage,
		locale: config.locale,

		type: yaml.type,

		fbAppId: config.fbAppId,

		url: `${config.siteUrl}${yaml.permalink}`,
		canonicalUrl: `${canonicalUrl}${yaml.permalink}`,
		image: `${config.siteUrl}${pathPrefix}${config.image}`,
		googleSiteVerification: `${config.googleSiteVerification}`,
		twitterCreator: `${config.twitterUsername}`,
		seoFeed: `${config.seoFeed}`,

		baseUrl: `${config.baseUrl}`,
	};

	let schemaOrgJSONLD = [
		{
			'@context': 'http://schema.org',
			'@type': 'WebSite',
			'@id': seo.url,
			url: seo.url,
			name: seo.title,
			alternateName: seo.author,
		},
	];

	if (yaml.type !== 'website') {
		schemaOrgJSONLD = [
			{
				'@context': 'http://schema.org',
				'@type': 'BlogPosting',
				'@id': seo.url,
				url: seo.url,
				name: seo.title,
				alternateName: seo.author,
				headline: yaml.title,
				image: {
					'@type': 'ImageObject',
					url: seo.image,
				},
				description: yaml.subtitle,
				datePublished: site.buildTime,
				dateModified: site.buildTime,
				author: {
					'@type': 'Person',
					name: config.author,
				},
				publisher: {
					'@type': 'Organization',
					name: config.author,
					logo: {
						'@type': 'ImageObject',
						url: config.siteUrl + pathPrefix + config.logo,
					},
				},
				isPartOf: config.siteUrl,
				mainEntityOfPage: {
					'@type': 'WebSite',
					'@id': config.siteUrl,
				},
			},
		];
	}
	seo.schemaOrgJSONLD = schemaOrgJSONLD;
	// console.log('BuildSeo; seo ', seo);
	return seo;
}

function createMetaData(pageMetaData) {
	// console.log('createMetaData; pageMetaData ', pageMetaData);
	// console.log('createMetaData; site ', site);
	const page = updatePageMetaData(pageMetaData);
	// console.log('createMetaData; page ', page);
	const seo = buildSeoMetaData(page);
	// console.log('createMetaData; seo ', seo);
	return { site, page, seo };
}

export default createMetaData;
