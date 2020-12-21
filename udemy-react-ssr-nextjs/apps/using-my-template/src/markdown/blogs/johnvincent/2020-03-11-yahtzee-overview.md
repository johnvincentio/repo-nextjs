---
meta-title: "Overview of Yahtzee | John Vincent"
meta-description: "John Vincent's discussion on building and deploying React version of Yahtzee"
meta-keywords: "React, Yahtzee"

title: "Overview of React Yahtzee"
subtitle: ""
lead: ""

category: [Digital Ocean, Johnvincent.io, React]
permalink: /johnvincent/yahtzee-overview/
---

<a href="https://yahtzee.johnvincent.io/">
<img class="post-image-small" src="/images/yahtzee/diagrams/yahtzee.png" alt="Yahtzee" />
</a>

<!-- end -->

# Yahtzee

[Yahtzee](https://yahtzee.johnvincent.io) is a responsive, Progressive Web application version of the popular Yahtzee game built using React.

## Live Deployment

[Yahtzee at Digital Ocean](https://yahtzee.johnvincent.io)

## Technical

* [Yahtzee](https://yahtzee.johnvincent.io/)  is a [Progressive Web App (PWA)](/blog/#Pwa)

* [Yahtzee](https://yahtzee.johnvincent.io/) is built using [React](/blog/#React), [HTML5](/blog/#Html), [Sass](/blog/#Sass) and [CSS3](/blog/#Css)

* [Yahtzee](https://yahtzee.johnvincent.io/) is fully responsive, adapting for mobile, table and desktop viewports.

* [Yahtzee](https://yahtzee.johnvincent.io/) is deployed to an [Ubuntu 16.04 droplet at Digital Ocean](/johnvincent/overview/) and kept running using [Pm2](/blog/#Pm2)

* [Yahtzee](https://yahtzee.johnvincent.io/) resources are served from [Nginx Server](/blog/#Nginx)

* All communications are performed using https.

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

### Production Deployment

* [Digital Ocean](/blog/#Digital_Ocean)
* [Ubuntu](/blog/#Ubuntu)
* [Nginx](/blog/#Nginx)
* [SSL certificates](/blog/#Ssl)
* [Node](/blog/#Node)
* [Npm](/blog/#Npm)
* [PM2](/blog/#Pm2)

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
	<meta name="msapplication-TileColor" content="#ffc40d">
	<meta name="msapplication-config" content="<%= htmlWebpackPlugin.options.HOME_URL %>/browserconfig.xml">
	<meta name="theme-color" content="#ffffff">
```

Notice using `HOME_URL` from the environment.

### app-manifest.json

Notice the subfolder

```
{
    "name": "Yahtzee",
    "short_name": "Yahtzee",
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
		"orientation": "portrait"
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

HOME_URL=http://localhost:8020

...
```

### Production

Create `/save-env/yahtzee-app/client.env`

```
NODE_ENV=production

HOME_URL=https://www.yahtzee.johnvincent.io

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
www.yahtzee
yahtzee
```

Verify subdomains

```
dig www.yahtzee.johnvincent.io
dig yahtzee.johnvincent.io
```

## Configure HTTP Nginx

For details, please see [Configure non-SSL Nginx](/johnvincent/configure-http-nginx/)

```
cd /var/www
sudo mkdir -p yahtzee/html/.well-known
```

### Create `index.html`

```
sudo vi /var/www/yahtzee/html/index.html
```

```
<html>
    <head>
        <title>Welcome to yahtzee!</title>
    </head>
    <body>
        <h1>Success! The server block is working!</h1>
    </body>
</html>
```

### Permissions

```
sudo chown -R jv:jv /var/www/yahtzee/html
```

```
cd /var/www/yahtzee/html
find . -type d -print0 | xargs -0 chmod 0755
find . -type f -print0 | xargs -0 chmod 0644
```

### Server block

```
sudo vi /etc/nginx/sites-available/http/yahtzee
```

```
server {
  listen 80;
  listen [::]:80;

  server_name yahtzee.johnvincent.io www.yahtzee.johnvincent.io;
  root /var/www/yahtzee/html;
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
http://www.yahtzee.johnvincent.io
http://yahtzee.johnvincent.io
```


## SSL Certificates

```
sudo letsencrypt certonly -a webroot --webroot-path=/var/www/yahtzee/html -d yahtzee.johnvincent.io -d www.yahtzee.johnvincent.io
```

Create

`/etc/nginx/snippets/ssl-yahtzee-johnvincent.io.conf`

```
ssl_certificate /etc/letsencrypt/live/yahtzee.johnvincent.io/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/yahtzee.johnvincent.io/privkey.pem;
```

## Configure HTTPS Nginx

For details, please see [Configure SSL Nginx](/johnvincent/configure-https-nginx/)

```
cd /etc/nginx/sites-available/https
sudo vi yahtzee
```

```
server {
    listen 80;
    listen [::]:80;
  	server_name yahtzee.johnvincent.io www.yahtzee.johnvincent.io;
    return 301 https://www.yahtzee.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
		include snippets/ssl-yahtzee-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name yahtzee.johnvincent.io;
    return 301 https://www.yahtzee.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-yahtzee-johnvincent.io.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

		root /var/www/yahtzee/html;
    index index.html;

    server_name www.yahtzee.johnvincent.io;

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
http://www.yahtzee.johnvincent.io
http://yahtzee.johnvincent.io

https://www.yahtzee.johnvincent.io
https://yahtzee.johnvincent.io
```

All show the simple `index.html` file that was created earlier.

## Test SSL Certificates

Ensure all scores are A+

```
https://www.ssllabs.com/ssltest/analyze.html?d=yahtzee.johnvincent.io
https://www.ssllabs.com/ssltest/analyze.html?d=www.yahtzee.johnvincent.io
```

## SSH to Github

For details, please see [SSH to Github](/ssh/ssh-github/)

## Deployment Script

`bin/deploy-yahtzee-app`

```
#!/bin/sh
#
#  script to get, build and deploy Yahtzee to nginx
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
CLONES_DIR="/home/jv/clones/yahtzee"
DOCROOT_DIR="/var/www/yahtzee/html"
SAVE_ENV_DIR="/home/jv/save-env/yahtzee-app"
#
echo "Removing clones directory $CLONES_DIR"
rm -rf $CLONES_DIR
#
echo "Creating clones directory $CLONES_DIR"
mkdir -p $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories to $CLONES_DIR"
git clone git@github.com:johnvincentio/yahtzee-project $CLONES_DIR

#
#  Make Yahtzee Client
#
# copy .env file
#
echo "Copy Yahtzee client .env file to $CLONES_DIR/client"
cp -r $SAVE_ENV_DIR/client.env $CLONES_DIR/.env

echo "Make the Yahtzee client"
cd $CLONES_DIR

echo "Npm install the Yahtzee client $CLONES_DIR"
npm install
#
echo "Make Yahtzee client production"
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

## Create .env files

```
cd
cd save-env
```

Create `client.env`

```
#
# production
#
NODE_ENV=production

HOME_URL=https://www.yahtzee.johnvincent.io

...
```


## Deploy

```
cd
cd bin
./deploy-yahtzee-app
```

## Test

```
https://www.yahtzee.johnvincent.io/
```
