---
meta-title: "SVG Sprites | John Vincent"
meta-description: "John Vincent's discussion on SVG Sprites"
meta-keywords: "SVG, Sprites"

title: "SVG Sprites"
subtitle: "Using SVG Sprites"
lead: "How to choose SVG icons, download them as a sprite and use them in your Application"

category: [Svg, Sprites]
permalink: /website/svg-sprites/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# SVG Icons and Sprites

There are many sites for downloading of SVG icons. [Flaticon](https://www.flaticon.com) is a favorite.

## Flaticon.com

Using Flaticon.com as an example, select your icons into a collection.

* Download collection
* SVG Sprite
* Downloads as a zip.
* Unzip
* Notice `{file}.svg`

Copy this file to `views/partials/common/svgsprite.hbs`

Can download a single icon as a SVG file.

* Select icon
* SVG
* Customize your icon (choose color carefully)
* Download

Edit `views/partials/common/svgsprite.hbs` and insert the `svg` code.

## Create Icons

There are many solutions but I like [Sketch](https://sketchapp.com/)


## Use the icons

For example

`views/partials/common/svgsprite.hbs`

```
<symbol id="delete" viewBox="0 0 348.333 348.334">
    <title>delete</title>
    <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85 c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563 c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85 l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554 L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>
</symbol>
```

```
<h1>
    <svg>
        <use xlink:href="#delete"></use>
    </svg>
    Save
</h1>
```

sass

```
h1 {
    color: palette(features, text);
    font-size: 1.6em;
    text-align: center;
    vertical-align: middle;
    svg {
        vertical-align: middle;
        padding-right: 5px;
        width: 45px;
        height: 45px;
        fill: palette(features, text);
    }
}
```
