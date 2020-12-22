---
meta-title: "Deploy Static Website to Heroku | John Vincent"
meta-description: "John Vincent's Deploy Static Website to Heroku"
meta-keywords: "Heroku"
title: "Deploy Static Website to Heroku"

subtitle: ""
lead: ""

category: [Heroku]
permalink: /general/deploy-static-website-heroku/
---

This document discusses how to deploy a basic static website to Heroku.

<!-- end -->

# Local Development

[Rijksmuseum at Github](https://github.com/johnvincentio/rijksmuseum)

Project directory

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku

git clone git@github.com:johnvincentio/rijksmuseum.git
```

Move to code directory

```
cd rijksmuseum
```

Rename `index.html`

```
mv index.html home.html
```

Create file

`/Users/jv/Desktop/MyDevelopment/github/projects-heroku/rijksmuseum/index.php`

```
<?php include_once("home.html"); ?>
```

Create file `composer.json`

```
{}
```

Commit to repo

```
git add .
git commit -m "init"
```

## Heroku Login

Login to Heroku

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/rijksmuseum

heroku login
```

## Create Heroku App

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/rijksmuseum

heroku create johnvincentio-rijksmuseum
```

```
https://johnvincentio-rijksmuseum.herokuapp.com/ | https://git.heroku.com/johnvincentio-rijksmuseum.git
```

* Application url: `https://johnvincentio-rijksmuseum.herokuapp.com/`
* Heroku git repository: `https://git.heroku.com/johnvincentio-rijksmuseum.git`

### Check Git

```
git remote -v
```

shows

```
heroku	https://git.heroku.com/johnvincentio-rijksmuseum.git (fetch)
heroku	https://git.heroku.com/johnvincentio-rijksmuseum.git (push)
origin	git@github.com:johnvincentio/rijksmuseum.git (fetch)
origin	git@github.com:johnvincentio/rijksmuseum.git (push)
```

## Deploy the Code

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/rijksmuseum

git push heroku master
```

## Test

```
https://johnvincentio-rijksmuseum.herokuapp.com/
```
