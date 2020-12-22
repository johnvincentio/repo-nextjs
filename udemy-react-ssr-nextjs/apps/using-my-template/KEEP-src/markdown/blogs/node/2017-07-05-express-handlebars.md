---
meta-title: "Express Handlebars | John Vincent"
meta-description: "John Vincent's discussion on Express Handlebars"
meta-keywords: "Express Handlebars"

title: "Express Handlebars"
subtitle: "Using Express Handlebars"
lead: "Handlebars for an Express App"

category: [Express, Handlebars]
permalink: /node/express-handlebars/
---

Straightforward stuff, so let us begin.

<!-- end -->

# NPM express-handlebars

[npm express-handlebars](https://www.npmjs.com/package/express-handlebars)

## Configure

Configuration is performed in the middleware layer.

`config/middleware.express.js`

```
app.engine('hbs', hbs({
    extname: 'hbs', defaultLayout: 'main',
    layoutsDir: __dirname+'/../views/layouts/',
    partialsDir: __dirname + '/../views/partials/'
}));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
```

Structure, as an example

```
root
  views
    layouts
    pages
      home
      login
      register
      reset-password
    partials
      home
```

## Render

Snippet from default layout, `main.hbs`

```
<title>{{ title }}</title>
...

{{{ body }}}

<script src="//code.jquery.com/jquery-3.1.1.min.js"></script>

<script src="/assets/js/{{ js }}"></script>
```

Login page

```
app.get('/login', function(req, res) {
    return res.render('pages/login/login', {
        title: 'Login - News Reader',
        js: 'login/login.js'
    });
});
```

Note
* Uses the default layout
* {{{ body }}} is replaced with `pages/login/login`
* {{ title }} is replaced with `Login - News Reader`
* {{ js }} is replaced with `login/login.js`
* The generated Html is sent with the response.
It is a very simple structure that is used by many endpoints.

It can be used anywhere, including controllers

```
let data = emailUtils.userRegistrationConfirmedEmail(req, _user.username);
emailUtils.sendEmail(data);
return res.render('pages/register/complete', {
    title: 'Registration is complete',
    js: 'login/empty.js'
});
```
    
Note that main is the default layout but it can be overridden.

The home page also uses handlebars. This allows

* Break up the Html into partials
* Keep data out of the Html by using variables.
* This layout is highly reusable.

Route

```
app.get('/', function(req, res) {
    let home_url = `${req.protocol}://${req.get('host')}`;
    return res.render('pages/home/home', {
        layout: 'home',
        title: 'News Reader',
        description: 'News Reader by John Vincent',
        keywords: 'News Reader, RSS, Rss Feed, Mongo, Node, Sass, aggregator',
        author: 'John Vincent',
        twitter_username: 'johnvincentio',
        google_profile: 'https://plus.google.com/107711732062970686024',
        home_url
    });
});
```

## Partials

A critical part of the system. As above, home page uses

* layout = `home.hbs`
* page = `pages/home/home`
   
Snippet from layout

```
<body>

{{{ body }}}

{{> home/google-analytics }}

</body>
```

This allows Google Analytics code to be separate from the page.

{{{ body }}} is replaced with pages/home/home which follows

```
{{> home/header }}

{{> home/splash }}

<section class="content-wrapper">

    {{> home/features }}

    {{> home/testimonials }}

    <section id="get-started" class="section-our-plans content">
        <h2 class="content-head is-center">Our Plans</h2>

        {{> home/pricing }}

        {{> home/information }}

    </section>

    {{> home/contact-us }}

    {{> home/footer}}

</section>

{{> home/google-fonts }}

<script defer src="/assets/js/home/home.js"></script>
```

The syntax for the partial home/header is

```
{{> home/header }}
```

This allows for the home page to be defined as partials, which replaces {{{ body }}} in the home page layout.

Beautifully simple.
