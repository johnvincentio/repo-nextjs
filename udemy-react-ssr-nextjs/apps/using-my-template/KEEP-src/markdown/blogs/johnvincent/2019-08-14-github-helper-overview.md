---
meta-title: "React Github Helper App | John Vincent"
meta-description: "John Vincent's discussion on building and deploying React Github Helper App to johnvincent.io"
meta-keywords: "React, Material-UI"

title: "Building and deploying React Github Helper App to johnvincent.io"
subtitle: "React Github Helper App"
lead: ""

category: [Digital Ocean, Johnvincent.io, React]
permalink: /johnvincent/github-helper-overview/
---

<a href="https://mygithub.johnvincent.io/">
<img class="post-image" src="/images/github-helper/diagrams/github-helper.png" alt="Github Helper" />
</a>

<!-- end -->

# Website Updates

For extensive discussions regarding `www.johnvincent.io`, please see [Overview of johnvincent.io website](/johnvincent/overview/)

[Website Validation Reference](/website/website-validation/)

# Github Helper Application

[Github Helper at Github](https://github.com/johnvincentio/github-app)

[Github Helper at Digital Ocean](https://mygithub.johnvincent.io/)

[Balsamiq Wireframes](https://github.com/johnvincentio/github-app/blob/master/Project.bmpr)

[HTML Wireframes](https://github.com/johnvincentio/github-app/tree/master/wireframes)

[Project Todos](https://github.com/johnvincentio/github-app/blob/master/project.todo)

## Technical

* [Github Helper](https://mygithub.johnvincent.io/) is a helper application for Github users.

* [Github Helper](https://mygithub.johnvincent.io/) is a [Progressive Web App (PWA)](/blog/#Pwa)

* [Github Helper](https://mygithub.johnvincent.io/) is built using [React](/blog/#React), [HTML5](/blog/#Html), [Sass](/blog/#Sass) and [CSS3](/blog/#Css)

* [Github Helper](https://mygithub.johnvincent.io/)) is fully responsive, adapting for mobile, table and desktop viewports.

* [Github Helper](https://mygithub.johnvincent.io/)) is deployed to an [Ubuntu 16.04 droplet at Digital Ocean](/johnvincent/overview/) and kept running using [Pm2](/blog/#Pm2)

* [Github Helper](https://mygithub.johnvincent.io/)) resources are served from [Nginx Server](/blog/#Nginx)

* All communications are performed using https.


# Development

[GitHub API](https://t.yesware.com/tt/f7d714dfe952964fb8a66c04148aec7ba5b2d297/0f25765a945028f6e44dee5595cea2ee/7b0004ac896f68f234bfc27eff266c95/developer.github.com/v3/)

## Github Token

Accessing Github API requires a Token

* [Github](https://github.com/)
* Settings
* Developer Settings
* Personal Access Tokens
* Generate new token
* Provide your github password
* Note
	- Give it a meaningful name
* Leave All scopes <strong>unchecked</strong>
* Generate token

Copy and paste the Token into `.env` 

```
GITHUB_TOKEN={github token value}
```

## webpack.config.js

```
new webpack.EnvironmentPlugin(['HOME_URL', 'NODE_ENV', 'GOOGLE_APP_ID', 'GITHUB_TOKEN']),
```

which will pick up these variables from the environment.

# Deploy React App to Subfolder

Deploy to subfolder `mygithub` of `www.johnvincent.io`

Thus, home url is `www.johnvincent.io/mygithub`

This application is not using React Router.

The real work is to use absolute urls, not relative urls.

## webpack.config.js

Change the public path for generated js files.

For production

```
if (PRODUCTION_MODE) {
	config.output = {
		path: DIST_FOLDER,
		publicPath: `${HOME_URL}/`,
		chunkFilename: '[name].[chunkhash].bundle.js',
		filename: '[name].[chunkhash].bundle.js'
	};
	config.mode = 'production';
	config.devtool = 'cheap-module-source-map';
}
```

For development. Not strictly needed but might as well for consistency sake.

```
if (!PRODUCTION_MODE) {
	config.output = {
		path: DIST_FOLDER,
		publicPath: `${HOME_URL}/`,
		chunkFilename: '[name].bundle.js',
		filename: '[name].bundle.js'
	};
```

## index.hbs

Do not use relative urls.

Preceed with `<%= htmlWebpackPlugin.options.HOME_URL %>`

## Favicons

For details, see [Favicons](/website/using-favicons/)

Made `favicons` as usual.

```
	<link rel="apple-touch-icon" sizes="180x180" href="<%= htmlWebpackPlugin.options.HOME_URL %>/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<%= htmlWebpackPlugin.options.HOME_URL %>/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<%= htmlWebpackPlugin.options.HOME_URL %>/favicon-16x16.png">
	<link rel="manifest" href="<%= htmlWebpackPlugin.options.HOME_URL %>/app-manifest.json">
	<link rel="mask-icon" href="<%= htmlWebpackPlugin.options.HOME_URL %>/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#3071a9">
	<meta name="msapplication-config" content="<%= htmlWebpackPlugin.options.HOME_URL %>/browserconfig.xml">
	<meta name="theme-color" content="#ffffff">
```

Notice using `HOME_URL` from the environment.


### app-manifest.json

Notice the subfolder

```
{
  "name": "MyGithub",
  "short_name": "MyGithub",
  "icons": [
    {
      "src": "/mygithub/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/mygithub/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "index.html",
  "orientation": "landscape"
}
```

### browserconfig.xml

Notice the subfolder

```
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/mygithub/mstile-150x150.png"/>
            <TileColor>#da532c</TileColor>
        </tile>
    </msapplication>
</browserconfig>
```

## Create .env files

### Development

Create `.env`

```
NODE_ENV=development

HOME_URL=http://localhost:8020

...
```

### Production

Create `/save-env/github-app/client.env`

```
NODE_ENV=production

HOME_URL=https://www.johnvincent.io/mygithub

...
```

# Async / await problem

Error

```
Uncaught ReferenceError: regeneratorRuntime is not defined
```

Problem is caused by use of async/await.

## Solution

[Babel](https://babeljs.io/docs/en/babel-plugin-transform-runtime/)

Need to make changes to babel.

```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

`.babelrc`

```
{
  "presets": ["@babel/env", "@babel/react"],
  "plugins": [
    "@babel/proposal-object-rest-spread",
    "@babel/proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

## Deployment Script

The script to deploy to `www.johnvincent.io` required a few changes.

`bin/deploy-mygithub-app`

```
#!/bin/sh
#
#  script to get, build and deploy MyGithub to nginx
#
# setup ssh to github
#
echo "setup ssh to github"
eval "$(ssh-agent)"
ssh-add -k ~/.ssh/id_github
#
cd
cd tmp

#
CLONES_DIR="/home/jv/clones/mygithub"
DOCROOT_DIR="/var/www/mygithub/html"
SAVE_ENV_DIR="/home/jv/save-env/github-app"
#
echo "Removing clones directory $CLONES_DIR"
rm -rf $CLONES_DIR
#
echo "Creating clones directory $CLONES_DIR"
mkdir -p $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories to $CLONES_DIR"
git clone git@github.com:johnvincentio/github-app $CLONES_DIR

#
#  Make MyGithub Client
#
# copy .env file
#
echo "Copy MyGithub client .env file to $CLONES_DIR/client"
cp -r $SAVE_ENV_DIR/client.env $CLONES_DIR/.env

echo "Make the MyGithub client"
cd $CLONES_DIR

echo "Npm install the MyGithub client $CLONES_DIR"
npm install
#
echo "Make MyGithub client production"
npm run production
#
echo "Minify $CLONES_DIR/dist/index.html"
cp dist/index.html dist/index.work
html-minifier dist/index.work --remove-comments --output dist/index.html
rm dist/index.work

#
# Delete files in nginx docroot
#
echo "Delete files in Nginx Docroot $DOCROOT_DIR"
rm -rf $DOCROOT_DIR/*

#
# Copy client files to nginx
#
echo "Copy client files to $DOCROOT_DIR"
cp -r $CLONES_DIR/dist/* $DOCROOT_DIR

#
# set permissions
#
echo "Setting permissions on $DOCROOT_DIR"
sudo chown -R jv:jv $DOCROOT_DIR
sudo chmod 0755 $DOCROOT_DIR
find $DOCROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $DOCROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files

#
echo "Restarting Nginx"
nginx-restart
#
echo "Mongo Status"
mongo-status
#
echo "Completed"
```

## Deploy

```
cd
cd bin
./deploy-apps
```

and restart nginx.

## Test

```
https://johnvincent.io/mygithub
```

# Website Validation

Update the OS, please see [Maintaining Ubuntu Droplet](/johnvincent/maintaining-droplet/)

[Website Validation Reference](/website/website-validation/)

## Validation Results

Added github project to Snyk which reported no issues.

Ran the Favicon checker for www.johnvincent.io/mygithub. No issues found.

Meta Tags are good.

Google Page Speed Insights reports all good.

## Varvy Tools

Flag accessibility issues.

## Lighthouse

Report

```
100 Performance
86 Accessibility
100 Best Practices
100 SEO

Is a Progressive Web App
```

## Results

* Accessibility needs some work.
* Check HTML for ARIA
* Check HTML for Microdata
* HTML5 Semantics


# Coding Challenge Guidelines

Please organize, design, test, document and deploy your code as if it were going into <strong>production</strong>, then send us a link to the hosted repository (e.g. Github, Bitbucket...).

## Functional spec

Create an application that allows for a user to search for a GitHub username.

On a successful search return, display:

* the user's GitHub handle, 
* follower count, 
* a list of the user's followers (just the avatar is fine). 

Since some users (e.g. mrdoob, holman, etc.) have many thousands of followers, GitHub only returns a portion of the followers with each request.

Create a "load more" button that, when clicked, fetches the next payload of followers. This button should persist until there are no more pages of followers to fetch.

The UX/UI is totally up to you. If you like, get creative and add additional features a user might find useful!

## Technical spec

The front-end should ideally be a single page app with a single index.html linking to external JS/CSS/etc. Please take take this opportunity to demonstrate your CSS3 and HTML5 knowledge.

Please use ReactJS to complete the coding challenge

## Host it!

When you’re done, host it somewhere (e.g. on Amazon EC2, Heroku, Google AppEngine, etc.).
