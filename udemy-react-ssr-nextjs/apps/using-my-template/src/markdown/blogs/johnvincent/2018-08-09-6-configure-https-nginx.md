---
meta-title: "Configure HTTPS Nginx | John Vincent"
meta-description: "John Vincent's discussion on Configure HTTPS Nginx"
meta-keywords: "Configure HTTPS Nginx"

title: "Configure HTTPS Nginx"
subtitle: ""
lead: ""

category: [Ubuntu, Nginx, Johnvincent.io]
permalink: /johnvincent/configure-https-nginx/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Configure Nginx for SSL

Stop Nginx:

```
sudo systemctl stop nginx
```

Now configure each domain and subdomain

## Configure johnvincent.io

```
sudo vi /etc/nginx/sites-available/https/johnvincent.io
```

```
server {
    listen 80;
    listen [::]:80;
    server_name johnvincent.io www.johnvincent.io;
    return 301 https://www.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name johnvincent.io;
    return 301 https://www.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-johnvincent.io.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

    root /var/www/johnvincent.io/html;

    index index.html;

    server_name www.johnvincent.io;

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        try_files $uri $uri/ =404;
    }
	location /private {
		auth_basic           "Private Area";
		auth_basic_user_file /etc/nginx/.htpasswd; 
	}
    location ~ /.well-known {
         allow all;
    }
    location = /analytics.js {
        proxy_pass https://www.google-analytics.com;
        expires 31536000s;
        proxy_set_header Pragma "public";
        proxy_set_header Cache-Control "max-age=31536000, public";
    }
    location = /feed.xml {
        types        { }
        default_type "application/rss+xml";
    }
    location /junk {
        try_files $uri =503;
    }
    error_page 404 /error;
}
```

## Configure `music`

```
sudo vi /etc/nginx/sites-available/https/music
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

## Configure `mygithub`

```
sudo vi /etc/nginx/sites-available/https/mygithub
```

```
server {
    listen 80;
    listen [::]:80;
  	server_name mygithub.johnvincent.io www.mygithub.johnvincent.io;
    return 301 https://www.mygithub.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
		include snippets/ssl-mygithub-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name mygithub.johnvincent.io;
    return 301 https://www.mygithub.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-mygithub-johnvincent.io.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

		root /var/www/mygithub/html;
    index index.html;

    server_name www.mygithub.johnvincent.io;

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

## Configure `jekyll`

```
sudo vi /etc/nginx/sites-available/https/jekyll
```

```
server {
    listen 80;
    listen [::]:80;
    server_name jekyll.johnvincent.io www.jekyll.johnvincent.io;
    return 301 https://www.jekyll.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-jekyll-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name jekyll.johnvincent.io;
    return 301 https://www.jekyll.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-jekyll-johnvincent.io.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

	root /var/www/jekyll/html;

    index index.html;

        server_name www.jekyll.johnvincent.io;

    location / {
        try_files $uri $uri/ =404;
    }
	location = /feed.xml {
        types        { } 
        default_type "application/rss+xml";
    } 
    location ~ /.well-known {
         allow all;
    }
}
```

## Configure `images`

```
sudo vi /etc/nginx/sites-available/https/images
```

```
server {
    listen 80;
    listen [::]:80;
    server_name images.johnvincent.io www.images.johnvincent.io;
    return 301 https://www.images.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-images-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name images.johnvincent.io;
    return 301 https://www.images.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-images-johnvincent.io.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

	root /var/www/images/html;

    index index.html;

        server_name www.images.johnvincent.io;

    location / {
        try_files $uri $uri/ =404;
    }
    location ~ /.well-known {
         allow all;
    }
}
```

## Configure `linkedin`

```
sudo vi /etc/nginx/sites-available/https/linkedin
```

```
server {
    listen 80;
    listen [::]:80;
    server_name linkedin.johnvincent.io www.linkedin.johnvincent.io;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-linkedin-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name linkedin.johnvincent.io www.linkedin.johnvincent.io;
    return 301 https://www.linkedin.com/in/john-vincent-io/;
}
```


## Configure other subdoamins

The remaining subdomains shouls also be configured. Use the above as a pattern.


## Enable Server Blocks

Use symlinks as files in `/etc/nginx/sites-enabled` will be run by the server.

Create script file `~/bin/enable-https`

```
#!/bin/sh
#
#  script to enable SSL
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
echo "Create symbolic links to HTTPS files"
sudo ln -s /etc/nginx/sites-available/https/johnvincent.io /etc/nginx/sites-enabled/johnvincent.io
sudo ln -s /etc/nginx/sites-available/https/music /etc/nginx/sites-enabled/music
sudo ln -s /etc/nginx/sites-available/https/mygithub /etc/nginx/sites-enabled/mygithub
sudo ln -s /etc/nginx/sites-available/https/rijksmuseum /etc/nginx/sites-enabled/rijksmuseum
sudo ln -s /etc/nginx/sites-available/https/internet-resources /etc/nginx/sites-enabled/internet-resources
sudo ln -s /etc/nginx/sites-available/https/peg-solitaire /etc/nginx/sites-enabled/peg-solitaire
sudo ln -s /etc/nginx/sites-available/https/omnifood /etc/nginx/sites-enabled/omnifood
sudo ln -s /etc/nginx/sites-available/https/images /etc/nginx/sites-enabled/images
sudo ln -s /etc/nginx/sites-available/https/jekyll /etc/nginx/sites-enabled/jekyll
sudo ln -s /etc/nginx/sites-available/https/test /etc/nginx/sites-enabled/test
sudo ln -s /etc/nginx/sites-available/https/linkedin /etc/nginx/sites-enabled/linkedin
ls -la
#
echo "Handle PM2 tasks"
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

Execute `~/bin/enable-https`


### Test from browser, now using port 443:

They all should be working.

```
https://www.johnvincent.io
https://johnvincent.io

https://www.music.johnvincent.io
https://music.johnvincent.io

https://www.mygithub.johnvincent.io
https://mygithub.johnvincent.io

https://www.images.johnvincent.io
https://images.johnvincent.io

https://www.jekyll.johnvincent.io
https://jekyll.johnvincent.io

https://www.rijksmuseum.johnvincent.io
https://rijksmuseum.johnvincent.io

https://www.internet-resources.johnvincent.io
https://internet-resources.johnvincent.io

https://www.peg-solitaire.johnvincent.io
https://peg-solitaire.johnvincent.io

https://www.omnifood.johnvincent.io
https://omnifood.johnvincent.io

https://www.linkedin.johnvincent.io
https://linkedin.johnvincent.io

https://www.test.johnvincent.io
https://test.johnvincent.io
```

## Test SSL Certificates

Ensure all scores are A+

```
https://www.ssllabs.com/ssltest/analyze.html?d=johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=music.johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=mygithub.johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=images.johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=jekyll.johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=rijksmuseum.johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=internet-resources.johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=peg-solitaire.johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=omnifood.johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=linkedin.johnvincent.io

https://www.ssllabs.com/ssltest/analyze.html?d=test.johnvincent.io
```
