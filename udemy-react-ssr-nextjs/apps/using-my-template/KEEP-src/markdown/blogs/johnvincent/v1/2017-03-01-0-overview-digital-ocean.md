---
meta-title: "Overview of V1 johnvincent.io website | John Vincent"
meta-description: "John Vincent's discussion on V1 Deploy to Digital Ocean"
meta-keywords: "Deploy to Digital Ocean"

title: "Overview of johnvincent.io Jekyll website"
subtitle: ""
lead: ""

category: [Digital Ocean, Jekyll Website]
permalink: /johnvincent/v1/overview/
---


[![Home](/images/portfolio/demosite.gif)](https://www.johnvincent.io/)

<!-- end -->

## Technologies

### Client

* Html5
* jQuery
* Bootstrap
* CSS3
* Sass

### Server

* Jekyll
* Ghost
* Mongo

### Deployment

* Digital Ocean
* Ubuntu
* Nginx
* SSL certificates
* Node
* Npm
* Jekyll
* Ghost
* Mongo
* PM2

## Deployment Overview

Building and Configuring a Droplet can be very complex.

This is the first part of series of documents describing how to create and configure a droplet hosting.

The following documents describe a series of tasks. They should be performed in the order shown.

1. [Create Ubuntu Droplet at Digital Ocean](/johnvincent/create-ubuntu-droplet/)
2. [Digital Ocean - Install Nginx](/johnvincent/install-ubuntu-nginx/)
3. [Configuring Domains at Google Domains](/johnvincent/configuring-domains/)
4. [Configure non-SSL Nginx at Digital Ocean](/johnvincent/configure-http-nginx/)
5. [SSL Certificates - Let’s Encrypt & Nginx](/johnvincent/ssl-nginx/)
6. [Configure SSL Nginx at Digital Ocean](/johnvincent/configure-https-nginx/)
7. [Install Ghost on Ubuntu at Digital Ocean](/johnvincent/v1/install-ghost/)
8. [Configure Mailgun for Ghost](/johnvincent/v1/configure-mailgun-for-ghost/)
9. [Configure Ghost](/johnvincent/v1/configure-ghost/)
10. [Install PM2 to keep Ghost running](/johnvincent/v1/install-pm2/)
11. [Adding Disqus to Ghost](/johnvincent/v1/adding-disqus-to-ghost/)
12. [Adding Google Analytics for Ghost](/johnvincent/v1/google-analytics-for-ghost/)
13. [Install Jekyll on Ubuntu](/johnvincent/v1/install-jekyll-ubuntu/)
14. [Install Mongo on Ubuntu](/johnvincent/install-mongo-ubuntu/)
15. [Google Webmaster Tools](/johnvincent/google-webmaster-tools/)

## Maintenance

[Update SSL Certificates to Ubuntu at Digital Ocean](/johnvincent/update-ssl-certificates/)

[Maintaining Droplets at Digital Ocean](/johnvincent/maintaining-droplet/)

## Deployment

[Deploy to Ubuntu at Digital Ocean](/johnvincent/deploy-to-droplet/)

## Website Validation

[Website Validation Reference](/website/website-validation/)

[Website Validation](/johnvincent/website-validation/)

## Updates

[Configuring Site Map using Jekyll](/jekyll/jekyll-site-map/)


## robots.txt

Add file `source/robots.txt`

```
---
layout: null
---

User-agent: *
Sitemap: https://johnvincent.io/sitemap.xml
```

### Add using Google Webmaster Tools

* Select: `johnvincent.io`
* Crawl
* robots.txt Tester
* Submit `robots.txt`
