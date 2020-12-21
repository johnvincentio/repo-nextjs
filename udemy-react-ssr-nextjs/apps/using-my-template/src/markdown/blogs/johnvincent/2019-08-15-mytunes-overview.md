---
meta-title: "MyTunes Overview | John Vincent"
meta-description: "John Vincent's discussion on building and deploying React Music Player App to johnvincent.io"
meta-keywords: "React, Music Player, Material-UI"

title: "Building and deploying MyTunes to johnvincent.io"
subtitle: "Folder Music Player React App"
lead: ""

category: [Digital Ocean, Johnvincent.io, React, Ssh]
permalink: /johnvincent/mytunes-overview/
---

<a href="https://music.johnvincent.io">
<img class="post-image" src="/images/mytunes/diagrams/mytunes.png" alt="MyTunes" />
</a>


<!-- end -->

# MyTunes

[MyTunes](https://music.johnvincent.io) is a Folder Music Player.

[MyTunes](https://music.johnvincent.io) is the easiest way to play music stored on your local drive.

Use [MyTunes](https://music.johnvincent.io) to organize your music any way you prefer.

## Live Deployment

[MyTunes at Digital Ocean](https://music.johnvincent.io)

## Technical

* [MyTunes](https://music.johnvincent.io/) is a [Progressive Web App (PWA)](/blog/#Pwa)

* [MyTunes](https://music.johnvincent.io/) is built using the MERN stack. The front-end is built using [React](/blog/#React), [Material-UI 4.0](/blog/#Material-UI), [Redux](/blog/#Redux), [HTML5](/blog/#Html), [Sass](/blog/#Sass) and [CSS3](/blog/#Css), the server-side using [Node](/blog/#Node) with [Express](/blog/#Express) as the web server.

* [MyTunes](https://music.johnvincent.io/) is fully responsive, adapting for mobile, table and desktop viewports.

* All routing is handled in the front-end by [React](/blog/#React)

* An extensive API has been built to provide access to your music using [Express](/blog/#Express), with many separate endpoints constructed.

* [MyTunes](https://music.johnvincent.io/) is fully unit tested on the front and server-side. For [React](/blog/#React) testing, Jest has been used. For the server-side, [Mocha](/blog/#Mocha) and [Chai](/blog/#Chai), with extensive use of the [Faker](/blog/#Faker) library to mock-out dependencies.

* All client and server communications are performed using https.

* [MyTunes](https://music.johnvincent.io/) is deployed to an [Ubuntu droplet at Digital Ocean](/taskmuncher/overview/#deploy) and kept running using [Pm2](/blog/#Pm2)

* [MyTunes](https://music.johnvincent.io/) resources are served from [Nginx Server](/blog/#Nginx) with a [reverse proxy](/taskmuncher/deploy/configure-https-nginx/) to pass certain requests to a [Node](/blog/#Node) [Express](/blog/#Express) Server.

## Technologies

### Client

* [React](/blog/#React)
* [Material-UI](/blog/#Material-UI)
* [Progressive Web App](/blog/#Pwa)
* [Redux](/blog/#Redux)
* [Styled Components](/blog/#Styled_Components)
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
* [Nodemailer](/blog/#Nodemailer)
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

# Website Updates

For extensive discussions regarding `www.johnvincent.io`, please see [Overview of johnvincent.io website](/johnvincent/overview/)

[Website Validation Reference](/website/website-validation/)

## Update

Update the OS, please see [Maintaining Ubuntu Droplet](/johnvincent/maintaining-droplet/)


## Update SSL certificates

Enable HTTP

```
cd bin
./enable-http
```

Encrypt SSL certificates

```
./encrypt-ssl
```

Enable HTTPS

```
cd bin
./enable-https
```

## Upgrade Node V6 to V8

Uninstall node

```
sudo apt-get remove nodejs
sudo apt-get remove npm

sudo apt-get update

sudo apt-get upgrade
```

Install Node V8

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```
which node
/usr/bin/node

which npm
/usr/bin/npm

node -v
v8.16.0

npm -v
v6.4.1
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
www.music
music
```

Verify subdomains

```
dig www.music.johnvincent.io
dig music.johnvincent.io
```

## Configure HTTP Nginx

For details, please see [Configure non-SSL Nginx](/johnvincent/configure-http-nginx/)

```
cd /var/www
sudo mkdir -p music/html/.well-known
```

### Create `index.html`

```
sudo vi /var/www/music/html/index.html
```

```
<html>
    <head>
        <title>Welcome to music!</title>
    </head>
    <body>
        <h1>Success! The server block is working!</h1>
    </body>
</html>
```

### Permissions

```
sudo chown -R jv:jv /var/www/music/html
```

```
cd /var/www/music/html
find . -type d -print0 | xargs -0 chmod 0755
find . -type f -print0 | xargs -0 chmod 0644
```

### Server block

```
sudo vi /etc/nginx/sites-available/http/music
```

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name music.johnvincent.io www.music.johnvincent.io;
  root /var/www/music/html;
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

```
sudo ln -s /etc/nginx/sites-available/http/music /etc/nginx/sites-enabled/music
```

### Restart Nginx

```
sudo nginx -t
sudo systemctl restart nginx
```

### Test from browser

```
http://www.music.johnvincent.io
http://music.johnvincent.io
```

## SSL Certificates

```
sudo letsencrypt certonly -a webroot --webroot-path=/var/www/music/html -d music.johnvincent.io -d www.music.johnvincent.io
```

Create

`/etc/nginx/snippets/ssl-music-johnvincent.io.conf`

```
ssl_certificate /etc/letsencrypt/live/music.johnvincent.io/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/music.johnvincent.io/privkey.pem;
```

## Configure HTTPS Nginx

For details, please see [Configure SSL Nginx](/johnvincent/configure-https-nginx/)

```
cd /etc/nginx/sites-available/http
sudo vi music
```

```
server {
    listen 80;
    listen [::]:80;
  	server_name music.johnvincent.io www.music.johnvincent.io;
    return 301 https://www.music.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
		include snippets/ssl-music-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name music.johnvincent.io;
    return 301 https://www.music.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-music-johnvincent.io.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

		root /var/www/music/html;
    index index.html;

    server_name www.music.johnvincent.io;

   location / {
      try_files $uri /index.html;
    }
		location /api {
			proxy_pass http://localhost:3001;
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

Note `proxy_pass http://localhost:3001`

This allows `/api` to be routed to a Node server running on port 3001

### Enable Https

```
cd bin
./enable-https
```

## Test from Browser

```
http://www.music.johnvincent.io
http://music.johnvincent.io

https://www.music.johnvincent.io
https://music.johnvincent.io
```

All show the simple `index.html` file that was created earlier.

## Test SSL Certificates

Ensure all scores are A+

```
https://www.ssllabs.com/ssltest/analyze.html?d=music.johnvincent.io
https://www.ssllabs.com/ssltest/analyze.html?d=www.music.johnvincent.io
```

## SSH to Github

For details, please see [SSH to Github](/ssh/ssh-github/)

## Deployment Script

`bin/deploy-music-app`

```
#!/bin/sh
#
#  script to get, build and deploy Music Player to nginx
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
echo "Removing Logfile"
rm /home/jv/tmp/logfile.txt

#
CLONES_DIR="/home/jv/clones"
DOCROOT_DIR="/var/www/music/html"
SERVER_ROOT_DIR="/var/www/music/server"
SAVE_ENV_DIR="/home/jv/save-env"
#
echo "Removing clones directory $CLONES_DIR"
rm -rf $CLONES_DIR
#
echo "Creating clones directory $CLONES_DIR"
mkdir $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories to $CLONES_DIR"
git clone git@github.com:johnvincentio/music-player $CLONES_DIR

#
#  Make Music Player Client
#
# copy .env file
#
echo "Copy Music Player client .env file to $CLONES_DIR/client"
cp -r $SAVE_ENV_DIR/client.env $CLONES_DIR/client/.env

echo "Make the Music Player client"
cd $CLONES_DIR/client

echo "Npm install the Music Player client $CLONES_DIR/client"
npm install
#
echo "Make Music Player client production"
npm run production
#
echo "Minify $CLONES_DIR/client/dist/index.html"
cp dist/index.html dist/index.work
html-minifier dist/index.work --remove-comments --output dist/index.html
rm dist/index.work

#
#  Make Music Player Server
#
# copy .env file
#
echo "Copy Music Player server .env file to $CLONES_DIR/server"
cp -r $SAVE_ENV_DIR/server.env $CLONES_DIR/server/.env

#
echo "Make the Music Player server"
cd $CLONES_DIR/server

#
echo "Npm install the Music Player server $CLONES_DIR/server"
npm install
#

#
# Delete files in nginx docroot
#
echo "Delete files in Nginx Docroot $DOCROOT_DIR"
rm -rf $DOCROOT_DIR/*

#
# Delete files in nginx server-root
#
echo "Delete files in Nginx server root $SERVER_ROOT_DIR"
rm -rf $SERVER_ROOT_DIR/*

#
# Copy client files to nginx
#
echo "Copy client files to $DOCROOT_DIR"
cp -r $CLONES_DIR/client/dist/* $DOCROOT_DIR

#
# set permissions
#
echo "Setting permissions on $DOCROOT_DIR"
sudo chown -R jv:jv $DOCROOT_DIR
sudo chmod 0755 $DOCROOT_DIR
find $DOCROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $DOCROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files

#
# Copy server files to nginx
#
echo "Copy server files to Nginx $SERVER_ROOT_DIR"
cp -r $CLONES_DIR/server/* $SERVER_ROOT_DIR
cp -r $CLONES_DIR/server/.env $SERVER_ROOT_DIR


#
# set permissions
#
echo "Setting permissions on $SERVER_ROOT_DIR"
sudo chown -R jv:jv $SERVER_ROOT_DIR
sudo chmod 0755 $SERVER_ROOT_DIR
find $SERVER_ROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $SERVER_ROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files
#

echo "Handle PM2"
cd $SERVER_ROOT_DIR
handle-pm2
#
echo "Restarting Nginx"
sudo nginx -t
sudo systemctl restart nginx
#
echo "Mongo Status"
sudo systemctl status mongodb
#
echo "Completed"
```

## Create .env files

```
cd
cd save-env/music-player
```

Create `client.env`

```
#
# production
#
NODE_ENV=production

#
# HOME_URL - dev and prod are different
#
HOME_URL=https://www.music.johnvincent.io

SERVER_URL=https://www.music.johnvincent.io
```

Create `server.env`

```
#
PORT=3001
#
LOG_LEVEL=debug
LOG_ENV=prod
LOG_FILE=/home/jv/tmp/logfile.txt
#

CLIENT_SERVER=https://www.music.johnvincent.io

MUSIC_ROOT_DIRECTORY=/home/jv/music-folder/music
```

## Deploy

```
cd
cd bin
./deploy-music-app
```

## Make a Music Folder

Remote server

```
cd
mkdir music-folder
```

From mac, prepare music in `tmp/music`

#### Copy over SSH

```
cd
cd tmp

rsync -r --exclude=".git" --exclude=".gitignore" --exclude=".DS_Store" \
    music mywebsite:music-folder
```

## Test

```
https://www.music.johnvincent.io/
```


# Local Development

`/Users/jv/Desktop/MyDevelopment/github/projects/music-player`

## Start Client

Client Port: 8020
```
cd client
npm start
```

## Start Server

Server Port: 9020

```
cd server
npm start
```

## Local Application

```
http://localhost:8020
```

# Create Local Production Version

Important files

* `make-player.sh`
* `play-music-player.command`

```
cd /Users/jv/Desktop/MyDevelopment/github/website/music-player
./make-player.sh
```

which builds the system in `/Users/jv/tmp/music-player`

and copies the production system to `/Users/jv/Desktop/OtherTools/music-player`

## Use Mac Automator to create Music-Player.app

* Open Finder
* Applications
* Automator (or Automator.app)
	- Application
	- Choose (button)
	- Run Shell Script (middle pane, big list of options)
		- Shell: /bin/bash
		- Pass input: as arguments

Enter the following

```
/Users/jv/Desktop/MyDevelopment/github/website/music-player/play-music-player.command
```

* File, Save:
	- Save as: Music-Player
	- Where: Applications

saves Music-Player.app in Applications as `/Applications/Music-Player.app`

Note that `Music-Player.app` is the client and server parts of the application.

## Run MyTunes

* Execute `Music-Player.app` to start the server.

To run the client

* `http://localhost:9000` or
* select MyTunes from the new tab

## Trouble

Usually, trouble is caused by port already in use.

See

```
/Users/jv/Desktop/OtherTools/music-player/server/error.log
```

Caching can also cause troubles. To disable cache:

* Google Chrome
* right click, Inspect
* Network
	* Check: Disable cache
 

