---
meta-title: "Express Favicon | John Vincent"
meta-description: "John Vincent's discussion on Express Favicon"
meta-keywords: "Express Favicon"

title: "Express Favicon"
subtitle: "Using Express Favicon"
lead: "Install and Configure Favicon for an Express App"

category: [Express, Favicons]
permalink: /node/express-favicon/
---

Straightforward stuff, so let us begin.

<!-- end -->

# serve-favicon

[npm serve-favicon](https://www.npmjs.com/package/serve-favicon)

## Configure

I consider this to be middleware. Thus

`config/middleware.express.js`

```
const favicon = require('serve-favicon');
```

To reference the favicon

```
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
```

The actual code flow

```
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

app.use(morgan('common'));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/assets', express.static(path.resolve(__dirname, '../public/assets')));
```

Notice that `/public` is declared `express.static`

### Icon

Copy your `favicon.ico` to

* `public/favicon.ico`

### Reference Favicon

* `http(s)://my-website/favicon.ico`


