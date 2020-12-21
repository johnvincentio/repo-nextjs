---
meta-title: "Maintaining Ubuntu Droplet | John Vincent"
meta-description: "John Vincent's discussion on Maintaining Ubuntu Droplet"
meta-keywords: "Maintaining Ubuntu Droplet"

title: "Maintaining Ubuntu Droplet"
subtitle: ""
lead: ""

category: [Taskmuncher, Digital Ocean, Ubuntu]
permalink: /taskmuncher/deploy/maintaining-droplet/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Maintaining Ubuntu Droplet

## Update Npm

```
sudo npm install -g npm
```

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

Login to `digitalocean.com`

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

See [Update SSL Certificates to Ubuntu at Digital Ocean](/taskmuncher/deploy/update-ssl-certificates/)

## Nginx

Restart Nginx

```
nginx-restart
```

or

```
sudo nginx -t
sudo systemctl restart nginx
```

Stop Nginx

```
sudo nginx -t
sudo systemctl stop nginx
```

### Troubleshooting

Verify running

```
ps -ef | grep nginx
```

Check Nginx enabled servers

```
cd /etc/nginx/sites-enabled
ls -la
```

Enable https

```
enable-https
```

Enable http

```
enable-http
```

## PM2

To restart PM2

```
pm2 restart all
```

To setup PM2 for the application

```
handle-pm2
```

Status

```
pm2 list
```

and then `pm2 show {id}`, which provides details about the task. Notice the logs

### PM2 Logs

Check the logs

```
/home/jv/.pm2/logs/*
/home/jv/.pm2/pm2.log
```

### PM2 Other

```
pm2 monit
```

## swap

```
sudo swapon --summary
free -h
```

## Logs

Nginx logs `/var/log/nginx`

Check for bots

```
sudo vi /var/log/access.log
```

and

```
sudo vi /var/log/error.log
```

can sometimes have messages of some interest.

## Firewall

May need to change the firewall

```
sudo ufw deny from XXX.XXX.XX.XX
```

List Rules

```
sudo ufw status numbered
```

