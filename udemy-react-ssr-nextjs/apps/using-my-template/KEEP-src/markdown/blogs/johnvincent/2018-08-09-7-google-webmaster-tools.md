---
meta-title: "Google Webmaster Tools | John Vincent"
meta-description: "John Vincent's discussion on Google Webmaster Tools"
meta-keywords: "Google Webmaster Tools"

title: "Google Webmaster Tools"
subtitle: ""
lead: ""

category: [Google Webmaster Tools, Johnvincent.io]
permalink: /johnvincent/google-webmaster-tools/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Google Webmaster Tools

[Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

## Domain

Domain is

```
www.johnvincent.io
```

Please note this is a choice. I chose to use `www.` as this is mostly what people expect to see. Personally I would prefer to use

```
johnvincent.io
```

but that may be confusing to people who are used to `.com` domains.

I configured Nginx to redirect 

```
johnvincent.io
to
www.johnvincent.io
```

## Add a Site

Website is

```
www.johnvincent.io
```

Open [Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

* Add a Property
* Website, www.johnvincent.io
	* Add

Repeat steps below also for

* Add a Property
* Website, johnvincent.io
	* Add

### Verify your ownership of the domain.

There are many different options.

### HTML file upload

Select HTML file upload

Tool has 4 steps

1. Download the verification file  `[google9104b904281bf3a3.html]`
2. Upload file to `www.johnvincent.io/google9104b904281bf3a3.html`
3. Confirm successful upload
	* https://www.johnvincent.io/google9104b904281bf3a3.html
4. Verify

### HTML tag

* Copy meta tag to site's home page

Added to `index.html`

```
<meta name="google-site-verification" content="<your own tag>" />
```

* Verify

### Domain Name provider (optional)

* Domain Name provider
	* Google Domains

1. Add the TXT record below to the DNS configuration for `johnvincent.io.google-site-verification=t541b51i2vyIyUl2NSxJvc46YwyLrUSRMuWmJcz2UzI`

To do this with Google Domains, add the following record

```
Name: @
Type: TXT
TTL: 1h
Data:
google-site-verification=t541b51i2vyIyUl2NSxJvc46YwyLrUSRMuWmJcz2UzI
```

### Robots.txt

[Building a robots.txt using Gatsby](https://www.johnvincent.io/gatsby/robots/)

From [Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

* Select: https://www.johnvincent.io
* [robots.txt tester](https://www.google.com/webmasters/tools/robots-testing-tool?hl=en&siteUrl=https://www.johnvincent.io/)]
* Add robots.txt


### Sitemaps

[Building a sitemap using Gatsby](https://www.johnvincent.io/gatsby/sitemap/)

From [Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

* Select: https://www.johnvincent.io
* Sitemaps
	* Add sitemap
	* https://www.johnvincent.io/
		* `sitemap.xml`
	* press Submit
