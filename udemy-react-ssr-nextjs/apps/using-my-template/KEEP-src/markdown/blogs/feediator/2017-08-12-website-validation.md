---
meta-title: "Feediator Website Validation | John Vincent"
meta-description: "John Vincent's discussion on Feediator Website Validation including Seo, Aria, Microdata, Page Speed, Html Semantics, Css"
meta-keywords: "Seo, Aria, Microdata, Page Speed, Html, Css"

title: "Feediator Website Validation"
subtitle: "Verify the Feediator Implementation"
lead: ""

category: [Feediator, Html, Css, Seo, Aria, Microdata, Vulnerabilities, Page Speed]
permalink: /feediator/website-validation/
---

This document discusses validation issues for the `www.feediator.com` website.

<!-- end -->

It references the [Website Validation Reference](/website/website-validation/)

Using the [Website Validation Reference](/website/website-validation/), the following were the issues found and their solutions.

## Check for Vulnerabilities

[Using Snyk](/website/using-snyk/)

Snyk reported no issues.

<br/>

## Favicons

For details, see [Using Favicons](/website/using-favicons/)

Ran the Favicon checker for `www.feediator.com`


<br/>

## Web App Manifest

For details, see [About Web App Manifests](/website/using-web-app-manifests/)

No additional issues found.

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

For details, see [Configuring Meta Tags](/feediator/deploy/droplet/)

### Facebook

Used [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to test `https://www.feediator.com`

All tests passed.

<br/>


### Twitter

Used [Twitter Validate meta tags](https://cards-dev.twitter.com/validator) to test `https://www.feediator.com`

All tests passed.

<br/>

## Check Browser Caching

For details, see [Browser Caching](/website/browser-caching/)

Ensure browser is caching certain resources.

Has `maxage = 0`

Note the static resources are being served from the Express server, not from Nginx.

`config/middleware.express.js`

changed

```
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/assets', express.static(path.resolve(__dirname, '../public/assets')));
```

to

```
var options = {
	maxAge: '90d'
};
app.use(express.static(path.resolve(__dirname, '../public'), options));
app.use('/assets', express.static(path.resolve(__dirname, '../public/assets'), options));	
```

## Page Speed

[Go to Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

```
www.feediator.com
```

Scores

```
Mobile: 93/100
Desktop: 97/100
```

The only issue is 

```
https://www.feediator.com/assets/css/home/styles.css
```

<br/>

## Varvy SEO Tool

[Varvy SEO Tool](https://varvy.com/)

Enter each URL and test.

Clean up any issues found.

* If modified Since

Odd finding. `Postman` Get on `https://www.feediator.com` does indeed not return the `Last-Modified` property. Also shows there is no caching

`Cache-Control →public, max-age=0`

`Postman` Get on `https://www.feediator.com/assets/css/home/styles.css` returns the `Last-Modified` property.

`Postman` Get on `https://johnvincent.io` returns the `Last-Modified` property.

Express server would need to return the `last-modified` property, which assumes it knows. However, it realistically cannot know as the Html is not static.

Decided to leave it.


### Varvy Speed Tool

[Varvy Speed Tool](https://varvy.com/pagespeed/)

Enter each URL and test.

Clean up any issues found.

* JavaScript not minimized
	* `assets/js/home/home.js`

Minimal impact. Decided to leave it.



### Varvy Mobile Tool

[Varvy Mobile Tool](https://varvy.com/mobile/)

Enter each URL and test.

```
Mobile friendly: 100
Mobile Speed: 91
```

All tests passed.

<br/>

## HTML Validator

[W3C Markup Validation](https://validator.w3.org/)

* Stray start tag head

`main.hbs` had the extra code. Removed it.

* `<nav .... role="navigation">`

Removed `role="navigation"`

*`<main role="main">`

Removed `role="main"`

* ` Bad value contentinfo for attribute role on element`

`home.hbs` had `<ul ... role="contentinfo"`

Removed `role="contentinfo"`

<br/>


## CSS Validator

[CSS Validator by W3C](https://jigsaw.w3.org/css-validator/)

* `alpha(opacity=85)` is an unknown vendor extension.

Problem is in `_header.scss`, calls a mixin `@include opacity(0.85);`.

The mixin

```
@mixin opacity($opacity) {
    opacity: $opacity;
    $opacity-ie: $opacity * 100;
    filter: alpha(opacity=$opacity-ie); //IE8
}
```

The trouble is `filter: alpha(opacity=$opacity-ie);`

Code is not helpful and so I removed it.

* `--cover-min-height: 100px}`

Removed the code.

<p>
    <a href="https://jigsaw.w3.org/css-validator/check/referer">
        <img style="border:0;width:88px;height:31px"
            src="https://jigsaw.w3.org/css-validator/images/vcss"
            alt="Valid CSS!" />
    </a>
</p>

<br/>


## Usability Checklist

[Usability Checklist](https://stayintech.com/UX)

Review all pages with this checklist.


## Web Accessibility

[Web Accessibility Evaluation Tool](http://wave.webaim.org/)

1 alert, p should be h?

Changed

```
<p class="info">Designed for your reading pleasure</p>
```

to 

```
<h2 class="info">Designed for your reading pleasure</h2>
```

No css changes needed.



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

<br/>



## Lighthouse

To run Lighthouse

* Open Chrome
* Enter URL
* Plugin Icon (top right)
	* Generate Report

### Test `https://www.feediator.com`


#### Accessibility

Background and foreground colors do not have a sufficient contrast ratio.

Odd as same color and background colors are used for other text in the intro section.

Change font-weight from 300 to 400.

[Accessibility Engine](https://dequeuniversity.com/rules/axe/2.2/color-contrast?application=lighthouse) is a useful tool

Provides a color contrast analyzer. Used this to set the foreground color `#ffffff` to find a background color close to the original primary color `#1f8dd6` which passes the contrast test.

Settled on `#105B8E`

This fixed the problem.

#### Progressive Web App

Needs a service worker etc. 

This is not a Progressive Web App and so it doesn't need service workers.

No changes.

```
www.feediator.com

93: Performance
73: Progressive Web App
100: Accessibility
100: Best Practices
100: SEO
```

<br/>


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
