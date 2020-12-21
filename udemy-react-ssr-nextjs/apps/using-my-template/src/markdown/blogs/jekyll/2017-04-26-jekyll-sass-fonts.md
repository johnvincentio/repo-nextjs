---

meta-title: "Jekyll SASS Fonts | John Vincent"
meta-description: "Configuring SASS to include Fonts using Jekyll"
meta-keywords: "Jekyll, Fonts"

title: "Jekyll SASS Fonts"
subtitle: "Configuring 3rd party Fonts"
lead: "Sass include 3rd party font libraries"

category: [Jekyll, Sass, Fonts]
permalink: /jekyll/jekyll-sass-fonts/
---

This article describes how to sass include 3rd party fonts.

* bootstrap
* font awesome
* ionicons

<!-- end -->

## Font Awesome

[Download](http://fontawesome.io/) and unzip.

* move fonts folder to `source/fonts/font-awesome`
* move scss folder to `source/_sass/font-awesome`

## Ionicons

[Download](http://ionicons.com/) and unzip.

* move fonts folder to `source/fonts/ionicons`
* move scss folder to `source/_sass/ionicons`

## Bootstrap

[Download SASS](http://getbootstrap.com/getting-started/) and unzip.

* move `assets/fonts` folder to `source/fonts/bootstrap`
* move `assets/stylesheets` folder to `source/_sass/bootstrap-sass`
* move `assets/javascripts/bootstrap.min.js` to `source/js/vendor/bootstrap.min.js`

## Jekyll Configuration

`source/css/all.scss`

```
---

---

$icon-font-path:      "../fonts/bootstrap/";
$fa-font-path:        "../fonts/font-awesome";
$ionicons-font-path:  "../fonts/ionicons";

@import "bootstrap-sass/bootstrap";
@import "font-awesome/font-awesome";
@import "ionicons/ionicons";
```

Note

* `-font-path `overrides the default font files location.
* `@import` includes library scss

Constructs file `destination/all.css`

