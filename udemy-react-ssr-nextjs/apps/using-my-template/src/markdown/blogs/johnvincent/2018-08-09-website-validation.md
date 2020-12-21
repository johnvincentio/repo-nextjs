---
meta-title: "johnvincent.io  Website Validation | John Vincent"
meta-description: "John Vincent's discussion on johnvincent.io Website Validation including Seo, Aria, Microdata, Page Speed, Html Semantics, Css"
meta-keywords: "Seo, Aria, Microdata, Page Speed, Html, Css"

title: "johnvincent.io Website Validation"
subtitle: "Verify the Website Implementation"
lead: ""

category: [Html, Css, Seo, Aria, Microdata, Vulnerabilities, Page Speed]
permalink: /johnvincent/website-validation/
---

This document discusses validation issues for the `www.johnvincent.io` website.

<!-- end -->

It references the [Website Validation Reference](/website/website-validation/)

Using the [Website Validation Reference](/website/website-validation/), the following were the issues found and their solutions.

## Check for Vulnerabilities

[Using Snyk](/website/using-snyk/)

Snyk reported no issues.

<br/>

## Favicons

For details, see [Using Favicons](/website/using-favicons/)

Ran the Favicon checker for `www.johnvincent.io`

As the favicons are created by a Gatsby plugin, there is nothing I can do at this moment.

#### iOS Safari

Problems:

* The high resolution Touch icon is absent
* There is no Touch icon in the root directory

#### Windows 8 and 10

Problems:

* There is no Browser Configuration file at `https://www.johnvincent.io/browserconfig.xml`
* There is no tile icon for Windows
* The Browser Configuration file is absent

#### Mac OS X El Capitan Safari

Problems:

* The mask icon for Safari pinned tabs is absent
* The mask icon has no color

#### Classic, desktop browsers

* There is no favicon.ico in the root of your web site
* Image `https://www.johnvincent.io/icons/icon-48x48.png` may not be useful regarding its size
* There is an icon for classic browsers

<br/>

## Web App Manifest

For details, see [About Web App Manifests](/website/using-web-app-manifests/)

No additional issues found.

<br/>

## Meta tags for search engines

Keywords

```
meta-title
meta-description
meta-keywords
```

are already codes for all pages.

<br/>

## Meta Tags for Google, Facebook and Twitter

For details, see [Configuring Meta Tags](/taskmuncher/deploy/configuring-meta-tags/)

All tests passed.

#### Facebook

All tests passed.

### Twitter

Used [Twitter Validate meta tags](https://cards-dev.twitter.com/validator) to test `https://www.johnvincent.io`

All tests passed.

<br/>


## Varvy SEO Tool

[Varvy SEO Tool](https://varvy.com/)

Enter each URL and test.

Clean up any issues found.

* Accessibility
	* No skip to main content link

* Sitemaps
	* Add a user site map

### Varvy Speed Tool

[Varvy Speed Tool](https://varvy.com/pagespeed/)

Enter each URL and test.

Clean up any issues found.

* CSS not minimized
	* `https://www.johnvincent.io/css/all.css`

Edit file on server, file has 24 lines. Problem is caused by Scss files with comments at the top.

Fix:

```
Remove the header comments. Verify destination/css/all.css is only one line.
```

* Browser caching
	* Browser caching not enabled for all resources
		* Not enabled for third party resources www.google-analytics.com

Could fix with Nginx Header Module. for details, see [How to Implement Browser Caching with Nginx's header Module on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-implement-browser-caching-with-nginx-s-header-module-on-ubuntu-16-04)

```
#browser caching of static assets
    location ~*  \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 7d;
}
```

I have decided not to implement at this time.


### Varvy Mobile Tool

[Varvy Mobile Tool](https://varvy.com/mobile/)

Enter each URL and test.

Clean up any issues found.

```
Browser caching issues
```

See above

```
Mobile friendly: 100/100
Mobile speed: 99/100
Google access: yes
Page redirects: 0
```

<br/>

## Lighthouse

To run Lighthouse

* Open Chrome
* Enter URL
* Plugin Icon (top right)
	* Generate Report

### Test www.johnvincent.io

johnvincentio-lighthouse-scores

<a href="https://www.johnvincent.io" title="johnvincent.io Lighthouse Scores">
	<img class="post-image" src="/images/website/johnvincentio-lighthouse-scores.png" alt="johnvincent.io Lighthouse Scores" />
</a>




<br/>

### Test `www.johnvincent.io/about`

Same as above.

<br/>

### Test `www.johnvincent.io/portfolio`

Same as above.

<br/>

### Test `www.johnvincent.io/resume`

Same as above.

<br/>

### Test `www.johnvincent.io/privacy-policy/`

Same as above.

<br/>

### Test `www.johnvincent.io/terms-of-service/`

Same as above.

<br/>

### Test `www.johnvincent.io/blog`

```
SEO: 94
```

caused by the links on the right. No real answer to this other than a redesign.

Not clear to me that anyone using a mobile device would find the list useful.

<br/>

### Test `www.johnvincent.io/johnvincent/overview/`

Same links problem as above.

Performance: 79.

This is caused by the images. They should be moved.

<br/>

### Test `www.johnvincent.io/contact`

Lower scores caused by Google Maps. Nothing to do here.

<br/>

### Test `www.johnvincent.io/johnvincent/overview/`

Performance: 69

Many images, they should be moved to `images`.

### Test `www.johnvincent.io/node/node-authentication/`

Performance: 94

Caused by `/static/slider-bg2-36383f6….jpg` being a jpg file.

Image formats like JPEG 2000, JPEG XR, and WebP often provide better compression. This is a can of worms best left alone.


## Google Page Speed Insights

[Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

Score: 100/100

## Nibbler Tools

Free version of [Nibbler](http://nibbler.silktide.com/en_US) is limited to 5 URLs but is still very powerful.

```
Social interest: 0.0
Twitter: 0.4
Incoming links: 2.0
Popularity: 4.3
Amount of content: 8.1
Internal links: 10
Meta tags: 10
Headings: 10
Page titles: 10
Analytics: 10
Freshness: 10
```


## HTML Validator

[W3C Markup Validation](https://validator.w3.org/)

No errors

## CSS Validator

[CSS Validator by W3C](https://jigsaw.w3.org/css-validator/)

## RSS Feed Validator

[RSS Feed Validator](http://www.feedvalidator.org/)

[RSS Feed](http://www.johnvincent.io/feed.xml) passed the tests.

## Usability Checklist

[Usability Checklist](https://stayintech.com/UX)

Review all pages with this checklist.



## Check Google Fonts

For details, see [Google Fonts and Google Web Font Loader](/website/google-fonts/)

## Check HTML for ARIA

For details, see [HTML ARIA](/website/html-aria/)

## Check HTML for Microdata

For details, see [HTML Microdata](/website/html-microdata/)

Verify each URL with [Google Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/u/0/)

## Review HTML5 Semantics

Useful [HTML5 Semantics Guide](http://www.w3schools.com/html/html5_semantic_elements.asp)

Review your HTML5 Semantics
 
Verify each page with [Test HTML5 Semantics](https://gsnedders.html5.org/outliner/)


## Check your Libraries

Ensure you are using a cloud version.

Look up your libraries

* https://cdnjs.com/


## Review Application

* set focus (.focus())
* prevent double submits
* ensure image has alt tag
* review icons and images - can they be sprited?
* Using SVG?
