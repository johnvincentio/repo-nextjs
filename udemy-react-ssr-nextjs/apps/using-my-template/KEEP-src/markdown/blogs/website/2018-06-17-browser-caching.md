---
meta-title: "Browser Caching Reference | John Vincent"
meta-description: "John Vincent's discussion on Browser Caching"
meta-keywords: "Seo, Aria, Microdata, Page Speed, Html, Css"

title: "Browser Caching Reference"
subtitle: "Verify the Website Implementation"
lead: ""

category: [Nginx, Page Speed]
permalink: /website/browser-caching/
---

This is a discussion regarding browser caching.

<!-- end -->

For more website validation documentation, see [Website Validation Reference](/website/website-validation/)

A useful resource, [Web Fundamentals, HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)

Audit pages to identify which resources can be cached and ensure that they return appropriate `Cache-Control` and `ETag` headers.

# Browser Caching

If Cache-Control: max-age = 0, the resource will not be cached.

To check browser caching

* run [Varvy SEO Tool](https://varvy.com/)
* enter the URL to be tested

the tool will test for browser caching problems.

Browser caching problems are caused by incorrect server configuration.

## Nginx Serving Static Resources

For Nginx configuration details, see [Configure HTTPS Nginx](/taskmuncher/deploy/configure-https-nginx/)

Check Nginx HTTPS Server Configuration. Ensure has

```
location ~*  \.(svg|jpg|jpeg|png|gif|ico|css|js|pdf)$ {
	expires 30d;
}
```

or

```
location ~*  \.(svg|jpg|jpeg|png|gif|ico|css|js|pdf)$ {
	add_header Cache-Control "max-age=31536000";
	access_log off;
}
```

or, at least cache the images.

## Express Serving Static Resources

Check:

* Chrome Tools
* Network tab
* Response Headers
	* cache-control: max-age

max-age = 0 => no caching.

If this value is not set properly, read on.

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

or whatever is a suitable value.

## Check Browser Caching

In Chrome Developer Tools

* Network tab
* Disable `Disable cache` (top nav)
* Enter URL

For each item that should be cached, check the Response Headers, for example

```
cache-control: max-age=2592000
content-encoding: gzip
etag: W/"5b4dxvwh-w6b692"
expires: Thu, 16 Aug 2018 14:56:18 GMT
last-modified: Tue, 17 Jul 2018 14:29:36 GMT
server: nginx
status: 200
```

and the Request Headers, for example

```
cache-control: no-cache
pragma: no-cache
```

`etag` value is sent to the server so that

* The server uses the `ETag` HTTP header to communicate a validation token.
* The validation token enables efficient resource update checks: no data is transferred if the resource has not changed.

"no-cache" indicates that the returned response can't be used to satisfy a subsequent request to the same URL without first checking with the server if the response has changed. As a result, if a proper validation token `(ETag)` is present, no-cache incurs a roundtrip to validate the cached response, but can eliminate the download if the resource has not changed.

Ensure `content-encoding: gzip` as this makes a huge difference in download size and timing.

* Size is the combined size of the response headers (usually a few hundred bytes) plus the response body, as delivered by the server.
* Content is the size of the resource's decoded content. If the resource was loaded from the browser's cache rather than over the network, this field will contain the text (from cache).


## Test Single Resource

Lets use a simple resource `https://www.taskmuncher.com/assets/icons.svg`

#### First get

```
status = 200
timing = 50.96ms
```

#### Second get

```
status = 304
timing = 5.10ms
```

## Test Website Page

Lets use `https://www.taskmuncher.com`

#### First get

All resources return

* status = 200
* lengthy downloads

#### Second get

All resources return

* status = 200
* size = (from memory cache) or (from disk cache)
* downloads are generally `0ms`

