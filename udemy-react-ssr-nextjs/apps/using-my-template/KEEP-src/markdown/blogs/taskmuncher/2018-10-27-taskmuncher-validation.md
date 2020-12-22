---
meta-title: "TaskMuncher Website Validation | John Vincent"
meta-description: "John Vincent's discussion on TaskMuncher Website Validation including Seo, Aria, Microdata, Page Speed, Html Semantics, Css"
meta-keywords: "Seo, Aria, Microdata, Page Speed, Html, Css"

title: "TaskMuncher Website Validation"
subtitle: "Verify the Website Implementation"
lead: ""

category: [Taskmuncher, Html, Css, Seo, Aria, Microdata, Vulnerabilities, Page Speed]
permalink: /taskmuncher/deploy/website-validation/
---

This document discusses validation issues for the `www.taskmuncher.com` website.

It references the [Website Validation Reference](/website/website-validation/)

Using the [Website Validation Reference](/website/website-validation/), the following were the issues found and their solutions.

<!-- end -->

## Check for Vulnerabilities

[Using Snyk](/website/using-snyk/)

Snyk reported no issues.

<br/>

## Favicons

For details, see [Using Favicons](/website/using-favicons/)

Ran the Favicon checker for `www.taskmuncher.com`

No issues found.


## Web App Manifest

For details, see [About Web App Manifests](/website/using-web-app-manifests/)

Added to `site.webmanifest`

```
		"start_url": "index.html",
		"orientation": "landscape"
```

No other issues found.

<br/>

## Meta tags for search engines

Changed

```
meta-title
meta-description
meta-keywords
```

for all pages.

<br/>

## Meta Tags for Google, Facebook and Twitter

For details, see [Configuring Meta Tags](/taskmuncher/deploy/configuring-meta-tags/)

### Facebook

