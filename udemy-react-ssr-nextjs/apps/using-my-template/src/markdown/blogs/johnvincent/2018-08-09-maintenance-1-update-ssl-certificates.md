---
meta-title: "Update SSL Certificates | John Vincent"
meta-description: "John Vincent's discussion on Update SSL Certificates"
meta-keywords: "Update SSL Certificates"

title: "Update SSL Certificates"
subtitle: ""
lead: ""

category: [Ubuntu, Ssl, Johnvincent.io]
permalink: /johnvincent/update-ssl-certificates/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Update SSL Certificates

For details on creating the SSL certificates, please see 
[SSL Certificates - Let’s Encrypt & Nginx](/johnvincent/ssl-nginx/)

## Auto Renewal

This is great when it works. Sometimes there is trouble.

```
cd tmp
sudo letsencrypt renew
```

If it works, you are all done. Else, read on.

## Manual SSL Renewal

Switch to http

```
cd tmp
enable-http
```

Renew SSL certificates

```
encrypt-ssl
```

Switch to https

```
enable-https
```

## Test SSL Certificates

See "Test SSL Certificates" in
[Configure SSL Nginx at Digital Ocean](/johnvincent/configure-https-nginx/)

Notice the commands:

```
https://www.ssllabs.com/ssltest/analyze.html?d=
```

Execute all of those commands.
