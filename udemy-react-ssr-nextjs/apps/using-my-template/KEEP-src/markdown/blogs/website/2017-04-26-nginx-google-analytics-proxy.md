---
meta-title: "Nginx Proxy Google Analytics | John Vincent"
meta-description: "Configure Nginx to proxy-pass Google Analytics"
meta-keywords: "Nginx, Google Analytics, page speed, proxy-pass"

title: "Nginx Proxy Google Analytics"
subtitle: "Improve Page Speed Score"
lead: "Leverage Browser Caching Warning on Nginx"

category: [Nginx, Google Analytics, Page Speed]
permalink: /website/nginx-proxy-google-analytics/
---

Page Speed flags browser caching of Google Analytics. The following is a way to address this.

I have seen this documented somewhere else, this is my implementation.

<!-- end -->

## Html

Replace:

```
https://www.google-analytics.com/analytics.js
```

with

```
https://johnvincent.io/analytics.js
```


## Nginx configuration

```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

.......

    location = /analytics.js {
        proxy_pass https://www.google-analytics.com;
        expires 31536000s;
        proxy_set_header Pragma "public";
        proxy_set_header Cache-Control "max-age=31536000, public";
    }
```

## Restart Nginx

```
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx
```
