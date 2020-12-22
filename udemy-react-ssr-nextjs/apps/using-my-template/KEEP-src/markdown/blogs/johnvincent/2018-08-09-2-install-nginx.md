---
meta-title: "Install Ubuntu Nginx | John Vincent"
meta-description: "John Vincent's discussion on Install Ubuntu Nginx"
meta-keywords: "Install Ubuntu  Nginx"

title: "Install Ubuntu Nginx"
subtitle: ""
lead: ""

category: [Ubuntu, Nginx, Johnvincent.io]
permalink: /johnvincent/install-ubuntu-nginx/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Install Nginx on Ubuntu 16.04

[Useful reference](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)

Install Nginx

```
sudo apt-get update
sudo apt-get install nginx
```

## Adjust the Firewall

List applications:

```
sudo ufw app list
```

To allow only port 80:

```
sudo ufw allow 'Nginx HTTP'
```

Verify the change:

```
sudo ufw status
```

## Check your Web Server

Check the `systemd` init system to make sure the service is running:

```
systemctl status nginx
```

## Check from a browser:

```
<your-ip>
```

and should see Nginx page

# Manage the Nginx Process

To stop your web server

```
sudo systemctl stop nginx
```

To start the web server

```
sudo systemctl start nginx
```

To restart the service

```
sudo systemctl restart nginx
```


If you are simply making configuration changes, Nginx can often reload without dropping connections.

```
sudo systemctl reload nginx
```

By default, Nginx is configured to start automatically when the server boots. If this is not what you want, you can disable this behavior

```
sudo systemctl disable nginx
```

To re-enable the service to start up at boot:

```
sudo systemctl enable nginx
```

## Important Nginx Files and Directories

Content

- `/var/www/html`: The actual web content, which by default only consists of the default Nginx page you saw earlier, is served out of the `/var/www/html` directory. This can be changed by altering Nginx configuration files.

Server Configuration

- `/etc/nginx`: The Nginx configuration directory. All of the Nginx configuration files reside here.
- `/etc/nginx/nginx.conf`: The main Nginx configuration file. This can be modified to make changes to the Nginx global configuration.
- `/etc/nginx/sites-available`: The directory where per-site "server blocks" can be stored. Nginx will not use the configuration files found in this directory unless they are linked to the sites-enabled directory (see below). Typically, all server block configuration is done in this directory, and then enabled by linking to the other directory.
- `/etc/nginx/sites-enabled/`: The directory where enabled per-site "server blocks" are stored. Typically, these are created by linking to configuration files found in the `sites-availabledirectory`
- `/etc/nginx/snippets`: This directory contains configuration fragments that can be included elsewhere in the Nginx configuration. Potentially repeatable configuration segments are good candidates for refactoring into snippets.

Server Logs

- `/var/log/nginx/access.log`: Every request to your web server is recorded in this log file unless Nginx is configured to do otherwise.
- `/var/log/nginx/error.log`: Any Nginx errors will be recorded in this log.

## Configure Nginx

`sudo vi /etc/nginx/nginx.conf`

```
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
  worker_connections 768;
  # multi_accept on;
}

http {

##
# Basic Settings
##

  server_tokens off;
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  charset_types text/css text/plain text/vnd.wap.wml application/javascript application/json application/rss+xml application/xml;

  keepalive_timeout 65;
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  types_hash_max_size 2048;
# server_tokens off;

  server_names_hash_bucket_size 64;
# server_name_in_redirect off;

##
# SSL Settings
##
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
  ssl_prefer_server_ciphers on;

##
# Logging Settings
##

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

##
# Gzip Settings
##

  gzip on;
  gzip_comp_level 6;
  gzip_min_length 256;
  gzip_proxied any;
  gzip_vary on;

  gzip_disable "msie6";
  gzip_buffers 16 8k;
  gzip_http_version 1.1;

  gzip_types
    application/atom+xml
    application/javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rss+xml
    application/vnd.geo+json
    application/vnd.ms-fontobject
    application/x-font-ttf
    application/x-web-app-manifest+json
    application/xhtml+xml
    application/xml
    font/opentype
    image/bmp
    image/svg+xml
    image/x-icon
    text/cache-manifest
    text/css
    text/plain
    text/vcard
    text/vnd.rim.location.xloc
    text/vtt
    text/x-component
    text/x-cross-domain-policy;

##
# Virtual Host Configs
##

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### Advanced Nginx Configuration

Clone 

```
git clone https://github.com/h5bp/server-configs-nginx.git
to
/home/jv/hb5p
```

Copy to Nginx

```
sudo cp -r h5bp /etc/nginx
```

Restart Nginx:

```
sudo systemctl restart nginx
```
