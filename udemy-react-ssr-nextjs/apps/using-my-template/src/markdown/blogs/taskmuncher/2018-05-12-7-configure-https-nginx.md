---
meta-title: "Configure HTTPS Nginx | John Vincent"
meta-description: "John Vincent's discussion on Configure HTTPS Nginx"
meta-keywords: "HTTPS Nginx"

title: "Configure HTTPS Nginx"
subtitle: ""
lead: ""

category: [Taskmuncher, Ubuntu, Nginx]
permalink: /taskmuncher/deploy/configure-https-nginx/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Configure Nginx for SSL

Stop Nginx:

```
sudo systemctl stop nginx
```

Now configure each domain and subdomain

## Configure `taskmuncher.com`

```
sudo vi /etc/nginx/sites-available/https/taskmuncher
```

```
server {
    listen 80;
    listen [::]:80;
    server_name taskmuncher.com www.taskmuncher.com;
    return 301 https://www.taskmuncher.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-taskmuncher.com.conf;
    include snippets/ssl-params.conf;

    server_name taskmuncher.com;
    return 301 https://www.taskmuncher.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-taskmuncher.com.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

    root /var/www/taskmuncher/html;

    index index.html;

    server_name www.taskmuncher.com;

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
    location = /feed.xml {
        types        { }
        default_type "application/rss+xml";
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

Notice

```
location /api {
	proxy_pass http://localhost:3001;
}
```

All URLs beginning with `/api` will be passed to `http://localhost:3001/api`

This allows these URLs to be handled by a node server running on port 3001.

Notice

```
location ~*  \.(svg|jpg|jpeg|png|gif|ico|css|js|pdf)$ {
	expires 30d;
}
```

This allows browser caching of the listed resources. Set as needed.

Note that `h5bp/basic.conf` sets up `expires`. Thus, if including `h5bp/basic.conf` 
do not set the `expires 30d` directive.

### Use the boilerplate

The boilerplate can cause problems when using a reverse proxy, but if it works it is probably best to use it.

Uncomment `include h5bp/basic.conf;`

Remove 

```
location ~*  \.(svg|jpg|jpeg|png|gif|ico|css|js|pdf)$ {
	expires 30d;
}
```

as the boilerplate handles expiry dates for different file types.

## Rewriting Requests

If, for example, requests to 

```
https://www.taskmuncher.com/api
```

should not be directed to 

```
http://localhost:3001/api
```

then it is necessary to rewrite the request.

For example, to rewrite to 

```
http://localhost:3001
```

use the following

```
location /api {
	rewrite ^/api(.*) /$1 break;
	proxy_pass http://localhost:3001;
}
```

using the regular expression 'rewrite'

## Enable Https Server Blocks

Enable Https, also restarts Nginx

```
enable-https
```

### Test from browser, now using port 443:

They all should be working.

```
https://www.taskmuncher.com
https://taskmuncher.com
```

## Test SSL Certificates

Ensure all scores are A+

```
https://www.ssllabs.com/ssltest/analyze.html?d=taskmuncher.com
```

