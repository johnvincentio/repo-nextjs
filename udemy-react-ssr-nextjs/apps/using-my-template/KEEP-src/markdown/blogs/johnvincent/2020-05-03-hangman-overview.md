---
meta-title: "Overview of Hangman | John Vincent"
meta-description: "John Vincent's discussion on building and deploying React version of Hangman"
meta-keywords: "React, Hangman"

title: "Overview of React Hangman"
subtitle: ""
lead: ""

category: [Digital Ocean, Johnvincent.io, React]
permalink: /johnvincent/hangman-overview/
---

<a href="https://hangman.johnvincent.io/">
<img class="post-image-small" src="/images/hangman/diagrams/hangman.png" alt="Hangman" />
</a>

<!-- end -->

# Hangman

[Hangman](https://hangman.johnvincent.io) is a responsive, Progressive Web application version of the popular Hangman game built using React.

## Live Deployment

[Hangman at Digital Ocean](https://hangman.johnvincent.io)

## Technical

* [Hangman](https://hangman.johnvincent.io/)  is a [Progressive Web App (PWA)](/blog/#Pwa)

* [Hangman](https://hangman.johnvincent.io/) is built using the MERN stack. The front-end is built using [React](/blog/#React), [HTML5](/blog/#Html), [Sass](/blog/#Sass) and [CSS3](/blog/#Css), the server-side using [Node](/blog/#Node) with [Express](/blog/#Express) as the services server.

* [Hangman](https://hangman.johnvincent.io/) is fully responsive, adapting for mobile, table and desktop viewports.

* [Hangman](https://hangman.johnvincent.io/) resources are served from [Nginx Server](/blog/#Nginx)

* [Hangman](https://hangman.johnvincent.io/) word and dictionary services are served from a [Node](/blog/#Node), [Express](/blog/#Express) Server.

* [Hangman](https://hangman.johnvincent.io/) is fully unit tested on the front and server-side. For [React](/blog/#React) testing, Jest has been used. For the server-side, [Mocha](/blog/#Mocha) and [Chai](/blog/#Chai), with extensive use of the [Faker](/blog/#Faker) library to mock-out dependencies.

* [Hangman](https://hangman.johnvincent.io/) is deployed to an [Ubuntu droplet at Digital Ocean](/johnvincent/overview/) and kept running using [Pm2](/blog/#Pm2)

* All client and server communications are performed using https.


## Technologies

### Client

* [React](/blog/#React)
* [Progressive Web App](/blog/#Pwa)
* [HTML5](/blog/#Html)
* [CSS3](/blog/#Css)
* [Sass](/blog/#Sass)
* [Webpack](/blog/#Webpack)
* [Jest](/blog/#Jest)
* [Enzyme](/blog/#Enzyme)
* [Eslint](/blog/#Eslint)
* [Prettier](/blog/#Prettier)
* [Balsamiq](/blog/#Balsamiq)

### Server

* [Node](/blog/#Node)
* [Express](/blog/#Express)
* [JOI](/blog/#Joi)
* [Mocha](/blog/#Mocha)
* [Chai](/blog/#Chai)
* [Winston](/blog/#Winston)
* [Morgan](/blog/#Morgan)
* [JS Doc](/blog/#JSDoc)
* [Eslint](/blog/#Eslint)
* [Prettier](/blog/#Prettier)

### Production Deployment

* [Digital Ocean](/blog/#Digital_Ocean)
* [Ubuntu](/blog/#Ubuntu)
* [Nginx](/blog/#Nginx)
* [SSL certificates](/blog/#Ssl)
* [Node](/blog/#Node)
* [Npm](/blog/#Npm)
* [PM2](/blog/#Pm2)

# Node Server Deployment

See [Overview of Deploying of a Node Server](/johnvincent/node-server-overview/) for an Overview of the deployment of the Node Server used by [Hangman](https://hangman.johnvincent.io/) 


# Website Updates

For extensive discussions regarding `www.johnvincent.io`, please see [Overview of johnvincent.io website](/johnvincent/overview/)

[Website Validation Reference](/website/website-validation/)

## Update

Update the OS, please see [Maintaining Ubuntu Droplet](/johnvincent/maintaining-droplet/)


## Favicons

For details, see [Favicons](/website/using-favicons/)

Made `favicons` as usual.

```
	<link rel="apple-touch-icon" sizes="180x180" href="<%= htmlWebpackPlugin.options.HOME_URL %>/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<%= htmlWebpackPlugin.options.HOME_URL %>/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<%= htmlWebpackPlugin.options.HOME_URL %>/favicon-16x16.png">
	<link rel="manifest" href="<%= htmlWebpackPlugin.options.HOME_URL %>/app-manifest.json">
	<link rel="mask-icon" href="<%= htmlWebpackPlugin.options.HOME_URL %>/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#2d89ef">
	<meta name="msapplication-config" content="<%= htmlWebpackPlugin.options.HOME_URL %>/browserconfig.xml">
	<meta name="theme-color" content="#ffffff">
```

Notice using `HOME_URL` from the environment.

### app-manifest.json

Notice the subfolder

```
{
    "name": "Hangman",
    "short_name": "Hangman",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
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
            <square150x150logo src="/mstile-150x150.png"/>
            <TileColor>#ffc40d</TileColor>
        </tile>
    </msapplication>
</browserconfig>
```

## Create .env files

### Development

Create `.env`

```
NODE_ENV=development

HOME_URL=http://localhost:9432

SERVER_URL=http://localhost:9444

...
```

### Production

Create `/save-env/hangman/client.env`

```
NODE_ENV=production

HOME_URL=https://www.hangman.johnvincent.io

SERVER_URL=https://www.apis.johnvincent.io

...
```

## Add Subdomain

Add subdomain, please see [Configuring Google Domains](/johnvincent/configuring-domains/)

Add

```
Type: A
TTL: 1h
Data: 104.236.194.244
```

for each of

```
www.hangman
hangman
```

Verify subdomains

```
dig www.hangman.johnvincent.io
dig hangman.johnvincent.io
```

## Configure HTTP Nginx

For details, please see [Configure non-SSL Nginx](/johnvincent/configure-http-nginx/)

```
cd /var/www
sudo mkdir -p hangman/html/.well-known
```

### Create `index.html`

```
sudo vi /var/www/hangman/html/index.html
```

```
<html>
    <head>
        <title>Welcome to hangman!</title>
    </head>
    <body>
        <h1>Success! The server block is working!</h1>
    </body>
</html>
```

### Permissions

```
sudo chown -R jv:jv /var/www/hangman/html
```

```
cd /var/www/hangman/html
find . -type d -print0 | xargs -0 chmod 0755
find . -type f -print0 | xargs -0 chmod 0644
```

### Server block

```
sudo vi /etc/nginx/sites-available/http/hangman
```

```
server {
  listen 80;
  listen [::]:80;

  server_name hangman.johnvincent.io www.hangman.johnvincent.io;
  root /var/www/hangman/html;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }
  location ~ /.well-known {
    allow all;
  }
}
```

### Enable Server Block

Add to `bin/enable-http` and `bin/enable-https`

```
enable-http
```

### Restart Nginx

```
nginx-restart
```


### Test from browser

```
http://www.hangman.johnvincent.io
http://hangman.johnvincent.io
```


## SSL Certificates

```
sudo letsencrypt certonly -a webroot --webroot-path=/var/www/hangman/html -d hangman.johnvincent.io -d www.hangman.johnvincent.io
```

Create

`sudo vi /etc/nginx/snippets/ssl-hangman-johnvincent.io.conf`

```
ssl_certificate /etc/letsencrypt/live/hangman.johnvincent.io/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/hangman.johnvincent.io/privkey.pem;
```

## Configure HTTPS Nginx

For details, please see [Configure SSL Nginx](/johnvincent/configure-https-nginx/)

```
cd /etc/nginx/sites-available/https
sudo vi hangman
```

```
server {
    listen 80;
    listen [::]:80;
  	server_name hangman.johnvincent.io www.hangman.johnvincent.io;
    return 301 https://www.hangman.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
		include snippets/ssl-hangman-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name hangman.johnvincent.io;
    return 301 https://www.hangman.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-hangman-johnvincent.io.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

		root /var/www/hangman/html;
    index index.html;

    server_name www.hangman.johnvincent.io;

   location / {
      try_files $uri /index.html;
    }
    location = /analytics.js {
        proxy_pass https://www.google-analytics.com;
        expires 31536000s;
        proxy_set_header Pragma "public";
        proxy_set_header Cache-Control "max-age=31536000, public";
    }   
    location /junk {
        try_files $uri =503;
    }
		location ~*  \.(svg|jpg|jpeg|png|gif|ico|css|js|pdf)$ {
      add_header Cache-Control "max-age=31536000";
      access_log off;
  #   expires 30d;
    }
}
```

### Enable Https

```
cd bin
./enable-https
```

## Test from Browser

```
http://www.hangman.johnvincent.io
http://hangman.johnvincent.io

https://www.hangman.johnvincent.io
https://hangman.johnvincent.io
```

All show the simple `index.html` file that was created earlier.

## Test SSL Certificates

Ensure all scores are A+

```
https://www.ssllabs.com/ssltest/analyze.html?d=hangman.johnvincent.io
https://www.ssllabs.com/ssltest/analyze.html?d=www.hangman.johnvincent.io
```

## SSH to Github

For details, please see [SSH to Github](/ssh/ssh-github/)

## Deployment Script

`bin/deploy-hangman-app`

```
#!/bin/sh
#
#  script to get, build and deploy Hangman to nginx
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
CLONES_DIR="/home/jv/clones/hangman"
DOCROOT_DIR="/var/www/hangman/html"
SAVE_ENV_DIR="/home/jv/save-env/hangman-app"
#
echo "Removing clones directory $CLONES_DIR"
rm -rf $CLONES_DIR
#
echo "Creating clones directory $CLONES_DIR"
mkdir -p $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories to $CLONES_DIR"
git clone git@github.com:johnvincentio/hangman-project $CLONES_DIR

#
#  Make Hangman Client
#
# copy .env file
#
echo "Copy Hangman client .env file to $CLONES_DIR/client"
cp -r $SAVE_ENV_DIR/client.env $CLONES_DIR/.env

echo "Make the Hangman client"
cd $CLONES_DIR

echo "Npm install the Hangman client $CLONES_DIR"
npm install
#
echo "Make Hangman client production"
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
echo "Completed"
```

## Deploy

```
cd
cd bin
./deploy-hangman-app
```

## Test

```
https://www.hangman.johnvincent.io/
```
