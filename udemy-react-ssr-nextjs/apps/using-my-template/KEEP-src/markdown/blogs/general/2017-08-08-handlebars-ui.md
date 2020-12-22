---
meta-title: "Handlebars in the Browser | John Vincent"
meta-description: "John Vincent's discussion about Handlebars in the Browser"
meta-keywords: "Handlebars"

title: "Handlebars in the Browser"
subtitle: ""
lead: "Handlebars"

category: [Handlebars]
permalink: /general/handlebars-browser/
---

Let's build the browser UI code with handlebars.

<!-- end -->

# Handlebars

[Handlebars](http://handlebarsjs.com/)

[Handlebars installation](http://handlebarsjs.com/installation.html)

## Goals

Let's describe a few goals

* Separate HTML from JavaScript.
* HTML should look like HTML.
* Must be very fast at runtime.

## Installation

Already have handlebars installed with

```
npm install express-handlebars --save
```

If not already installed, can use

```
npm install handlebars --save
```

## Configuration

Handlebars files by default use the .handlebars extension.

I have chosen to use `.hbs` for all my handlebars files.

I have chosen to put my handlebars templates in folder

```
public/assets/js/templates
```

and I want the compiled templates to be in

```
public/assets/js/templates.js
```

## Compilation

I have chosen to use `package.json`

```
"scripts": {

...

"templates": "./node_modules/.bin/handlebars public/assets/js/templates -e hbs -f public/assets/js/templates.js"

}
```

To compile the templates

```
npm run templates
```

## Browser Configuration

Downloaded Handlebars runtime `handlebars.runtime-v4.0.10.js` and saved in 

```
public/assets/js/vendor/handlebars.runtime-v4.0.10.js
```

Load Handlebars library and templates

```
<script src="/assets/js/vendor/handlebars.runtime-v4.0.10.js"></script>

<script src="/assets/js/templates.js"></script>
```

## Get and populate the template

For example, have template

```
dashboard.hbs
```

To get the template and populate it

```
var context = {"key1": "value1", "key2: "value2"};

var templateScript = Handlebars.templates.dashboard(context);
console.log("templateScript "+templateScript);
```
