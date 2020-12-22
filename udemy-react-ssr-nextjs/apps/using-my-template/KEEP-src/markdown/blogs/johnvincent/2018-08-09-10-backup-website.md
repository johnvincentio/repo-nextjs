---
meta-title: "Backup Website from Digital Ocean | John Vincent"
meta-description: "John Vincent's discussion on Backup Website from Digital Ocean"
meta-keywords: "johnvincentio, Backup, Digital Ocean"

title: "Backup Website from Digital Ocean"
subtitle: ""
lead: ""

category: [Johnvincent.io]
permalink: /johnvincent/backup-website/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Backup

Just in case...

## Preparation

I prefer to store configuration and scripts outside of the droplet and copy them to the droplet. Thus, if I need to replace the droplet or to build another droplet, I already have the essential files with which I can quickly build that droplet.

Build the basics.

```
cd websites-config
mkdir websites-config
cd websites-config
mkdir websites

cd websites
mkdir bin nginx save-env ssh
```

## Backup Script

```
cd websites-config/websites-config
```

Create backup-server

```
#!/bin/sh
#
# script to get the valuables from website
#
echo "Script to get the valuables from website"
echo " "
#
REMOTE_SERVER="website"
REMOTE_USER="jv"
REMOTE_HOME="/home/jv"
LOCAL_SAVED="/Users/jv/tmp/backup/website"
REMOTE_NGINX="/etc/nginx"
#
echo " "
echo "Remote Server: $REMOTE_SERVER"
echo "Remote user: $REMOTE_USER"

echo " "
echo "Creating local directories"
echo "LOCAL_SAVED: $LOCAL_SAVED"
echo " "
#
mkdir -p $LOCAL_SAVED/bin
mkdir -p $LOCAL_SAVED/cronjobs
mkdir -p $LOCAL_SAVED/save-env
mkdir -p $LOCAL_SAVED/nginx

#
echo "Copy ssh files"
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/.ssh $LOCAL_SAVED/ssh
#
echo "Copy .profile"
scp $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/.profile $LOCAL_SAVED/.
#
echo "Copy .vimrc"
scp $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/.vimrc $LOCAL_SAVED/.
#
echo "Copy first-deploy"
scp $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/first-deploy $LOCAL_SAVED/.
#
echo "Copy bin"
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/bin $LOCAL_SAVED/.
#
echo "Copy save-env"
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_HOME/save-env $LOCAL_SAVED/.
#
echo "Copy nginx.conf"
scp $REMOTE_USER@$REMOTE_SERVER:$REMOTE_NGINX/nginx.conf $LOCAL_SAVED/nginx/.
#
echo "Copy nginx"
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_NGINX/sites-available $LOCAL_SAVED/nginx/.
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_NGINX/snippets $LOCAL_SAVED/nginx/.
#
echo "Copy h5bp"
scp -r $REMOTE_USER@$REMOTE_SERVER:$REMOTE_NGINX/h5bp $LOCAL_SAVED/nginx/.

#
echo "Completed"
```

## Execute Backup Script

```
cd websites-config/websites-config
./ backup-server
```

Files will be copied from the droplet to

```
/Users/jv/tmp/backup/website
```

