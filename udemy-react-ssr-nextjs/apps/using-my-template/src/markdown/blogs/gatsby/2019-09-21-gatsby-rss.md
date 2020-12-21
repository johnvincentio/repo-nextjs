---
meta-title: "Gatsby RSS Feed | John Vincent"
meta-description: "John Vincent's discussion on Gatsby RSS Feed"
meta-keywords: "Gatsby, Rss"

title: "Gatsby RSS Feed"
subtitle: "Building a RSS Feed"
lead: ""

category: [Gatsby, Rss]
permalink: /gatsby/rss/
---

Building a `RSS Feed` file with Gatsby is straightforward.

<!-- end -->

# Gatsby Sitemap Plugin

Using the plugin `gatsby-plugin-feed`, add to `gatsby-config.js`

```
{
	resolve: `gatsby-plugin-feed`,
	options: {
		query: `
			{
				site {
					siteMetadata {
						config {
							product
							metaDescription
							siteUrl
						}
					}
				}
			}
		`,
		feeds: [
			{
				serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.edges.map((edge) => ({
					...edge.node.frontmatter,
					description: edge.node.excerpt,
					date: edge.node.frontmatter.date,
					url: site.siteMetadata.config.siteUrl + edge.node.fields.slug,
					guid: site.siteMetadata.config.siteUrl + edge.node.fields.slug,
					custom_elements: [{ 'content:encoded': edge.node.html }],
				})),
				query: `
					{
						allMarkdownRemark(
							filter: { fields: { type: { eq: "blog" } } }
							sort: { fields: fields___modifiedTime, order: DESC }
						) {
							edges {
								node {
									id
									excerpt(format: HTML, truncate: true, pruneLength: 200)
									html
									fields {
										modifiedTime
										permalink
										postDate
										slug
										suburl
										type
									}
									frontmatter {
										meta_title
										meta_description
										meta_keywords
			
										title
										subtitle
										lead
			
										category
										permalink
									}
								}
							}
						}
					}
				`,
				output: `/feed.xml`,
				title: `John Vincent Blog Feed`,
			},
		],
	},
},
```

The `feed.xml` file will be build only for production builds.
