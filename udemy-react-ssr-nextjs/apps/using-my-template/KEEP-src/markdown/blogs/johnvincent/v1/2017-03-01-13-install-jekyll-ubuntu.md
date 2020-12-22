---
meta-title: "Install Jekyll Ubuntu | John Vincent"
meta-description: "John Vincent's discussion on Install Jekyll Ubuntu"
meta-keywords: "Install Jekyll Ubuntu"

title: "Install Jekyll Ubuntu"
subtitle: ""
lead: ""

category: [Jekyll, Ubuntu, Jekyll Website]
permalink: /johnvincent/v1/install-jekyll-ubuntu/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/v1/overview/)

<!-- end -->

# Install Jekyll Ubuntu

[Useful reference](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jekyll-development-site-on-ubuntu-16-04)

```
sudo apt-get update
```

Then we’ll install Ruby and its development libraries as well as make and `gcc` so that Jekyll's libraries will compile once we install Jekyll:

```
sudo apt-get install ruby ruby-dev make gcc
```

When that's complete, we'll use Ruby's gem package manager to install Jekyll itself as well as the bundler to manage Gem dependencies:

```
sudo gem install jekyll bundler

sudo gem uninstall jekyll

sudo bundle install
```

Install additional gems

```
cd demosite
sudo bundle
```

### Production

Added script build-prod

```
#!/bin/sh
#
#  script to run jekyll build in a production environment
#
# JEKYLL_ENV=production jekyll build
#
JEKYLL_ENV=production jekyll build --config=_config.yml,_config_prod.yml
```

### Development

Added script `build-dev`

```
#!/bin/sh
#
#  script to run jekyll build in a development environment
#
# for debugging, use --trace
#
bundle exec jekyll serve --config=_config.yml,_config_dev.yml --watch --drafts
```

From browser

```
http://localhost:4000/
```