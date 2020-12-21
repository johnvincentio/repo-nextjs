---
meta-title: "Update SSL Certificates | John Vincent"
meta-description: "John Vincent's discussion on Update SSL Certificates"
meta-keywords: "Update SSL Certificates"

title: "Update SSL Certificates"
subtitle: ""
lead: ""

category: [Taskmuncher, Ubuntu, Ssl]
permalink: /taskmuncher/deploy/update-ssl-certificates/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Update SSL Certificates

For details on creating the SSL certificates, please see 
[SSL Certificates - Let’s Encrypt & Nginx](/taskmuncher/deploy/ssl-nginx/)

## Auto Renewal

This is great when it works. However, usually there is trouble.

```
cd tmp
encrypt-ssl
```

If it works, you are all done. Else, read on.

## Use Nginx with HTTP only

```
cd tmp
enable-http
```

### Use letsencrypt

```
cd tmp
encrypt-ssl
```

### Use Nginx with HTTPs only

```
cd tmp
enable-https
```

## Test SSL Certificates

Ensure all scores are A+

```
https://www.ssllabs.com/ssltest/analyze.html?d=taskmuncher.com
```
