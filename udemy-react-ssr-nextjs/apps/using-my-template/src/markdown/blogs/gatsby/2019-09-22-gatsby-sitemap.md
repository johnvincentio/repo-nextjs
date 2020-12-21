---
meta-title: "Gatsby sitemap | John Vincent"
meta-description: "John Vincent's discussion on Gatsby sitemap"
meta-keywords: "Gatsby, Google, sitemap"

title: "Gatsby Sitemap"
subtitle: "Building a sitemap"
lead: ""

category: [Gatsby, Google]
permalink: /gatsby/sitemap/
---

Building a `sitemap` file with Gatsby is straightforward.

<!-- end -->

# Gatsby Sitemap Plugin

Using the plugin `gatsby-plugin-sitemap`, add to `gatsby-config.js`

```
{
	resolve: `gatsby-plugin-sitemap`,
	options: {
		query: `
		{
			site {
				siteMetadata {
					siteUrl
				}
			}

			allSitePage(sort: {fields: path}) {
				edges {
					node {
						path
					}
				}
			}
	}`,
		serialize: ({ site, allSitePage }) => {
			const result = allSitePage.edges
				.filter((item) => {
					if (item.node.path === `/thanks/`) {
						return false;
					}
					if (item.node.path.startsWith(`/private/`)) {
						return false;
					}
					return true;
				})
				.map((edge) => ({
					url: site.siteMetadata.siteUrl + edge.node.path,
					changefreq: `daily`,
					priority: 0.7,
				}));
			return result;
		},
	},
},
```

The `sitemap.xml` file will be build only for production builds.
