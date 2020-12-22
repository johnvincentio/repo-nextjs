---
meta-title: "Google Webmaster Tools | John Vincent"
meta-description: "John Vincent's discussion on Google Webmaster Tools"
meta-keywords: "Google Webmaster Tools"

title: "Google Webmaster Tools"
subtitle: ""
lead: ""

category: [Taskmuncher, Google Webmaster Tools]
permalink: /taskmuncher/deploy/google-webmaster-tools/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# TaskMuncher Google Webmaster Tools

[Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

## Domain

Domain is

```
www.taskmuncher.com
```

Please note this is a choice. I chose to use `www.` as this is mostly what people expect to see. Personally I would prefer to use

```
taskmuncher.com
```

but that be confusing to some people.

I configured Nginx to redirect 

```
taskmuncher.com
to
www.taskmuncher.com
```

## Add a Site

Website is

```
https://www.taskmuncher.com
```

Open [Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

* Add a Property
* Website, www.taskmuncher.com
	* Add

Repeat steps below also for

* Add a Property
* Website, taskmuncher.com
	* Add

## Verify your ownership of the domain.

There are many different options.

Open [Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

Select https://www.taskmuncher.com

* Gear wheel icon (top right)
* Verification details
* Verify using a different method

### HTML file upload

Select HTML file upload

Tool has 4 steps

1. Download the verification file  `[google9104b904281bf3a3.html]`
2. Upload file to `www.taskmuncher.com/google9104b904281bf3a3.html`
3. Confirm successful upload
	* https://www.taskmuncher.com/google9104b904281bf3a3.html
4. Verify

### HTML tag

* Copy meta tag to site's home page

Added to `index.html`

```
<meta name="google-site-verification" content="<your own tag>" />
```

* Verify by viewing the page source


### Domain Name provider (optional)

* Domain Name provider
	* Google Domains

1. Add the TXT record below to the DNS configuration for `taskmuncher.com.
google-site-verification=oHiXOxS0RUkZcO3NPSNr0MmQfDYL4GNAfSOD4mBqQVo`

To do this with Google Domains, add the following record

```
Name: @
Type: TXT
TTL: 1h
Data:
google-site-verification=oHiXOxS0RUkZcO3NPSNr0MmQfDYL4GNAfSOD4mBqQVo
```

## Repeat steps

Repeat the verification steps so that have verified properties for 

* https://www.taskmuncher.com
* https://taskmuncher.com
* http://www.taskmuncher.com
* http://taskmuncher.com



## Site Settings

From Search Console

* Select: https://www.taskmuncher.com
* Site Settings (gear icon)
	* Preferred domain: display URLs as www.taskmuncher.com

## Crawl Settings

* Crawl (left menu)
	* Sitemaps
	* Add/Test Sitemap
	* select: www.taskmuncher.com
	* Add/test sitemap
	* https://www.taskmuncher.com/
		* `sitemap.xml`
	* press Submit

## Robots

Create `robots.txt`

```
User-agent: *
Sitemap: https://www.taskmuncher.com/sitemap.xml
```

Open [Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

Select your website.

If `robots.txt` is not listed, will need to convince Google to look for it.

Mid bottom

* provide path of `robots.txt`
* submit

Ask Google to look again.

Google will find `robots.txt`
