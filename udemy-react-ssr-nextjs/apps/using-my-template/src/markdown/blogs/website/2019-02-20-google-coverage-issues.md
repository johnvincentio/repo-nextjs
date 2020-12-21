---
meta-title: "Google Coverage Issues | John Vincent"
meta-description: "Google Coverage Issues"
meta-keywords: "google, search"

title: "Google Coverage Issues"
subtitle: ""
lead: "How to resolve Google Coverage Issues"

category: [Google, Jekyll]
permalink: /website/google-coverage-issues/
---

Discussion about Google Coverage Issues and how to resolve them.

<!-- end -->

## Google Coverage Issues

Received email from Google

```
Search Console has identified that your site is affected by 1 new issue of type Coverage.

Top Errors (5 maximum)

Errors can prevent your page or feature from appearing in Search results. The following errors were found on your site:

Submitted URL seems to be a Soft 404
```

To view the problem, go to the [Google Search Console](https://search.google.com/search-console), see Coverage (middle of left nav).

### Study

The search engine had quite rightly determined that `/error` is a soft 404 page.

This is intentional. Any invalid URL entered by the user I very much prefer to provide a user friendly error page with details as to how the user can correct his error.

This was implemented with the following from the Nginx server configuration code

```
error_page 404 /error;
```

### Solution

I am not willing to remove the soft 404 page.

The solution is to ensure that `/error` is not in the `sitemap.xml`

### Jekyll

Changed `error.html` yaml by adding

```
sitemap: false
```

Thus, when the sitemap is generated `error.html` will not be added to `sitemap.xml`.

### Google Search Console

From the console

* choose Sitemaps
* provide the URL of the sitemap and submit

* choose Coverage
* request coverage be checked.

Received email from Google 

```
We're validating your Coverage issue fixes for site https://www.johnvincent.io/

To owner of https://www.johnvincent.io/,

Google has started validating your fix of Coverage issues on your site. Specifically, we are checking for ‘Submitted URL seems to be a Soft 404’, which currently affects 1 pages.

Validation can take a few days; we will send you a message when the process is complete. You can monitor the progress of the test by following the link below.

See validation flow progress
```

Took about 8 days but I got an email stating

```
Coverage issues successfully fixed for site https://www.johnvincent.io/

To owner of https://www.johnvincent.io/,

Google has validated your fix of Coverage issues on site https://www.johnvincent.io/. The specific issue validated was 'Submitted URL seems to be a Soft 404'.

1 pages on your site were validated as fixed.

To examine full details on the validation progress and to learn if there are other Coverage related issues to fix, please follow this link.
```

The problem is resolved.






