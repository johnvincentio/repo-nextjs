---
meta-title: "Google Mobile Usability | John Vincent"
meta-description: "Google Mobile Usability Issues"
meta-keywords: "google, search"

title: "Google Mobile Usability Issues"
subtitle: ""
lead: "How to resolve Google Mobile Usability Issues"

category: [Google]
permalink: /website/google-mobility-usability-issues/
---

Discussion about Google Mobile Usability Issues and how to resolve them.

<!-- end -->

To view the Mobile Usability, go to the [Google Search Console](https://search.google.com/search-console), see Mobile Usability (middle of left nav).

# Google Mobile Usability Issues

Received email from Google

```
Search Console has identified that your site is affected by 3 new issues of type Mobile Usability.

Top Issues (5 maximum)

The following issues were found on your site:

Text too small to read
Content wider than screen
Clickable elements too close together
```

To view the problem, go to the [Google Search Console](https://search.google.com/search-console), see Mobile Usability (middle of left nav).

3 Issues are shown.

## Content wider than screen

There are 4 URLs affected. 

### Study

The `subpage-header.scss` was using a `letter-spacing: 10px` for all screen widths. This causes some content to run beyond the width.

### Solution

Add to `subpage-header.scss`

```
@media only screen and (max-width: 500px) {
	#subpage-header {
    .block {
      padding-left: 0px;
      p {
        font-size: 16px;
      }
	  h1 {
       font-size: 30px;
       letter-spacing: 1px;
      }
    }
  }
}

@media only screen and (min-width: 501px) and (max-width: 767px) {
  #subpage-header {

    .block {
      padding-left: 0px;
      p {
        font-size: 20px;
      }
      h1 {
        font-size: 36px;
        letter-spacing: 3px;
      }
    }
  }
}
```

## Too small to read

The font size for `<p>` was 13px, the probable cause of the trouble.

### Solution

`style.scss`

```
   p {
-    font-size: 13px;
+    font-size: 14px;
   }
```

## Clickable elements too close together

4 URLs are affected.

This could be partially caused by the use of a too small font size, as noted above.

### Solution

1 URL had consecutive links that were list items. They were very close. Added some space between them.


## Google Search Console

From the console

* choose Mobile Usability

For each error type

* select error type
	* for each URL, select URL
	* Test Live Page
	* Ensure Page is mobile friendly 

When completed, for each error type

* select error type
* Validate Fix

For each error type, Received email from Google 

```
We're validating your Mobile Usability issue fixes for site johnvincent.io

To owner of johnvincent.io,

Google has started validating your fix of Mobile Usability issues on your site. Specifically, we are checking for ‘Text too small to read’, which currently affects 1 pages.

Validation can take a few days; we will send you a message when the process is complete. You can monitor the progress of the test by following the link below.
```

In time, received emails from Google stating the problems had been resolved.

With the resolution of these issues, it is entirely likely Google will search more pages and thus find more issues.


