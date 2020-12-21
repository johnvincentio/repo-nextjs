---
meta-title: "Overview of johnvincent.io | John Vincent"
meta-description: "John Vincent's discussion on Overview of johnvincent.io"
meta-keywords: "Deploy to Digital Ocean"

title: "Overview of johnvincent.io"
subtitle: "Built with Gatsby"
lead: ""

category: [Digital Ocean, Johnvincent.io, Gatsby]
permalink: /johnvincent/overview/
---

<a href="https://www.johnvincent.io" title="johnvincent.io Lighthouse Scores">
	<img class="post-image" src="/images/website/johnvincentio-lighthouse-scores.png" alt="johnvincent.io Lighthouse Scores" />
</a>

<!-- end -->

## Live Deployment 

[johnvincent.io](https://www.johnvincent.io/) is deployed to a Digital Ocean Droplet.

<a name="technical"></a>

## Technical

This implementation is a port from [johnvincent.io V1](https://www.johnvincent.io/johnvincent/v1/overview/), which was built using [Jekyll](https://www.johnvincent.io/blog/#Jekyll)

The intention is to build the website in the [Gatsby](https://www.johnvincent.io/blog/#Gatsby) and [React](https://www.johnvincent.io/blog/#React) world. A more suitable design will follow shortly.

* [johnvincent.io](https://www.johnvincent.io) is built using [Gatsby](/blog/#Gatsby), [React](/blog/#React), [HTML5](/blog/#Html), [Sass](/blog/#Sass) and [CSS3](/blog/#Css)

* [Gatsby](/blog/#Gatsby) is a React-based, GraphQL powered, static site generator. By weaving together the best parts of React, webpack, react-router, and GraphQL, Gatsby builds blazingly fast websites.

* [johnvincent.io](https://www.johnvincent.io/) is a [Progressive Web App (PWA)](/blog/#Pwa)

* [johnvincent.io](https://www.johnvincent.io/) is fully responsive, adapting for mobile, table and desktop viewports.

* All routing is handled by [Gatsby](/blog/#Gatsby)

* All client and server communications are performed using https.

* [johnvincent.io](https://www.johnvincent.io) fully implements [Google Analytics](/blog/#Google_Analytics)

* [johnvincent.io](https://www.johnvincent.io) fully supports [Google Webmaster Tools](/blog/#Google_Webmaster_Tools)

* [johnvincent.io](https://www.johnvincent.io) is deployed to an [Ubuntu droplet at Digital Ocean](/johnvincent/overview/#deploy) and kept running using [Pm2](/blog/#Pm2)

* [johnvincent.io](https://www.johnvincent.io) resources are served from [Nginx Server](/blog/#Nginx)

* The [Ubuntu droplet at Digital Ocean](/taskmuncher/overview/#deploy) can only be accessed with [SSH from a particular client](/taskmuncher/deploy/create-ubuntu-droplet/). All other access is disabled.

<a href="https://www.johnvincent.io" title="johnvincent.io">
	<img class="post-image" src="/images/website/app/home.png" alt="johnvincent.io" />
</a>

<a name="deploy"></a>

## Deployment Overview

Building and Configuring a Droplet can be very complex.

This is the first part of series of documents describing how to create and configure a droplet hosting.

The following documents describe a series of tasks. They should be performed in the order shown.

1. [Create Ubuntu Droplet at Digital Ocean](/johnvincent/create-ubuntu-droplet/)
2. [Digital Ocean - Install Nginx](/johnvincent/install-ubuntu-nginx/)
3. [Configuring Domains at Google Domains](/johnvincent/configuring-domains/)
4. [Configure non-SSL Nginx at Digital Ocean](/johnvincent/configure-http-nginx/)
5. [SSL Certificates - Let’s Encrypt & Nginx](/johnvincent/ssl-nginx)
6. [Configure SSL Nginx at Digital Ocean](/johnvincent/configure-https-nginx/)
7. [Google Webmaster Tools](/johnvincent/google-webmaster-tools/)
8. [Configure PM2](/johnvincent/configure-pm2/)
9. [Deploy johnvincent.io to Digital Ocean](/johnvincent/deploy-to-droplet/)
10. [Backup johnvincent.io from Digital Ocean](/johnvincent/backup-website/)

### Other

* [Gatsby Meta Tags](/gatsby/meta-tags/)
* [Gatsby Manifest](/gatsby/manifest/)
* [Gatsby Sitemap](/gatsby/sitemap/)
* [Gatsby Robots.txt](/gatsby/robots/)
* [Gatsby Google Analytics](/gatsby/google-analytics/)
* [Gatsby Webpack Bundle Analyzer](/gatsby/webpack-bundle-analyzer/)

<a href="https://www.johnvincent.io" title="johnvincent.io Portfolio">
	<img class="post-image" src="/images/website/app/portfolio.png" alt="johnvincent.io Portfolio" />
</a>

## Website Validation

The following describe tasks required for the validation of [johnvincent.io](https://www.johnvincent.io) at Digital Ocean.

[Website Validation Reference](/website/website-reference/)

[johnvincent.io Website Validation](/johnvincent/website-validation/)

## Maintenance

The following describe tasks required for the maintenance of [johnvincent.io](https://www.johnvincent.io) at Digital Ocean.

[Update SSL Certificates to Ubuntu at Digital Ocean](/johnvincent/update-ssl-certificates/)

[Maintaining Droplets at Digital Ocean](/johnvincent/maintaining-droplet/)

[Website Review](/website/website-review/)

[Review PM2](/johnvincent/configure-pm2/)

[Markdown Spelling](/website/markdown-spell-checking/)


## Monthly Review Topics

Review the following to ensure continuing compliance.

* [Google Webmaster Tools](/website/website-reference/#Google-Webmaster-Tools)
* [Google Analytics](/website/website-reference/#Google-Analytics)

## Updates

[Building and deploying MyTunes to johnvincent.io](/johnvincent/mytunes-overview/)

[Configuring Nginx to implement HTTP Basic Authentication](/johnvincent/nginx-restrict-access/)

[Building and deploying React GithubHelper App to johnvincent.io](/johnvincent/github-helper-overview/)


<a href="https://www.johnvincent.io" title="johnvincent.io Blog">
	<img class="post-image" src="/images/website/app/blog.png" alt="johnvincent.io Blog" />
</a>

<a name="technologies"></a>

## Technologies

### Client

* [Gatsby](/blog/#Gatsby)
* [React](/blog/#React)
* [Progressive Web App](/blog/#Pwa)
* [Styled Components](/blog/#Styled_Components)
* [HTML5](/blog/#Html)
* [CSS3](/blog/#Css)
* [Sass](/blog/#Sass)
* [Webpack](/blog/#Webpack)
* [Jest](/blog/#Jest)
* [Enzyme](/blog/#Enzyme)
* [Eslint](/blog/#Eslint)
* [Prettier](/blog/#Prettier)
* [Balsamiq](/blog/#Balsamiq)

### Production Deployment

* [Digital Ocean](/blog/#Digital_Ocean)
* [Ubuntu](/blog/#Ubuntu)
* [Nginx](/blog/#Nginx)
* [SSL certificates](/blog/#Ssl)
* [Node](/blog/#Node)
* [Npm](/blog/#Npm)
* [PM2](/blog/#Pm2)
