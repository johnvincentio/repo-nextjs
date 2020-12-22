---
meta-title: "Deploy Feediator to Digital Ocean | John Vincent"
meta-description: "John Vincent's discussion on Deploy Feediator to Digital Ocean"
meta-keywords: "Feediator, Deploy, Digital Ocean"

title: "Deploy Feediator to Digital Ocean"
subtitle: "Deploying Feediator to a Droplet"
lead: "Building and Configuring a Droplet can be very complex."

category: [Feediator, Digital Ocean, Ubuntu]
permalink: /feediator/deploy/droplet/
---

Article that describes the creation and configuration of a Ubuntu droplet at Digital Ocean and the deployment of the Feediator application.

<!-- end -->

# Create Ubuntu Droplet at Digital Ocean

[Sign in to Digital Ocean](https://digitalocean.com)

* Create Droplet
* Ubuntu `16.04 x64`
* Standard: $5/month
* Choose a datacenter region
* No SSH key
* Hostname: `feediator`

The Ubuntu droplet is created and an IP provided.

## Set Root Password

Dashboard

* Select droplet
* Access (left nav)
* Reset Root Password
	* Password is emailed.

Get password from your email.

* Launch Console
* root
	* {password-from-your-email}

* Change password

## How To Connect To Your Droplet with SSH

[Useful reference](https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh)

[Initial Setup reference](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)

* Connect to droplet
	* ssh root@{your-ip}

```
The authenticity of host '<your-ip> (<your-ip>)' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

* Yes

#### Basic configuration

* Add user
	* `adduser {remote-user}`
	* {password}

* Root privileges
	* `usermod -aG sudo {remote-user}`

Add aliases

```
su - {remote-user}
vi .profile

add
lf() { ls -FaC $*; }
```

Add aliases to root

```
sudo -s
vi /etc/bash.bashrc

add
lf() { ls -FaC $*; }
```

#### Add Public Key Authentication

From Mac

```
cd .ssh
ssh-keygen
```

```
Enter file in which to save the key (/Users/<my-user>/.ssh/id_rsa): id_feediator
```

* passphrase: do not provide a passphrase

Generates two files

* private: `id_feediator`
* public: `id_feediator.pub`

Store key in keychain

```
chmod 600 id_feediator*
ssh-add -K id_feediator
```

Add to `.ssh/config`

```
Host mywebsite
    UseKeychain yes
    AddKeysToAgent yes
    HostName <your-ip>
    User <your-user>
    IdentityFile ~/.ssh/id_feediator
```

#### Copy public key to remote server

```
cd
cd .ssh
ssh-copy-id <remote-user>@<your-ip>
```

#### Verify Public Key on Remote Server

* Login to digital ocean droplet
* `su - <remote-user>`
* `cd .ssh`
* view `authorized_keys`
	* Key should be present	
	* Remove all other keys


#### Test SSH to Remote Server

```
ssh <remote-user>@<your-ip>
```

#### Disable Password Authentication

As root or your sudo user, open the SSH daemon configuration

```
sudo vi /etc/ssh/sshd_config
```

set:

```
PasswordAuthentication no
```

ensure:

```
PubkeyAuthentication yes
ChallengeResponseAuthentication no
```

reload the SSH daemon:

```
sudo systemctl reload sshd
```

Test Log In

```
ssh <remote-user>@<your-ip>
```

should log in without any passwords.

## Set Up a Basic Firewall

[Firewall Rules Reference](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)

List applications:

```
sudo ufw app list
```

Available applications:
  OpenSSH

Ensure firewall allows SSH connection:

```
sudo ufw allow OpenSSH
```

enable the firewall:

```
sudo ufw enable
```

You can see that SSH connections are still allowed by typing:
```
sudo ufw status
```

## Add Swap

[Swap reference](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04)

Check System for Swap

```
sudo swapon -s
```

Check current disk usage

```
df -h
```

#### Create Swap File

```
sudo dd if=/dev/zero of=/swapfile bs=1G count=4
```

if this fails with:

```
dd: memory exhausted by input buffer of size 1073741824 bytes (1.0 GiB)
```

then try:

```
sudo fallocate -l 4G /swapfile
```

Check swap file

```
ls -lh /swapfile
```

#### Enabling the Swap File

Secure the swap file:

```
sudo chmod 600 /swapfile
```

tell our system to set up the swap space:

```
sudo mkswap /swapfile
```

enable the swap:

```
sudo swapon /swapfile
```

verify:

```
sudo swapon -s
```

#### Make the Swap File Permanent

Edit configuration file:

```
sudo vi /etc/fstab
```

Add to the end:

```
/swapfile   none    swap    sw    0   0
```

#### Tweak your Swap Settings

Current `swappiness` value by typing:

```
cat /proc/sys/vm/swappiness
```

For a VPS system, this number needs to be close to zero.

Edit configuration:

```
sudo vi /etc/sysctl.conf
```

At the bottom, add:

```
vm.swappiness=10
```

Another related value that you might want to modify is the `vfs_cache_pressure`. This setting configures how much the system will choose to `cache inode` and `dentry` information over other data.

```
cat /proc/sys/vm/vfs_cache_pressure
sudo vi /etc/sysctl.conf
add:
vm.vfs_cache_pressure = 50
```

#### Check Swap

```
sudo swapon --summary
free -h
```

## Install Basics

```
sudo apt-get update
sudo apt-get install zip wget
```



## Install Node and Npm

#### Node V6 - Best for Production

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```
which node
/usr/bin/node

which npm
/usr/bin/npm

node -v
v6.11.1

npm -v
v3.10.10
```

#### Node V4 - Reference Purposes Only

[Install Node version 4](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04)

```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

```
nodejs -v
v4.2.6

npm -v
3.5.2
```

##### Uninstall

```
which node
which npm
```

```
sudo apt-get remove nodejs
sudo apt-get remove npm
```

```
cd /etc/apt/sources.list.d
```

and remove any node list.

```
sudo apt-get update
```

## Install PM2

Use PM2, a production process manager for Node applications with a built-in load balancer.

Shutdown Ghost. Ensure Ghost is shutdown before proceeding.

Install PM2

```
sudo npm install pm2 -g
pm2 -v
```

## Install HTML-Minifier

```
sudo npm install html-minifier -g
```

# Install Mongo Ubuntu

[How to Install MongoDB on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)

[How to Install and Secure MongoDB on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04)

```
sudo apt-get update
```

## Adding the MongoDB Repository

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

Issue the following command to create a list file for MongoDB.

```
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```

After adding the repository details, we need to update the packages list.

```
sudo apt-get update
```

## Installing and Verifying MongoDB

Now we can install the MongoDB package itself.

```
sudo apt-get install -y mongodb-org
```

We'll create a unit file to manage the MongoDB service.

```
sudo vi /etc/systemd/system/mongodb.service
```

```
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```

Next, start the newly created service with `systemctl`

```
sudo systemctl start mongodb
```

Check that the service has started properly.

```
sudo systemctl status mongodb
```

Enable automatically starting MongoDB when the system starts.

```
sudo systemctl enable mongodb
```

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

- `/var/www/html`: The actual web content, which by default only consists of the default Nginx page you saw earlier, is served out of the `/var/www/html directory`. This can be changed by altering Nginx configuration files.

Server Configuration

- `/etc/nginx`: The Nginx configuration directory. All of the Nginx configuration files reside here.
- `/etc/nginx/nginx.conf`: The main Nginx configuration file. This can be modified to make changes to the Nginx global configuration.
- `/etc/nginx/sites-available`: The directory where per-site "server blocks" can be stored. Nginx will not use the configuration files found in this directory unless they are linked to the `sites-enabled` directory (see below). Typically, all server block configuration is done in this directory, and then enabled by linking to the other directory.
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

Clone to `/home/jv/h5bp`

```
git clone https://github.com/h5bp/server-configs-nginx.git h5bp
```

Copy to Nginx

```
cd h5bp
sudo cp -r h5bp /etc/nginx
```

Restart Nginx:

```
sudo systemctl restart nginx
```

# Configuring Google Domains

[Sign in to Google Domains](https://domains.google.com)

Select domain: `feediator.com`

* Configure DNS
* Registered Hosts

```
Host name: feediator.com
IP: 174.138.77.36

Host name: www.feediator.com
IP: 174.138.77.36
```

Add Custom resource records.

```
name: @
Type: A
TTL: 1h
Data: 174.138.77.36
```

```
name: www
Type: A
TTL: 1h
Data: 174.138.77.36
```

### Verify Domain Configuration

[Google Domains](https://domains.google.com/registrar)

Ensure all are domains and subdomains are forwarding to the correct ip.

#### Test Domains

```
dig A feediator.com
dig A www.feediator.com

ping A feediator.com
ping A www.feediator.com
```

Output for each should look like:

```
dig A www.feediator.com

; <<>> DiG 9.8.3-P1 <<>> A www.feediator.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 61202
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;www.feediator.com.		IN	A

;; ANSWER SECTION:
www.feediator.com.	3581	IN	A	174.138.77.36

;; Query time: 0 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Mon Aug 14 03:47:38 2017
;; MSG SIZE  rcvd: 51
```

# Configure HTTP Nginx

Create HTTP configurations for

* www.feediator.com

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

### Configuration the domain

#### Create web server files

```
cd /var/www
sudo mkdir -p feediator/html/.well-known
```

Note, the .well-known is for the SSL certs tasks.

For the domain, create file

	* sudo vi /var/www/feediator/html/index.html

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
sudo chown -R jv:jv /var/www/feediator/html
```

Change ownership of files

```
cd /var/www/feediator/html
find . -type d -print0 | xargs -0 chmod 0755 # For directories
find . -type f -print0 | xargs -0 chmod 0644 # For files
```

### Configure feediator.com

```
sudo vi /etc/nginx/sites-available/http/feediator
```

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name feediator.com www.feediator.com;
  root /var/www/feediator/html;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }
  location ~ /.well-known {
    allow all;
  }
}
```

## Enable Server Blocks

Use symlinks as files in `/etc/nginx/sites-enabled` will be run by the server.

```
sudo ln -s /etc/nginx/sites-available/http/feediator /etc/nginx/sites-enabled/feediator
```

### Test Server

Restart Nginx

```
sudo nginx -t
sudo systemctl restart nginx
```

### Test from browser, now using port 80:

They all should be working.

```
http://www.feediator.com
http://feediator.com
```

# Create SSL Certificates

[SSL reference](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)

Get SSL cert for:

- feediator.com and www.feediator.com

Certificates are build by document root. As each domain has it’s own document root, there will be 5 sets of certificates.

Ensure all are forwarding to the correct ip.

## Install letsencrypt

```
sudo apt-get update
sudo apt-get install letsencrypt
```

### Obtain an SSL Certificate

We'll show you how to use the Webroot plugin to obtain an SSL certificate.

#### How Webroot Plugin Works

The Webroot plugin works by placing a special file in the /.well-known directory within your document root, which can be opened (through your web server) by the Let's Encrypt service for validation. Depending on your configuration, you may need to explicitly allow access to the /.well-known directory.

`sudo vi /etc/nginx/sites-available/default`

Note root directive, this is `webroot-path`

`root /var/www/html;`

After location block, add:

```
location ~ /.well-known {
  allow all;
}
```

Check your configuration for syntax errors:

```
sudo nginx -t
```

```
If no errors are found, restart Nginx with this command:
sudo systemctl restart nginx

Now that we know our webroot-path, we can use the Webroot plugin to request an SSL certificate with these commands. Here, we are also specifying our domain names with the -d option. If you want a single cert to work with multiple domain names (e.g. example.com and www.example.com), be sure to include all of them. Also, make sure that you replace the highlighted parts with the appropriate webroot path and domain name(s):

email address:

Should see:
IMPORTANT NOTES:
 - If you lose your account credentials, you can recover through
   e-mails sent to jv@johnvincent.io.
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/johnvincent.io/fullchain.pem. Your
   cert will expire on 2017-05-31. To obtain a new version of the
   certificate in the future, simply run Let's Encrypt again.
 - Your account credentials have been saved in your Let's Encrypt
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Let's
   Encrypt so making regular backups of this folder is ideal.

Files are in:
/etc/letsencrypt/archive/feediator.com

Files are:
cert1.pem, chain1.pem, fullchain1.pem, privkey1.pem

However, Let's Encrypt creates symbolic links to the most recent certificate files in the /etc/letsencrypt/live/your_domain_name directory. Because the links will always point to the most recent certificate files, this is the path that you should use to refer to your certificate files.

see:
/etc/letsencrypt/live/feediator.com
```

## Add SSL for Domain and Subdomains

Uses different document roots, thus must run separately:

```
sudo letsencrypt certonly -a webroot --webroot-path=/var/www/feediator/html -d feediator.com -d www.feediator.com

email: jv@johnvincent.io
```

### Generate Strong Diffie-Hellman Group

To further increase security, you should also generate a strong Diffie-Hellman group. To generate a `2048-bit` group, use this command:

```
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

This may take a few minutes but when it's done you will have a strong DH group at 

```
/etc/ssl/certs/dhparam.pem
```

### Configure TLS/SSL on Web Server (Nginx)

Now that you have an SSL certificate, you need to configure your Nginx web server to use it.

#### Create a Configuration Snippet Pointing to the SSL Key and Certificate

First, let's create a new Nginx configuration snippet in the `/etc/nginx/snippets` directory. This is done for each domain and subdomain.

```
sudo vi /etc/nginx/snippets/ssl-feediator.com.conf
add:
ssl_certificate /etc/letsencrypt/live/feediator.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/feediator.com/privkey.pem;
```

#### Create a Configuration Snippet with Strong Encryption Settings

The parameters we will set can be reused in future Nginx configurations, so we will give the file a generic name:

```
sudo vi /etc/nginx/snippets/ssl-params.conf
add:
# from https://cipherli.st/
# and https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html

ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
ssl_ecdh_curve secp384r1;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
# Disable preloading HSTS for now.  You can use the commented out header line that includes
# the "preload" directive if you understand the implications.
#add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;

ssl_dhparam /etc/ssl/certs/dhparam.pem;
```

#### Adjust the Nginx Configuration to Use SSL

Now that we have our snippets, we can adjust our Nginx configuration to enable SSL.

## Adjust the Firewall

Check if SSL enabled:

```
sudo ufw status
```

To additionally let in HTTPS traffic, we can allow the "Nginx Full" profile and then delete the redundant "Nginx HTTP" profile allowance:

```
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'

sudo ufw status
```

## Set Up SSL Certificates Auto Renewal

To trigger the renewal process for all installed domains, run this command:

```
cd
cd tmp (just in case)
sudo letsencrypt renew
```

# Configure Nginx for SSL

Stop Nginx:

```
sudo systemctl stop nginx
```

Now configure each domain and subdomain

## Configure feediator.com

```
sudo vi /etc/nginx/sites-available/https/feediator
```

```
server {
    listen 80;
    listen [::]:80;
    server_name feediator.com www.feediator.com;
    return 301 https://www.feediator.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-feediator.com.conf;
    include snippets/ssl-params.conf;

    server_name feediator.com;
    return 301 https://www.feediator.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-feediator.com.conf;
    include snippets/ssl-params.conf;
#    include h5bp/basic.conf;

    root /var/www/feediator/html;

    index index.html;

    server_name www.feediator.com;

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
}
```

## Enable Server Blocks

Use symlinks as files in `/etc/nginx/sites-enabled` will be run by the server.

```
cd /etc/nginx/sites-enabled/
sudo rm *
```

```
sudo ln -s /etc/nginx/sites-available/https/feediator /etc/nginx/sites-enabled/feediator
```

### Restart Server

```
sudo nginx -t
sudo systemctl restart nginx
```

### Test from browser, now using port 443:

They all should be working.

```
https://www.feediator.com
https://feediator.com
```

## Test SSL Certificates

Ensure all scores are A+

```
https://www.ssllabs.com/ssltest/analyze.html?d=feediator.com
```

# Google Analytics

```
https://analytics.google.com
```

* Add Account
* Login
* Admin

* Account (list with a drop-down)

From drop-down

	* Create new account.

```
Account name: feediator
Website name: feediator
Website url: 
https
www.feediator.com
```

* Get Tracking Id
	* Shows Website Tracking Code:
	* Copy the code

### Add to Google Analytics Template

Copy the Website Tracking code and paste into

```
partials/common/google-analytics.hbs
```

Change

```
https://www.google-analytics.com/analytics.js

to

https://www.feediator.com/analytics.js
```

```
Restart Nginx
sudo systemctl restart nginx

pm2 restart all
```

## Review Google Analytics Data

* Login
* List Accounts
* Select All Web Site Data


# First time deployment

```
cd /home/jv
mkdir bin cronjobs
mkdir -p SAVE_ENV/feediator
```

Create configuration file

```
edit SAVE_ENV/feediator/.env

add application configuration variables

```

Create cron jobs

```
edit cronjobs/update-feeds

add cron jobs

```

Permissions

```
chmod 744 cronjobs/update-feeds
```

## Before deployment

On Mac, remove quarantine from all files going to the website.

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful
```

Look for files with `com.apple.quarantine`

```
xattr -r -l  feediator | grep -i com.apple.quarantine
```

To remove quarantine:

```
xattr -r -d com.apple.quarantine feediator
```

## Deployment Script

Create script

```
/home/jv/bin/deploy-apps
```

```
#!/bin/sh
#
#  script to get, build and deploy apps to nginx 
#
cd tmp
#
echo "Removing Feediator Logfile"
rm /home/jv/tmp/logfile.txt
#
CLONES_DIR="/home/jv/clones"
DOCROOT_DIR="/var/www/feediator/html"
#
echo "Removing clones directory"
rm -rf $CLONES_DIR
#
echo "Creating clones directory"
mkdir $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories"
git clone https://github.com/johnvincentio/feediator $CLONES_DIR/feediator
#
# Delete files in nginx docroot
#
echo "Delete files in Nginx Docroot"
rm -rf $DOCROOT_DIR/*
#
# Copy files to nginx docroot
#
echo "Copy files to Nginx Docroot"
cp -r /home/jv/clones/feediator/* /var/www/feediator/html
#
cp -r /home/jv/SAVE_ENV/feediator/.env /var/www/feediator/html
#
# set permissions
#
echo "Setting permissions"
sudo chown -R jv:jv /var/www/feediator/html
find . -type d -print0 | xargs -0 chmod 0755 # For directories
find . -type f -print0 | xargs -0 chmod 0644 # For files
#
sudo chown -R jv:jv /var/www/feediator/html
find /var/www/feediator/html -type d -print0 | xargs -0 chmod 0755 # For directories
find /var/www/feediator/html -type f -print0 | xargs -0 chmod 0644 # For files
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

#### Mongo

May need to run mongo scripts, for example

```
cd /var/www/feediator/html/scripts
mongo localhost:27017/feediator test-data.js
mongo localhost:27017/feediator test-users.js
```

Check database

```
cd /var/www/feediator/html/scripts
mongo localhost:27017/feediator list-subscriptions.js
mongo localhost:27017/feediator list-user-subscriptions.js
```

#### Cron Job

May need a cron job

```
crontab -e

0 * * * *  /home/jv/cronjobs/update-feeds
```

```
crontab -l
```

#### Npm

May need to install node modules, for example

```
cd /var/www/feediator/html
npm install
```

#### PM2

May need to have PM2 start a task. If so, it will look like this

```
cd /var/www/feediator/html
pm2 start server.js
```


## Execute Deploy Script on Production Server

From Mac

```
ssh-to-feediator
```

Ensure

```
chmod 744 deploy-apps
```

Execute the deploy

```
./deploy-apps
```

#### Restart Nginx Server

```
sudo nginx -t
sudo systemctl restart nginx
```

# Google Webmaster Tools

[Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

## Domain

Domain is

```
www.feediator.com
```

I configured Nginx to redirect 

```
feediator.com
to
www.feediator.com
```

## Add a Site

Website is

```
www.feediator.com
```

Open [Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

* Add a Property
* Website, https://www.feediator.com
	* Add

## Verify your ownership of the domain.

There are many different options.

Open [Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

Select https://www.feediator.com

* Gear wheel icon (top right)
* Verification details
* Verify using a different method

### HTML file upload

Select HTML file upload

Tool has 4 steps

1. Download the verification file  `[google9104b904281bf3a3.html]`
2. Upload file to `www.feediator.com/google9104b904281bf3a3.html`
3. Confirm successful upload
	* https://www.feediator.com/google9104b904281bf3a3.html
4. Verify

If using express, it is more involved.

```
routes.js

add url to list not requiring a token

 '/google9104b904281bf3a3.html'
```

Add a route

```
routes.js

app.get('/google9104b904281bf3a3.html', function(req, res) {
    logger.info('/google9104b904281bf3a3.html');
    res.sendFile(path.join(__dirname + '/../public/google9104b904281bf3a3.html'));
});
```

Copy the google verification file to

```
public/google9104b904281bf3a3.html
```

Test

```
http://localhost:8080/google9104b904281bf3a3.html
```

Now redeploy application.

### HTML tag

* Copy meta tag to site's home page

Added to `index.html`

```
<meta name="google-site-verification" content="<your own tag>" />
```

* Verify

If using express/handlebars, it is more involved.

```
views/partials/common/head.hbs

paste the meta tag after title tag, chosen for the sake of consistency
```

Test

```
http://localhost:8080/

view page source to verify tag is good.
```

Now redeploy application.

### Domain Name provider (optional)

* Domain Name provider
	* Google Domains

1. Add the TXT record below to the DNS configuration for `feediator.com.
google-site-verification=t541b51i2vyIyUl2NSxJvc46YwyLrUSRMuWmJcz2UzI`

To do this with Google Domains, add the following record

```
Name: @
Type: TXT
TTL: 1h
Data:
google-site-verification=t541b51i2vyIyUl2NSxJvc46YwyLrUSRMuWmJcz2UzI
```

### Repeat steps

Repeat the verification steps so that have verified properties for 

* https://www.feediator.com
* https://feediator.com
* http://www.feediator.com
* http://feediator.com


* Add a Property
* Website, https://feediator.com
	* Add


### Create a Sitemap

create-sitemap

```
#!/bin/sh
#
OUTFILE=public/sitemap.xml
#
addFile() {
    CURFILE=$1;
    echo "\t<url>" >> $OUTFILE;
    echo "\t\t<loc>$MYHOST$CURFILE</loc>" >> $OUTFILE;
    echo "\t\t<lastmod>$DATE</lastmod>" >> $OUTFILE;
    echo "\t</url>" >> $OUTFILE;
}
#
DATE=`date +%Y-%m-%dT00:00:00+00:00`
# echo "Date $DATE"
MYHOST="https://www.feediator.com"
#echo "MYHOST $MYHOST"
#
echo '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' > $OUTFILE
echo '\txmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' >> $OUTFILE
echo '\txsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 ' >> $OUTFILE
echo '\thttp://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">' >> $OUTFILE
#
addFile '/'
addFile '/login'
addFile '/register'
#
echo '</urlset>' >> $OUTFILE
```

Execute the script

```
./create-sitemap
```

to produce

```
public/sitemap.xml
```

#### If using express, it is more involved.

```
routes.js

add url to list not requiring a token

 '/sitemap.xml'
```

Add a route

```
routes.js

app.get('/sitemap', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/sitemap.xml'));
});
```

Test

```
http://localhost:8080/sitemap.xml
```

### Site Settings

From Search Console

* Select: www.feediator.com
* Site Settings (gear icon)
	* Preferred domain: display URLs as www.feediator.com

### Crawl Settings

Select property

```
https://www.feediator.com
```

* Crawl (left menu)
	* Sitemaps
	* Add/test sitemap
		* `sitemap.xml`
	* press Submit

### Robots

Create `public/robots.txt`

```
User-agent: *
Sitemap: https://www.feediator.com/sitemap.xml
```

Open [Google Webmaster Tools](https://www.google.com/webmasters/tools/home)

Select your website.

If `robots.txt` is not listed, will need to convince Google to look for it.

Mid bottom

* provide path of `robots.txt`
* submit

Ask Google to look again.

Google will find `robots.txt`

# Google Gmail Configuration

[Basis for this section](/node/express-emails-gmail/)

This project uses settings from the above project.

## Heroku

The Gmail variables are loaded as Heroku Configuration variables.

## Non-Heroku

The application uses `.env`


# Facebook Application Authentication 

[Also see](/feediator/facebook-authentication/)

## Facebook Application Ids

Note that the `Facebook Appid` is tied to a unique URL. Thus, if the application is multiply deployed you will need an `appid` for each of your deployments.

Note that development is a unique URL and thus will also need an `appid`

## Required Facebook Application Ids

I need Facebook Application Ids for the following environments:

* development
* Heroku
* digital ocean

which have URLs of:

* http://localhost:8080
* https://{heroku-app}/
* https://www.feediator.com/

Facebook app names:

* `feediator.local`
* `feediator.heroku`
* `feediator.com`

## Create Facebook Application Ids

[Login to Facebook for Developers](https://developers.facebook.com/)

Select "My Apps" (see top right)

Add a New App

```
Display Name:
feediator.local

Contact Email:
jv@johnvincent.io
```

I have chosen a standard for display Name:

```
{application-name}.{environment}
```

Create App Id

which creates a new app and provides the App ID.

Facebook Login, Setup

* Web
	* Site URL: http://localhost:8080
		* save

Settings, Basic

* Category = News
	* Save

Facebook Login, Settings
* Valid OAuth redirect URIs
	* http://localhost:8080
	  * Save

Dashboard

Notice

```
This app is in development mode and can only be used by app admins, developers and testers
```

Click on the following question mark icon.

* Make public?
	* Change to Yes and confirm


Repeat the above steps for each environment.

## Configure Application for Facebook

* Choose `heroku.local`
* Dashboard
* Settings, Basic

Note Facebook app id and app secret

#### Add `Appid` to `.env`
 
Add to the `.env` file, or if Heroku, add to `Config Vars`, the following:

```
FACEBOOK_APP_ID={your-app-id}
FACEBOOK_APP_SECRET={your-app-secret}
```

Do this for each deployed environment.

# Google Application Authentication 

[Also see](/feediator/google-authentication/)


I need a client ID for the following environments:

* Development
* Heroku
* Digital Ocean

which have URLs of:

* http://localhost:8080
* https://{heroku-app}/
* https://www.feediator.com/

## Create Google Client Id

Go to [Google API Console](https://console.developers.google.com/projectselector/apis/library)

From Project Drop-down, create a new project.

```
feediator
```

In the sidebar under "API Manager"

* select Credentials
* then select the OAuth consent screen tab.
* Choose an Email Address
* specify a Product Name `feediator`
* press Save.

In the Credentials tab 

* select the New credentials drop-down list
* choose OAuth client ID.

Under Application type

* select Web application.

```
Note.
Register the origins from which your app is allowed to access the Google APIs, as follows. An origin is a unique combination of protocol, hostname, and port.
You can enter multiple origins to allow for your app to run on different protocols, domains, or subdomains. You cannot use wildcards. In the example below, the second URL could be a production URL.
http://localhost:8080
https://myproductionurl.example.com
```

In the Authorized JavaScript origins field

Name

```
Feediator Authentication
```

Authorized JavaScript origins

```
http://localhost:8080
https://{heroku-app}
https://www.feediator.com
```

The Authorized redirect URI field does not require a value. Redirect URIs are not used with JavaScript APIs.
Press the Create button.

From the resulting OAuth client dialog box, copy the Client ID . The Client ID lets your app access enabled Google APIs.

## Configure Application for Google

#### Add `Appid` to `.env`
 
Add to the `.env` file, or if Heroku, add to `Config Vars`, the following:

```
GOOGLE_APP_ID={your-app-id}
```

Do this for each deployed environment.


### Checks

Ensure css is compressed. Check package.json, ensure option used to compile Sass is sass-min

## Open Graph Protocol

[Open Graph](http://ogp.me/)

Choice of meta tags is based on this document.

## Meta Tags

These tags do change.

[Twitter Developer](https://dev.twitter.com/cards/markup)


```
<meta property="fb:app_id" content="{{ head.facebook_app_id }}">

<meta property="og:locale" content="en_US" />
<meta property="og:type" content="website" />
<meta property="og:title" content="{{ title }}"/>
<meta property="og:description" content="{{ head.description }}"/>

<meta property="og:url" content="{{ head.home_url }}">
<meta property="og:image" content="{{ head.home_url }}/assets/images/john-vincent.jpg">
<meta property="og:image:alt" content="{{ head.author }}">
<meta property="og:image:width" content="449" />
<meta property="og:image:height" content="449"  />

<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="{{ title }}"/>
<meta name="twitter:description" content="{{ head.description }}"/>
<meta name="twitter:site" content="@{{ head.twitter_username }}"/>
<meta name="twitter:image" content="{{ head.home_url }}/assets/images/john-vincent.jpg"/>
<meta name="twitter:creator" content="@{{ head.twitter_username }}"/>
```

### Facebook Meta Tags

```
<meta property="fb:app_id" content="{{ head.facebook_app_id }}">
```

This is the Facebook App Id. For details regarding obtaining a Facebook Id, see [Facebook Authentication](/feediator/facebook-authentication/)


### Facebook Tool

[Facebook checker](https://developers.facebook.com/tools/debug)

* Provide the site URL

Checks a bunch of meta tags.

### Twitter and Google Image

Note

```
<meta property="og:image" content="https://www.feediator.com/assets/images/john-vincent.jpg">

<meta name="twitter:image" content="https://www.feediator.com/assets/images/john-vincent.jpg"/>
```

Ensure that file exists and is accessible.


# Backup 

All those valuable server configuration files need to be backed up.

`website-config/{site}-config/backup-server`

```
#!/bin/sh
#
# script to get the valuables from feediator
#
echo "Script to get the valuables from feediator"
echo " "
#
REMOTE_SERVER="<your-ip>"
REMOTE_USER="jv"
REMOTE_HOME="/home/jv"
LOCAL_SAVED="feediator"
REMOTE_NGINX="/etc/nginx"
#
echo " "
echo "Remote Server: REMOTE_SERVER"
echo "Remote user: $REMOTE_USER"

echo " "
echo "Creating local directories"
echo " "
#
mkdir -p feediator/bin
mkdir -p feediator/cronjobs
mkdir -p feediator/SAVE_ENV
mkdir -p feediator/nginx

# also copy nginx files

#
echo "Copy .profile"
scp $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/.profile $LOCAL_SAVED/.
#
echo "Copy bin"
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/bin $LOCAL_SAVED/.
#
echo "Copy SAVE_ENV"
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/SAVE_ENV $LOCAL_SAVED/.
#
echo "Copy cronjobs"
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/cronjobs $LOCAL_SAVED/.
#
echo "Copy nginx.conf"
scp $REMOTE_USER@$REMOTE_SERVER:$REMOTE_NGINX/nginx.conf $LOCAL_SAVED/nginx/.
#
echo "Copy nginx"
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_NGINX/sites-available $LOCAL_SAVED/nginx/.
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_NGINX/snippets $LOCAL_SAVED/nginx/.
#
echo "Completed"
#
```

### Execute the script

```
cd website-config/{site}-config
./backup-server
```

### Backup

Copy to a private repository.
