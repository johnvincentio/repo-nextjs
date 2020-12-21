---
meta-title: "Gatsby robots.txt | John Vincent"
meta-description: "John Vincent's discussion on Gatsby robots.txt"
meta-keywords: "Gatsby, Google, robots.txt"

title: "Gatsby Robots file"
subtitle: "Building a robots.txt"
lead: ""

category: [Gatsby, Google]
permalink: /gatsby/robots/
---

Building a `robot.txt` file with Gatsby is straightforward.

<!-- end -->

# Gatsby Robots Plugin

Using the plugin `gatsby-plugin-robots-txt`, add to `gatsby-config.js`

```
{
	resolve: `gatsby-plugin-robots-txt`,
	options: {
		host: siteUrl,
		sitemap: `${baseUrl}sitemap.xml`,
		policy: [{ userAgent: `*`, allow: `/` }],
	},
},
```

The `robots.txt` file will be build only for production builds.
