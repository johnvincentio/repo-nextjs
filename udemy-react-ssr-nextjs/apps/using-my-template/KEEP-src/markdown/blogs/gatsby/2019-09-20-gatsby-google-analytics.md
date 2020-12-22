---
meta-title: "Gatsby Google Analytics | John Vincent"
meta-description: "John Vincent's discussion on Gatsby Google Analytics "
meta-keywords: "Gatsby, Google Analytics"

title: "Gatsby Google Analytics"
subtitle: ""
lead: ""

category: [Gatsby, Google Analytics]
permalink: /gatsby/google-analytics/
---

Configuring Google Analytics with Gatsby is straightforward.

<!-- end -->

# Gatsby Google Analytics Plugin

Using the plugin `gatsby-plugin-google-analytics`, add to `gatsby-config.js`

```
{
	resolve: `gatsby-plugin-google-analytics`,
	options: {
		trackingId: `UA-102737102-1`,
		head: false,
		exclude: [`/private/**`],
		cookieDomain: `${domain}`,
	},
},
```

where `domain` = `johnvincent.io`

This plugin is only executed for production builds.