Used [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to test `https://www.taskmuncher.com`

No issues found.

### Twitter

Used [Twitter Validate meta tags](https://cards-dev.twitter.com/validator) to test `https://www.johnvincent.io`

No issues found.

<br/>

## Check Browser Caching

For details, see [Browser Caching](/website/browser-caching/)

Changed Nginx server block. Used the boilerplate.

Uncomment `include h5bp/basic.conf;`

Remove 

```
location ~*  \.(svg|jpg|jpeg|png|gif|ico|css|js|pdf)$ {
	expires 30d;
}
```

<br/>

## Varvy SEO Tool

[Varvy SEO Tool](https://varvy.com/)

Enter each URL and test.

Clean up any issues found.

* Page Speed
	* Browser caching issues

The problem is caused by 

```
<script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>
```

I cannot remove the code and I cannot modify and so there is nothing I can.


* Page Speed
	* HTML not minimized

Changed `deploy-apps`, added

```
#
# minify index.html
#
cp dist/index.html dist/index.work
html-minifier dist/index.work --remove-comments --output dist/index.html
```

Fixes the issue.

* Page Speed
	* CSS not minified

Problem is `main.bundle.css` which is minified but has a second line for source mapping. Remove the second line and 
the issue is resolved.

Fix `webpack.config.js`

```
const PRODUCTION_MODE = process.env.NODE_ENV === 'production';

devtool: PRODUCTION_MODE ? 'source-map' : 'inline-source-map',
```

Created new problems

* Render blocking CSS and/or JS
* Visible content not prioritized

Decided to use

```
devtool: 'inline-source-map'
```

for development and production.



* Accessibility
	* Language not declared ideally

Fix `index.hbs`

```
<html lang="en">
```

* Accessibility
	* No skip to main content link.

General issue, will require a separate project. 

For detailed description of how to fix, see [Skip to main content](https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/accessibility-handbook/mouse-and-keyboard-events/skip-to-main-content/)

Decided to leave this for now.

<br/>

### Varvy Speed Tool

[Varvy Speed Tool](https://varvy.com/pagespeed/)

Enter each URL and test.

* CSS delivery
	* Too many external CSS files
	* CSS not minimized

```
External CSS location

https://fonts.googleapis.com/css?family=Roboto:300,400,500,700

https://www.taskmuncher.com/main.bundle.css

https://fonts.googleapis.com/icon?family=Material+Icons
```

All 3 are needed. Nothing to be done.

* Browser caching
	* Browser caching not enabled for all resources
		* Not enabled for third party resources `apis.google.com`

Decided to leave this.

<br/>

### Varvy Mobile Tool

[Varvy Mobile Tool](https://varvy.com/mobile/)

* Mobile friendly = 100/100
* Mobile speed = 99/100
* Google access = yes
* Page redirects = 0

<br/>

## Lighthouse

To run Lighthouse

* Open Chrome
* Enter URL
* Plugin Icon (top right)
	* Generate Report

Test `www.taskmuncher.com`


#### Performance 

Caused by `bundle.js` which is `16.1Mb`

Chrome developer tools, network tab, `bundle.js`

* Response headers

```
content-encoding: gzip
cache-control: max-age=31536000
download size = 3.8MB
actual size = 15.4MB
```

Verified `bundle.js` has been made correctly by Webpack.
`bundle.js` is `16.1MB` on disk and is minified.
`bundle.js` has license info non-minified, which appears to be a legal requirement.

Don't see anything I can do about this.


#### Progressive Web App

* Page load is not fast enough on 3G.
	* Your page loads too slowly and is not interactive within 10 seconds.

* Does not respond with a 200 when offline
	* If you're building a Progressive Web App, consider using a service worker so that your app can work offline

* User will not be prompted to Install the Web App
	* Failures: Site does not register a service worker.
		* Browsers can proactively prompt users to add your app to their home screen, which can lead to higher engagement.

* Does not register a service worker
	* The service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to home screen, and push notifications

* Does not provide fallback content when JavaScript is not available
	* The page body should render some content if its scripts are not available.





#### Accessibility

Background and foreground colors do not have a sufficient contrast ratio.

Decided to leave this for now.

```
www.taskmuncher.com

21: Performance
35: Progressive Web App
92: Accessibility
100: Best Practices
100: SEO
```

<br/>


## Google Page Speed Insights

[Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

* Leverage browser caching
	* `https://apis.google.com/js/platform.js?onload=onLoadCallback`

Decided to leave it alone.

* Minifying https://www.taskmuncher.com/main.bundle.css could save 156B (39% reduction) after compression.

Added this to `deploy-apps`

```
echo "Minify main.bundle.css"
cp dist/main.bundle.css dist/main.bundle.css.work
html-minifier dist/main.bundle.css.work --remove-comments --output dist/main.bundle.css
```

actually works, as in the error goes away. Seems like such a terrible idea I removed the botch and 
decided to leave this alone.

Mobile

	* Page speed - unavailable
	* Optimization - Good 99/100

Desktop

	* Page speed - unavailable
	* Optimization - Good 99/100

<br/>

## HTML Validator

[W3C Markup Validation](https://validator.w3.org/)

No errors

## CSS Validator

[CSS Validator by W3C](https://jigsaw.w3.org/css-validator/)

No errors

## RSS Feed Validator

[RSS Feed Validator](http://www.feedvalidator.org/)

No feed to verify

<br/>

## Web Accessibility

[Web Accessibility Evaluation Tool](http://wave.webaim.org/)

Had to install the browser extension into Firefox.

* Home is correct.

* https://www.taskmuncher.com/#/join

Missing form label.

Caused by 

```
<input aria-invalid="false" aria-required="false" autocomplete="email" class="jss137 jss140 jss138" name="email" placeholder="Email Address" type="email" value="">
```

Code uses `TextField`. Fix with

```
InputProps={ {
	inputProps: {
		'aria-label': 'Email Address',
		'aria-required': 'true'
	}
} }
```

* https://www.taskmuncher.com/#/signin

Missing form label.

Applied `TextField` fix as above.

Applied fix to `CheckBox`

```
<FormControlLabel
	control={
		<Checkbox
			checked={this.state.remember}
			onChange={this.handleChange('remember')}
			value="checked"
			color="primary"
			inputProps={ {
				'aria-label': 'Remember',
				'aria-required': 'true'
			} }
		/>
	}
	label="Remember Me"
/>
```

* http://localhost:8055/#/contact

Missing form label.

Applied `TextField` fix as above and

```
InputProps={ {
	inputProps: {
		'aria-label': 'Name',
		'aria-required': 'true',
		maxLength: 40
	}
} }
```

for other properties.


## Nibbler Tools

Free version of [Nibbler](http://nibbler.silktide.com/en_US) is limited to 5 URLs but is still very powerful.

### Overall - 5.3

Implement and integrate social media to improve these scores.

* Facebook - 0
* Twitter - 0
* Popularity - 0
* Printability - 0
* Social interest - 0
* Heading - 0, which is false
* Analytics - 0, which is false
* Amount of content - 0, which is false
* Domain age - 2.1
* Mobile - 3, which is false
* URL format - 10.0
* Meta tags - 10.0
* Internal links - 10.0
* Page titles - 10.0
* Images - 10.0
* Server behavior - 10.0

#### Accessibility - 6.7

Caused by Headings - 0 and Mobile - 3.0 both of which are false.

Nothing to be done.

#### Experience - 4.3

Caused by:

* social media - 0, mobile - 3.0 can't do anything about them
* Amount of content - 0 which is false.

#### Marketing - 1.7

Caused by:

* social media - 0, mobile - 3.0 can't do anything about them
* Amount of content - 0 which is false.
* Analytics - 0 which is false.
* Incoming links - 7.5 which seems high


#### Technology - 7.4

Caused by:

* Printability - 0
* Headings - 0, which is false
* Domain age - 2.1
* Mobile - 3.0, which is false

<br/>

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

Nothing detected, doesn't seem to recognize the JavaScript.


## Review HTML5 Semantics

Useful [HTML5 Semantics Guide](http://www.w3schools.com/html/html5_semantic_elements.asp)

Review your HTML5 Semantics
 
Verify each page with [Test HTML5 Semantics](https://gsnedders.html5.org/outliner/)

Nothing detected, doesn't seem to recognize the JavaScript.


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
