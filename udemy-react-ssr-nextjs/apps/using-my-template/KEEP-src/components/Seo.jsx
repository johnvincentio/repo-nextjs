//

import React from 'react';
import Head from 'next/head';

import { seoType } from '../types';

const SEO = ({ seo }) => (
	<Head>
		<title>{seo.title}</title>
		<meta charSet="utf-8" />
		<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />

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

		<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
		<link rel="shortcut icon" href="/icons/icon-48x48.png" />

		<link rel="manifest" href="/manifest.webmanifest" />

		<meta name="msapplication-TileColor" content="#da532c" />
		<meta name="theme-color" content="#ffffff" />

		<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
	
		<link rel="apple-touch-icon" sizes="48x48" href="/icons/icon-48x48.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-72x72.png" />
		<link rel="apple-touch-icon" sizes="96x96" href="/icons/icon-96x96.png" />
		<link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
		<link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
		<link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
		<link rel="apple-touch-icon" sizes="256x256" href="/icons/icon-256x256.png" />
		<link rel="apple-touch-icon" sizes="384x384" href="/icons/icon-384x384.png" />
		<link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512x512.png" />

		<link rel="canonical" href={seo.canonicalUrl} />

		<link rel="alternate" type="application/rss+xml" title="John Vincent Blog Feed" href={seo.seoFeed} />

		<link rel="sitemap" type="application/xml" href="/sitemap.xml" />

		<base href={seo.baseUrl} />
	</Head>
);
SEO.propTypes = {
	seo: seoType.isRequired,
};

export default SEO;
