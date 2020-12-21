---
meta-title: "Install PM2 | John Vincent"
meta-description: "John Vincent's discussion on PM2 Overview"
meta-keywords: "PM2"

title: "PM2 Overview"
subtitle: ""
lead: ""

category: [Pm2]
permalink: /website/pm2-overview/
---

This is a brief overview of PM2

<!-- end -->

[Useful reference](http://pm2.keymetrics.io/docs/usage/startup/)

# Install PM2

Use PM2, a production process manager for Node applications with a built-in load balancer.

Install PM2

```
sudo npm install pm2 -g
```

and verify

```
pm2 -v
```

## Useful PM2 commands

```
pm2 list

pm2 logs

pm2 stop <process-id>
or:
pm2 stop all

pm2 restart <process-id>
or:
pm2 restart all

pm2 delete <process-id>

pm2 describe <process-id>

pm2 logs APP-NAME

pm2 flush

pm2 reloadLogs

pm2 restart app_name
pm2 reload app_name
pm2 stop app_name
pm2 delete app_name

pm2 monit

pm2 plus
```

PM2 Logs

```
~/.pm2/logs
```

## Add to PM2

`handle-pm2` and verify with `pm2 list`

Ensure the list is correct.

## Start PM2 on System Startup

PM2 will restart processes if they crash but cannot start itself.

Thus, need to start PM2 on system boot.



To get the automatically-configured startup script:

```
pm2 startup
```

```
[PM2] Init System found: systemd
[PM2] You have to run this command as root. Execute the following command:
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u jv --hp /home/jv
```

Run

```
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u jv --hp /home/jv
```

ensure the list is correct

```
pm2 list
```

Freeze a process list on reboot

```
pm2 save
```

which saves in `/home/jv/.pm2/dump.pm2`

### If you need to remove init script

```
pm2 unstartup systemd
```

## Check status of `systemd` unit:

The services are in `/etc/systemd/system`

```
systemctl status pm2-{user}
```

thus

```
systemctl status pm2-jv
```

If may be necessary to restart Ubuntu to ensure changes are reflected.

## Logs

The logs can get quite large

```
/home/jv/.pm2/logs
```

Suggest

```
rm /home/jv/.pm2/logs
handle-pm2
```

## Check if Running

```
systemctl status pm2-jv
pm2 list
```
