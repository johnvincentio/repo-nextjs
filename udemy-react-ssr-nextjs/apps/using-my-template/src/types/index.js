//

// category: PropTypes.arrayOf(PropTypes.string).isRequired,

import PropTypes from 'prop-types';

// export const requiredType = PropTypes.any.isRequired;
export const requiredType = PropTypes.object.isRequired;

export const requiredArrayType = PropTypes.arrayOf(requiredType);

export const requiredStringType = PropTypes.string.isRequired;

export const requiredStringArrayType = PropTypes.arrayOf(requiredStringType);

// export const socialIconType = PropTypes.shape({
// 	id: PropTypes.number.isRequired,
// 	href: PropTypes.string.isRequired,
// 	target: PropTypes.string.isRequired,
// 	title: PropTypes.string.isRequired,
// 	icons: PropTypes.string.isRequired,
// });

export const siteType = PropTypes.shape({
	buildTime: PropTypes.string.isRequired,
	siteMetadata: PropTypes.shape({
		pathPrefix: PropTypes.string.isRequired,
		config: PropTypes.shape({
			product: PropTypes.string.isRequired,
			metaTitle: PropTypes.string.isRequired,
			metaDescription: PropTypes.string.isRequired,
			metaKeywords: PropTypes.string.isRequired,

			author: PropTypes.string.isRequired,

			email: PropTypes.string.isRequired,

			siteUrl: PropTypes.string.isRequired,
			baseUrl: PropTypes.string.isRequired,

			siteLanguage: PropTypes.string.isRequired,
			locale: PropTypes.string.isRequired,

			logo: PropTypes.string.isRequired,

			fbAppId: PropTypes.string.isRequired,

			facebookUsername: PropTypes.string.isRequired,
			twitterUsername: PropTypes.string.isRequired,
			githubUsername: PropTypes.string.isRequired,
			linkedinUrl: PropTypes.string.isRequired,
			angelUsername: PropTypes.string.isRequired,
			googleProfile: PropTypes.string.isRequired,

			image: PropTypes.string.isRequired,

			googleSiteVerification: PropTypes.string.isRequired,

			seoFeed: PropTypes.string.isRequired,

			disqusShortname: PropTypes.string.isRequired,
		}).isRequired,
		// socialIcons: PropTypes.arrayOf(socialIconType.isRequired),
	}).isRequired,
});

// type: Prop Types.string.isRequired,  'website', 'article'

export const pageMetaDataType = PropTypes.shape({
	meta_title: PropTypes.string.isRequired,
	meta_description: PropTypes.string.isRequired,
	meta_keywords: PropTypes.string.isRequired,

	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	subsubtitle: PropTypes.string.isRequired,
	lead: PropTypes.string.isRequired,

	permalink: PropTypes.string.isRequired,

	type: PropTypes.string.isRequired,
});

export const seoType = PropTypes.shape({
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	keywords: PropTypes.string.isRequired,

	author: PropTypes.string.isRequired,

	url: PropTypes.string.isRequired,

	lang: PropTypes.string.isRequired,
	locale: PropTypes.string.isRequired,

	type: PropTypes.string.isRequired,

	fbAppId: PropTypes.string.isRequired,

	image: PropTypes.string.isRequired,

	googleSiteVerification: PropTypes.string.isRequired,

	twitterCreator: PropTypes.string.isRequired,

	seoFeed: PropTypes.string.isRequired,

	schemaOrgJSONLD: requiredArrayType.isRequired,

	baseUrl: PropTypes.string.isRequired,
});

export const blogMarkdownRemarkType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	html: PropTypes.string.isRequired,
	excerpt: PropTypes.string.isRequired,
	fields: PropTypes.shape({
		slug: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		modifiedTime: PropTypes.number.isRequired,
		postDate: PropTypes.string.isRequired,
		suburl: PropTypes.string.isRequired,
		permalink: PropTypes.string.isRequired,
	}).isRequired,
	frontmatter: PropTypes.shape({
		meta_title: PropTypes.string.isRequired,
		meta_description: PropTypes.string.isRequired,
		meta_keywords: PropTypes.string.isRequired,

		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
		lead: PropTypes.string.isRequired,

		permalink: PropTypes.string.isRequired,

		category: requiredStringArrayType.isRequired,
	}).isRequired,
});

export const dataBlogMarkdownRemarkType = PropTypes.shape({
	markdownRemark: blogMarkdownRemarkType.isRequired,
});

export const contentMarkdownRemarkType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	html: PropTypes.string.isRequired,
	fields: PropTypes.shape({
		slug: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		suburl: PropTypes.string.isRequired,
		permalink: PropTypes.string.isRequired,
	}).isRequired,
	frontmatter: PropTypes.shape({
		meta_title: PropTypes.string.isRequired,
		meta_description: PropTypes.string.isRequired,
		meta_keywords: PropTypes.string.isRequired,

		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
		subsubtitle: PropTypes.string.isRequired,

		permalink: PropTypes.string.isRequired,
	}).isRequired,
});

export const dataContentMarkdownRemarkType = PropTypes.shape({
	markdownRemark: contentMarkdownRemarkType.isRequired,
});

export const technologyType = PropTypes.shape({
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
});

export const technologiesType = PropTypes.arrayOf(technologyType.isRequired);

export const portfolioCategoryType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
});

export const portfolioCategoriesType = PropTypes.arrayOf(portfolioCategoryType.isRequired);

export const portfolioProjectType = PropTypes.shape({
	category: PropTypes.number.isRequired,
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
});

export const portfolioProjectsType = PropTypes.arrayOf(portfolioProjectType.isRequired);

export const HeaderType = PropTypes.shape({
	href: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
});

export const HeadersType = PropTypes.arrayOf(HeaderType.isRequired);
