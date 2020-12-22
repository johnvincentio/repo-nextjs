---
meta-title: "Maintaining Ubuntu Droplet | John Vincent"
meta-description: "John Vincent's discussion on Maintaining Ubuntu Droplet"
meta-keywords: "Maintaining Ubuntu Droplet"

title: "Maintaining Ubuntu Droplet"
subtitle: ""
lead: ""

category: [Digital Ocean, Ubuntu, Johnvincent.io]
permalink: /johnvincent/maintaining-droplet/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Maintaining Ubuntu Droplet

## Webmaster Tools


[Login to Webmaster Tools](https://www.google.com/webmasters/tools)

and review crawl statistics

## Update Ubuntu

```
sudo apt-get update
```

did not retrieve any updates, just gets package information.

```
sudo apt-get dist-upgrade

older dist:
sudo apt-get upgrade
```

```
continue?
Y
```

```
A new version of /boot/grub/menu.lst is available, but the version installed currently has been locally modified.

Keep the local version currently installed.
```

Then restart the droplet

## Restart the droplet

```
sudo reboot
```

## Shutdown / Restart Droplet

Login to digitalocean.com

Select droplet

Console:

login as root

```
shutdown -h now
```

This will shut down your operating system, flush any pending changes to the disk, and then terminate power to your server.

Visit the control panel and select the option to power on your Droplet.

Verify droplet is not running

* Dashboard
* Access
* Launch Console
* Verify droplet is not running.

To start the droplet

* Dashboard
* Power
* Power cycle

Verify droplet is running

* Access
* Launch Console
* Login to verify droplet is running.

## Renew SSL Certificates

See [Update SSL Certificates to Ubuntu at Digital Ocean](/johnvincent/update-ssl-certificates/)

### Nginx

```
Restart Nginx
sudo nginx -t
sudo systemctl restart nginx

Stop Nginx
sudo systemctl stop nginx

Troubleshooting
nginx:
ps -ef | grep nginx
sudo nginx -t
sudo systemctl restart nginx

nginx enabled servers:
cd /etc/nginx/sites-enabled
ls -la
verify running valid server blocks.

nginx logs:
cd /var/log/nginx
vi *.log
```

### PM2

```
pm2 restart all
pm2 list
pm2 monit
```

### swap

```
sudo swapon --summary
free -h
```
