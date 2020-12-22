---
meta-title: "Gatsby Manifest | John Vincent"
meta-description: "John Vincent's discussion on Gatsby Manifest"
meta-keywords: "Gatsby, Manifest"

title: "Gatsby Manifest"
subtitle: "Gatsby"
lead: ""

category: [Gatsby]
permalink: /gatsby/manifest/
---

Let's build a web app manifest with Gatsby.

<!-- end -->

# Gatsby Manifest Plugin

Using the plugin `gatsby-plugin-manifest`, add to `gatsby-config.js`

```
{
	resolve: `gatsby-plugin-manifest`,
	options: {
		name: `John Vincent`,
		short_name: `John Vincent`,
		start_url: `/`,
		background_color: `#ffffff`,
		theme_color: `#ffffff`,
		display: `standalone`,
		orientation: `landscape`,
		icon: `src/images/site/Cloud.jpg`, // This path is relative to the root of the site.
		cache_busting_mode: `none`,
	},
},
```

which generates file `manifest.webmanifest`
