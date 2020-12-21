---
meta-title: "Google Fonts | John Vincent"
meta-description: "Google Fonts and Webfontloader synchronously and asynchronously load fonts"
meta-keywords: "google, webfontloader, async"

title: "Google Fonts and Webfontloader"
subtitle: ""
lead: "Use Google Webfontloader to load your fonts."

category: [Google, Fonts, Webfontloader]
permalink: /website/google-fonts/
---

Discussion about Google Fonts and how to best load them.

<!-- end -->

## Google Fonts

[Google Fonts Developer Guide](https://developers.google.com/fonts/) provides documentation.

[Google Web Fonts Helper](https://google-webfonts-helper.herokuapp.com/fonts/open-sans?subsets=latin)

From [Google Fonts](https://fonts.google.com/) choose your fonts.

When finished, select family.

## Load Fonts

#### Standard

For example:

```
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Roboto:100,300,400,500,700" rel="stylesheet">
```

#### @import

For example:

```
<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Roboto:100,300,400,500,700');
</style>
```

In practice, this is poor as loading of the fonts will block the loading of the style sheet.

### css

```
font-family: 'Roboto', sans-serif;
font-family: 'Open Sans', sans-serif;
```

## Google Web Font Loader

[Google Web Font Loader](https://github.com/typekit/webfontloader) provides full documentation.

[Google Fonts Web Font Loader](https://developers.google.com/fonts/docs/webfont_loader)

Using the Google Web Font Loader improves the page speed score.

### Synchronously Load

For example:

```
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script>
  WebFont.load({
    google: {
      families: ['Roboto:100,300,400,500,700', 'Open Sans:300,400,600']
    }
  });
</script>
```

### Asynchronously Load

For example:

```
<script>
WebFontConfig = {
    google: {
        families: ['Roboto:100,300,400,500,700', 'Open Sans:300,400,600']
    }
};

(function(d) {
    var wf = d.createElement('script'), s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);
</script>
```

This is extremely helpful at improving page speeds. However, there is a price.

Using the Web Font Loader asynchronously avoids blocking your page while loading the JavaScript. Be aware that if the script is used asynchronously, the rest of the page might render before the Web Font Loader is loaded and executed, which can cause a [Flash of Unstyled Text (FOUT)](http://help.typekit.com/customer/portal/articles/6852).

This article discusses techniques for dealing with this.

