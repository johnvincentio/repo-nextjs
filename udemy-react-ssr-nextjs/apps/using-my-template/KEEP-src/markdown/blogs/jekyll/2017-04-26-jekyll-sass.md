---
meta-title: "Jekyll SASS Integration | John Vincent"
meta-description: "Jekyll SASS Integration"
meta-keywords: "Jekyll, SASS, css"

title: "Jekyll SASS Integration"
subtitle: ""
lead: "Integrating SASS into Jekyll is a challenge. This article describes some solutions."

category: [Jekyll, Sass]
permalink: /jekyll/jekyll-sass-integration/
---

SASS compilation could be performed by Jekyll or outside of Jekyll. Let's take a look.

<!-- end -->

# Standard Jekyll Configuration

Gemfile

```
source "https://rubygems.org"
ruby RUBY_VERSION

gem "jekyll", "3.3.1"
gem 'jekyll-sitemap'

group :jekyll_plugins do
   gem "jekyll-feed", "~> 0.6"
end
```

`_config.yml`

```

markdown: kramdown

source: source
destination: destination

exclude: ['node_modules']

gems:
  - jekyll-sitemap

permalink: none
comments: true
defaults:
  -
    scope:
      path: "" # an empty string here means all files in the project
      type: "posts"
    values:
      layout: "post"
      author: "John Vincent"
      category: "jekyll"
```

Note `sitemap` configuration.

1. `Gemfile (gem 'jekyll-sitemap')`
2. `_config.yml (gems: - jekyll-sitemap)`


`_config_dev.yml`

```
url: "http://localhost:4000"
my_env: "development"
```

`_config_prod.yml`

```
url: "https://johnvincent.io"
my_env: "production"
```

`build-dev`

```
#!/bin/sh
#
#  script to run jekyll build in a development environment
#
# for debugging, use --trace
#
bundle exec jekyll serve --config=_config.yml,_config_dev.yml --watch --drafts
```

build-prod

```
#!/bin/sh
#
#  script to run jekyll build in a production environment
#
# JEKYLL_ENV=production jekyll build
#
JEKYLL_ENV=production jekyll build --config=_config.yml,_config_prod.yml
```



## Standard SASS Compiler

Folders:

* `source/scss` - scss files are here
* `source/css` - compiled css files are here.

Source/build-sass

```
#!/bin/sh
#
# script to run sass
#
# non compressed
# sass --watch scss:css --line-numbers --style expanded
#
# compressed
#
sass --watch scss:css --style compressed
```

`index.html`

```
<link rel="stylesheet" href="css/all.css">
```

## Jekyll Running SASS Compiler

Folders:

* `source/css` - main scss files
* `source/_sass` - included scss files
* `destination/css` - css files

`_config.yml`

```
sass:
    sass_dir: _sass
    style: :compressed
```

### Jekyll Inlining CSS into HTML

This very drastically slows down the jekyll build. It may be best to not do this until all styling is completed.

However, this works and significantly improves page speed scores.

#### Folders

* `source/_includes` - main scss files
* `source/_sass` - included scss files

#### HTML

Test

```
{% include head.html %}
```


Replace style sheets

```
link rel="stylesheet" href="css/style.css">
```

with

```
{% include head.html %}
```

`_includes/head.html`

```
<style>
{% capture include_to_scssify %}
{% include style.scss %}
{% endcapture %}
{{ include_to_scssify | scssify }}
</style>
```

`style.scss` is compiled, compressed and inserted in a style tag.
