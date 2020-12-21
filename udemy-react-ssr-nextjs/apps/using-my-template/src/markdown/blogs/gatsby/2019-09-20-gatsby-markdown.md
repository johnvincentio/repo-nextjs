---
meta-title: "Gatsby Markdown | John Vincent"
meta-description: "John Vincent's discussion on Gatsby Markdown"
meta-keywords: "Gatsby, Rss"

title: "Gatsby Markdown"
subtitle: "Building a blog with Markdown files"
lead: ""

category: [Gatsby, Markdown]
permalink: /gatsby/markdown/
---

Let's build `Markdown` pages with Gatsby.

<!-- end -->

# Gatsby Markdown Plugin

Using the plugin `gatsby-transformer-remark`, add to `gatsby-config.js`

```
{
	resolve: `gatsby-transformer-remark`,
	options: {
		excerpt_separator: `<!-- end -->`,
		plugins: [`gatsby-plugin-catch-links`],
	},
},
```

Use the `excerpt_separator` in your markdown files to notify the parser of the end of your excerpt.

Gatsby needs to know where to find the markdown files

```
{
	resolve: `gatsby-source-filesystem`,
	options: {
		name: `markdown-content`,
		path: `${__dirname}/src/markdown/content`,
	},
},
{
	resolve: `gatsby-source-filesystem`,
	options: {
		name: `markdown-blogs`,
		path: `${__dirname}/src/markdown/blogs`,
	},
},
```

My markdown files have different purposes and need to be handled differently in `gatsby-node.js`

`gatsby-node.js` generates the pages of the website.
