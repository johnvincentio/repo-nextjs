---
meta-title: "Configure HTTP Nginx | John Vincent"
meta-description: "John Vincent's discussion on Configure HTTP Nginx"
meta-keywords: "HTTP Nginx"

title: "Configure HTTP Nginx"
subtitle: ""
lead: ""

category: [Taskmuncher, Ubuntu, Nginx]
permalink: /taskmuncher/deploy/configure-http-nginx/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Configure HTTP Nginx

Create HTTP configurations for

* www.taskmuncher.com

## Configuration

Stop Nginx

```
sudo systemctl stop nginx
```

Remove default site

```
cd /etc/nginx/
sudo rm sites-enabled/default
sudo rm sites-available/default
```

Create directories for http and https configurations

```
cd /etc/nginx/sites-available
sudo mkdir http https
```

### Configuration the domain

#### Create web server files

```
cd /var/www
sudo mkdir -p taskmuncher/html/.well-known
```

Note, the .well-known is for the SSL certs tasks.

For the domain, create file

	* sudo vi /var/www/taskmuncher/html/index.html

```
<html>
    <head>
        <title>Welcome to {{DOMAIN-NAME}}com!</title>
    </head>
    <body>
        <h1>Success!  The {{DOMAIN-NAME}} server block is working!</h1>
    </body>
</html>
```

Change the directory ownership

```
sudo chown -R jv:jv /var/www/taskmuncher/html
```

Change ownership of files

```
cd /var/www/taskmuncher/html
find . -type d -print0 | xargs -0 chmod 0755 # For directories
find . -type f -print0 | xargs -0 chmod 0644 # For files
```

### Configure taskmuncher.com

```
sudo vi /etc/nginx/sites-available/http/taskmuncher
```

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name taskmuncher.com www.taskmuncher.com;
  root /var/www/taskmuncher/html;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }
  location ~ /.well-known {
    allow all;
  }
}
```

## Scripts to Switch Http / Https

This is scripted as it is far too easy to get wrong.

Add 2 files to the bin directory

bin/enable-http

```
#!/bin/sh
#
#  script to enable non-SSL
#
cd /etc/nginx/sites-enabled/
#
echo "Remove previous symbolic link"
sudo rm /etc/nginx/sites-enabled/taskmuncher
#
echo "Create symbolic links to HTTP files"
sudo ln -s /etc/nginx/sites-available/http/taskmuncher /etc/nginx/sites-enabled/taskmuncher
ls -la
#
echo "Restarting Pm2"
pm2 restart all
#
echo "Restarting Nginx"
sudo nginx -t
sudo systemctl restart nginx
#
echo "Completed"
```

bin/enable-https

```
#!/bin/sh
#
#  script to enable SSL
#
cd /etc/nginx/sites-enabled/
#
echo "Remove previous symbolic link"
sudo rm /etc/nginx/sites-enabled/taskmuncher
#
echo "Create symbolic links to HTTPS files"
sudo ln -s /etc/nginx/sites-available/https/taskmuncher /etc/nginx/sites-enabled/taskmuncher
ls -la
#
echo "Checking for PM2 server.js task"
pm2 list
echo "If no tasks are listed, perform the following: "
echo "cd /var/www/taskmuncher/html"
echo "pm2 start server.js"
#
echo "Restarting PM2"
pm2 restart all
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

Set permissions

```
chmod 744 enable-http*
```

## Enable Http Server Blocks

Enable Http, also restarts Nginx

```
enable-http
```

### Test from browser, now using port 80:

They all should be working.

```
http://www.taskmuncher.com
http://taskmuncher.com
```





