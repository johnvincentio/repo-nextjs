---
meta-title: "Gatsby Helmet | John Vincent"
meta-description: "John Vincent's discussion on Gatsby Helmet"
meta-keywords: "Gatsby, Helmet"

title: "Gatsby Helmet"
subtitle: "Building meta tags"
lead: ""

category: [Gatsby, Helmet]
permalink: /gatsby/meta-tags/
---

For meta tags, Gatsby relies on `react-helmet`

<!-- end -->

# Install

```
npm i --save gatsby-plugin-react-helmet
```

Add to `gatsby-config.js` in the plugins section

```
`gatsby-plugin-react-helmet`,
```

# Implementation

The architecture I prefer is the expert pattern. Thus offload the functionality to an expert class `SEO.jsx`

```
import React from 'react';
import Helmet from 'react-helmet';

import { seoType } from '../types';

const SEO = ({ seo }) => (
	<>
		<Helmet title={seo.title}>
			<html lang={seo.lang} />
			<meta name="google-site-verification" content={seo.googleSiteVerification} />
			<meta name="description" content={seo.description} />
			<meta name="keywords" content={seo.keywords} />
			<meta name="author" content={seo.author} />

			<meta name="image" content={seo.image} />

			<script type="application/ld+json">{JSON.stringify(seo.schemaOrgJSONLD)}</script>

			<meta property="fb:app_id" content={seo.fbAppId} />

			{/* OpenGraph  */}
			<meta property="og:locale" content={seo.locale} />
			<meta property="og:type" content={seo.type} />
			<meta property="og:title" content={seo.title} />
			<meta property="og:description" content={seo.description} />
			<meta property="og:url" content={seo.url} />
			<meta property="og:image" content={seo.image} />
			<meta property="og:image:width" content="449" />
			<meta property="og:image:height" content="449" />

			{/* Twitter Card */}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={seo.title} />
			<meta name="twitter:description" content={seo.description} />
			<meta name="twitter:site" content={seo.twitterCreator} />
			<meta name="twitter:image" content={seo.image} />
			<meta name="twitter:creator" content={seo.twitterCreator} />

			<link rel="alternate" type="application/rss+xml" href={seo.seoFeed} />

			<base href={seo.baseUrl} />
		</Helmet>
	</>
);
SEO.propTypes = {
	seo: seoType.isRequired,
};

export default SEO;
```

## Typechecking

From `../types/index.js`

```
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
```

which provides some checking as well as a form of documentation.

## Usage

`seo` is passed as a parameter. Class `SEO` doesn't care how it was constructed thus this component is reusable.
