---
meta-title: "Configure HTTP Nginx | John Vincent"
meta-description: "John Vincent's discussion on Configure HTTP Nginx"
meta-keywords: "Configure HTTP Nginx"

title: "Configure HTTP Nginx"
subtitle: ""
lead: ""

category: [Ubuntu, Nginx, Johnvincent.io]
permalink: /johnvincent/configure-http-nginx/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Configure HTTP Nginx

Create HTTP configurations for

* www.johnvincent.io
* www.jekyll.johnvincent.io
* www.music.johnvincent.io
* www.mygithub.johnvincent.io
* www.rijksmuseum.johnvincent.io
* www.internet-resources.johnvincent.io
* www.peg-solitaire.johnvincent.io
* www.omnifood.johnvincent.io
* www.images.johnvincent.io
* www.test.johnvincent.io
* www.linkedin.johnvincent.io

## Configuration

Stop Nginx

```
sudo systemctl stop nginx
```

Remove default site

```
cd /etc/nginx/
sudo rm sites-enabled/default
```

Create directories for http and https configurations

```
cd /etc/nginx/sites-available
sudo mkdir http https
```

### Configuration for each domain and subdomains

#### Create web server files

```
cd /var/www
sudo mkdir -p johnvincent.io/html/.well-known
sudo mkdir -p jekyll/html/.well-known
sudo mkdir -p music/html/.well-known
sudo mkdir -p mygithub/html/.well-known
sudo mkdir -p rijksmuseum/html/.well-known
sudo mkdir -p internet-resources/html/.well-known
sudo mkdir -p peg-solitaire/html/.well-known
sudo mkdir -p omnifood/html/.well-known
sudo mkdir -p images/html/.well-known
sudo mkdir -p linkedin/html/.well-known
sudo mkdir -p test/html/.well-known
```

Note, the .well-known is for the SSL certs tasks.

For each domain/subdomain, create file

	* sudo vi /var/www/{domain-name}/html/index.html

```
<html>
    <head>
        <title>Welcome!</title>
    </head>
    <body>
        <h1>Success! The www.{{sub-domain-name}}.johnvincent.io server block is working!</h1>
    </body>
</html>
```


Change the directory ownership

```
sudo chown -R jv:jv /var/www/{domain-name}/html
```

Change ownership of files

```
cd /var/www/{domain-name}/html
find . -type d -print0 | xargs -0 chmod 0755 # For directories
find . -type f -print0 | xargs -0 chmod 0644 # For files
```

### Configure `johnvincent.io`

```
sudo vi /etc/nginx/sites-available/http/johnvincent.io
```

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name johnvincent.io www.johnvincent.io;
  root /var/www/johnvincent.io/html;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }
  location ~ /.well-known {
    allow all;
  }
}
```

### Configure subdomains

```
sudo vi /etc/nginx/sites-available/http/{sub-domain}
```

```
server {
  listen 80;
  listen [::]:80;

  server_name {sub-domain}.johnvincent.io www.{sub-domain}.johnvincent.io;
  root /var/www/{sub-domain}.com/html;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }
  location ~ /.well-known {
    allow all;
  }
}
```

## Create Script files

Create script file `~/bin/enable-http`

```
#!/bin/sh
#
#  script to enable non-SSL
#
cd /etc/nginx/sites-enabled/
#
echo "Remove previous symbolic links"
sudo rm /etc/nginx/sites-enabled/johnvincent.io
sudo rm /etc/nginx/sites-enabled/music
sudo rm /etc/nginx/sites-enabled/mygithub
sudo rm /etc/nginx/sites-enabled/rijksmuseum
sudo rm /etc/nginx/sites-enabled/internet-resources
sudo rm /etc/nginx/sites-enabled/peg-solitaire
sudo rm /etc/nginx/sites-enabled/omnifood
sudo rm /etc/nginx/sites-enabled/images
sudo rm /etc/nginx/sites-enabled/jekyll
sudo rm /etc/nginx/sites-enabled/test
sudo rm /etc/nginx/sites-enabled/linkedin
#
echo "Create symbolic links to HTTP files"
sudo ln -s /etc/nginx/sites-available/http/johnvincent.io /etc/nginx/sites-enabled/johnvincent.io
sudo ln -s /etc/nginx/sites-available/http/music /etc/nginx/sites-enabled/music
sudo ln -s /etc/nginx/sites-available/http/mygithub /etc/nginx/sites-enabled/mygithub
sudo ln -s /etc/nginx/sites-available/http/rijksmuseum /etc/nginx/sites-enabled/rijksmuseum
sudo ln -s /etc/nginx/sites-available/http/internet-resources /etc/nginx/sites-enabled/internet-resources
sudo ln -s /etc/nginx/sites-available/http/peg-solitaire /etc/nginx/sites-enabled/peg-solitaire
sudo ln -s /etc/nginx/sites-available/http/omnifood /etc/nginx/sites-enabled/omnifood
sudo ln -s /etc/nginx/sites-available/http/images /etc/nginx/sites-enabled/images
sudo ln -s /etc/nginx/sites-available/http/jekyll /etc/nginx/sites-enabled/jekyll
sudo ln -s /etc/nginx/sites-available/http/test /etc/nginx/sites-enabled/test
sudo ln -s /etc/nginx/sites-available/http/linkedin /etc/nginx/sites-enabled/linkedin
ls -la
#
echo "Restarting Nginx"
nginx-restart
#
echo "Completed"
```


Create script file `~/bin/nginx-restart`

```
#!/bin/bash
#
# script to restart nginx
#
echo "Restarting Nginx"
sudo nginx -t
sudo systemctl restart nginx
```

Create script file `~/bin/nginx-stop`

```
#!/bin/bash
#
# script to stop nginx
#
echo "Stopping Nginx"
sudo nginx -t
sudo systemctl stop nginx
Completed"
```

## Enable Server Blocks

```
enable-http
```

### Test Server

Restart Nginx

```
nginx-restart
```

### Test from browser, now using port 80:

They all should be working.

````
http://www.johnvincent.io
http://johnvincent.io

http://www.music.johnvincent.io
http://music.johnvincent.io

http://www.mygithub.johnvincent.io
http://mygithub.johnvincent.io

http://www.images.johnvincent.io
http://images.johnvincent.io

http://www.jekyll.johnvincent.io
http://jekyll.johnvincent.io

http://www.rijksmuseum.johnvincent.io
http://rijksmuseum.johnvincent.io

http://www.internet-resources.johnvincent.io
http://internet-resources.johnvincent.io

http://www.peg-solitaire.johnvincent.io
http://peg-solitaire.johnvincent.io

http://www.omnifood.johnvincent.io
http://omnifood.johnvincent.io

http://www.linkedin.johnvincent.io
http://linkedin.johnvincent.io

http://www.test.johnvincent.io
http://test.johnvincent.io
```
