---
meta-title: "Gatsby Sass | John Vincent"
meta-description: "John Vincent's discussion on Gatsby Sass"
meta-keywords: "Gatsby, Sass"

title: "Gatsby Sass"
subtitle: "Building a blog with scss files"
lead: ""

category: [Gatsby, Sass]
permalink: /gatsby/sass/
---

Using `Scss` files with Gatsby is straightforward.

<!-- end -->

# Gatsby Sass Plugin

Using the plugin `gatsby-plugin-sass`, add to `gatsby-config.js`

```
`gatsby-plugin-sass`,
{
	resolve: `gatsby-source-filesystem`,
	options: {
		name: `scss`,
		path: `${__dirname}/src/styles`,
	},
},
```

# Load Scss

Add to `gatsby-browser.js`

```
import './src/styles/styles.scss';
```
