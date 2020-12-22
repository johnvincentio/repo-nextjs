---
meta-title: "Overview of Node API Server | John Vincent"
meta-description: "John Vincent's discussion on building and deploying a Node API Server"
meta-keywords: "React, Node"

title: "Overview of Deployment of a Node API Server"
subtitle: ""
lead: ""

category: [Digital Ocean, Johnvincent.io, Node]
permalink: /johnvincent/node-server-overview/
---

The Node API Server supports various APIs that represent functionality that is used by a number of different applications.

<!-- end -->


## Node API Server Technologies

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
www.apis
apis
```

Verify subdomains

```
dig www.apis.johnvincent.io
dig apis.johnvincent.io
```

## Configure HTTP Nginx

For details, please see [Configure non-SSL Nginx](/johnvincent/configure-http-nginx/)

```
cd /var/www
sudo mkdir -p apis/html/.well-known
```

### Create `index.html`

```
sudo vi /var/www/apis/html/index.html
```

```
<html>
    <head>
        <title>Welcome to apis!</title>
    </head>
    <body>
        <h1>Success! The server block is working!</h1>
    </body>
</html>
```


### Permissions

```
sudo chown -R jv:jv /var/www/apis/html
```

```
cd /var/www/apis/html
find . -type d -print0 | xargs -0 chmod 0755
find . -type f -print0 | xargs -0 chmod 0644
```


### Server block

```
sudo vi /etc/nginx/sites-available/http/apis
```

```
server {
  listen 80;
  listen [::]:80;

  server_name apis.johnvincent.io www.apis.johnvincent.io;
  root /var/www/apis/html;
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
http://www.apis.johnvincent.io
http://apis.johnvincent.io
```

## SSL Certificates

```
sudo letsencrypt certonly -a webroot --webroot-path=/var/www/apis/html -d apis.johnvincent.io -d www.apis.johnvincent.io
```

Create

`sudo vi /etc/nginx/snippets/ssl-apis-johnvincent.io.conf`

```
ssl_certificate /etc/letsencrypt/live/apis.johnvincent.io/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/apis.johnvincent.io/privkey.pem;
```

## Configure HTTPS Nginx

For details, please see [Configure SSL Nginx](/johnvincent/configure-https-nginx/)

```
cd /etc/nginx/sites-available/https
sudo vi apis
```

```
server {
    listen 80;
    listen [::]:80;
  	server_name apis.johnvincent.io www.apis.johnvincent.io;
    return 301 https://www.apis.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
		include snippets/ssl-apis-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name apis.johnvincent.io;
    return 301 https://www.apis.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-apis-johnvincent.io.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

    server_name www.apis.johnvincent.io;

		location / {
			proxy_pass http://localhost:3101;
		}
}
```

Notice proxying all through to the Node Server listening at `http://localhost:3101`


### Enable Https

```
cd bin
./enable-https
```

## Test from Browser

```
http://www.apis.johnvincent.io
http://apis.johnvincent.io

https://www.apis.johnvincent.io
https://apis.johnvincent.io
```

```
https://www.apis.johnvincent.io/api/word/random
```

## Test SSL Certificates

Ensure all scores are A+

```
https://www.ssllabs.com/ssltest/analyze.html?d=apis.johnvincent.io
https://www.ssllabs.com/ssltest/analyze.html?d=www.apis.johnvincent.io
```




## Create .env files

### Development

Create `.env`

```
PORT=9444

LOG_LEVEL=debug
LOG_ENV=dev
# LOG_ENV=heroku
# LOG_ENV=prod

...
```

### Production

Create `/save-env/server-project/server.env`

```
PORT=3101

LOG_LEVEL=debug
# LOG_ENV=dev
# LOG_ENV=heroku
LOG_ENV=prod

CLIENT_SERVER=https://www.hangman.johnvincent.io

...
```

Note that `https://www.hangman.johnvincent.io` is CORS enabled.


## Create Server Directory

```
cd /var/www
sudo mkdir -p server-project/server
```


### Permissions

```
sudo chown -R jv:jv /var/www/server-project/server
```

```
cd /var/www/server-project/server
find . -type d -print0 | xargs -0 chmod 0755
find . -type f -print0 | xargs -0 chmod 0644
```


## PM2

Add to `handle-pm2`

```
echo "Check status of server-project"
pm2 describe server-project > /dev/null
RUNNING=$? 
if [ "${RUNNING}" -ne 0 ]; then
  echo "Adding server-project to PM2"
  cd /var/www/server-project/server
  pm2 start server.js --name "server-project"
else
  echo "Restarting server-project"
  pm2 restart server-project
fi;
```

## Deployment Script

`bin/deploy-server-project`

```
#!/bin/sh
#
#  script to get, build and deploy the Node Server
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
CLONES_DIR="/home/jv/clones/server-project"
SERVER_ROOT_DIR="/var/www/server-project/server"
SAVE_ENV_DIR="/home/jv/save-env/server-project"
#
echo "Removing clones directory $CLONES_DIR"
rm -rf $CLONES_DIR
#
echo "Creating clones directory $CLONES_DIR"
mkdir $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories to $CLONES_DIR"
git clone git@github.com:johnvincentio/server-project $CLONES_DIR

#
#  Make Node Server
#
# copy .env file
#
echo "Copy Node Server .env file to $CLONES_DIR"
cp -r $SAVE_ENV_DIR/server.env $CLONES_DIR/.env

#
echo "Make the Node Server"
cd $CLONES_DIR

#
echo "Npm install the Node Server $CLONES_DIR"
npm install
#

#
# Delete files in nginx server-root
#
echo "Delete files in Nginx server root $SERVER_ROOT_DIR"
rm -rf $SERVER_ROOT_DIR/*


#
# Copy server files to nginx
#
echo "Copy server files to Nginx $SERVER_ROOT_DIR"
cp -r $CLONES_DIR/* $SERVER_ROOT_DIR
cp -r $CLONES_DIR/.env $SERVER_ROOT_DIR


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
./deploy-server-project
```
