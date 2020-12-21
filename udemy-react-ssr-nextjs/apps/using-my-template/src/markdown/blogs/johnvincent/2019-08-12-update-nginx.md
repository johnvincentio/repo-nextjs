---
meta-title: "johnvincent.io Restricting Access with HTTP Basic Authentication | John Vincent"
meta-description: "John Vincent's discussion on restricting Access with HTTP Basic Authentication to johnvincent.io"
meta-keywords: "Nginx, HTTP Basic Authentication, Digital Ocean"

title: "Restricting Access with HTTP Basic Authentication"
subtitle: "Configuring Nginx"
lead: ""

category: [Johnvincent.io, Nginx, Jekyll]
permalink: /johnvincent/nginx-restrict-access/
---

This document discusses configuring Nginx to restrict Access with HTTP Basic Authentication `www.johnvincent.io` website.

For extensive discussions regarding `www.johnvincent.io`, please see [Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Configuring Nginx to implement HTTP Basic Authentication 

The goal is to password protect certain folders and pages.

Excellent references

* [Restricting Access with HTTP Basic Authentication
](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)

* [How To Set Up Password Authentication with Nginx on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-14-04)

## Install Apache Utilities

```
sudo apt-get update
sudo apt-get install apache2-utils
```


## Create Password File

Add a username

```
cd
cd tmp
sudo htpasswd -c /etc/nginx/.htpasswd jv
```

Add encrypted password

```
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"
```

## Configuring Nginx

```
cd /etc/nginx/sites-available/https
sudo vi johnvincent.io
```

Add

```
location /interview {
    auth_basic           “Private Area”;
    auth_basic_user_file /etc/nginx/.htpasswd; 
}
```

## Restart Nginx

```
nginx-restart
```

## Remove from Site Map

Password protected pages need to be removed from the site map to prevent issues with Google Search. For details, see 
[Google Coverage Issues](/website/google-coverage-issues/)

# Problems

If get `401 Authorization Required` and no sign in form

* Try another browser
* Open Devtools and re-try

Even then, may be necessary to refresh and re-try.
