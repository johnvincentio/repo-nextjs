---
meta-title: "Deploy TaskMuncher React App to Digital Ocean | John Vincent"
meta-description: "John Vincent's discussion on Deploy TaskMuncher React App to Digital Ocean"
meta-keywords: "TaskMuncher, React, Digital Ocean"

title: "First time deploy TaskMuncher React App to Digital Ocean"
subtitle: ""
lead: ""

category: [React, Taskmuncher, Pm2]
permalink: /taskmuncher/deploy/taskmuncher/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Deploy TaskMuncher

This is an involved and varied process.

## Before deployment

On Mac, remove quarantine from all files going to the website.

```
cd /Users/jv/Desktop/MyDevelopment/github/....
```

Look for files with `com.apple.quarantine`

```
xattr -r -l taskmuncher-client | grep -i com.apple.quarantine
xattr -r -l taskmuncher-server | grep -i com.apple.quarantine
```

To remove quarantine:

```
xattr -r -d com.apple.quarantine taskmuncher-client
xattr -r -d com.apple.quarantine taskmuncher-server
```

### Create `.env` files

Create application `.env` files in

```
cd websites-config/taskmuncher-config/taskmuncher/save-env
```

Recommended to use:

* `client.env` for React applications
* `server.env` for Node applications

Copy your `.env` settings to these files.

## Create Deployment Script

```
cd websites-config/taskmuncher-config/taskmuncher/bin
```

Create script `deploy-apps`

```
#!/bin/sh
#
#  script to get, build and deploy apps to nginx 
#
# setup ssh to github
#
echo "setup ssh to github"
eval "$(ssh-agent)"
ssh-add -k ~/.ssh/id_github
#
cd
cd tmp
#
echo "Removing Logfile"
rm /home/jv/tmp/logfile.txt
#
CLONES_DIR="/home/jv/clones"
DOCROOT_DIR="/var/www/taskmuncher/html"
SERVER_ROOT_DIR="/var/www/taskmuncher/server"
SAVE_ENV_DIR="/home/jv/save-env"
#
echo "Creating $DOCROOT_DIR"
sudo mkdir -p $DOCROOT_DIR

echo "Setting permissions on $DOCROOT_DIR"
sudo chown -R jv:jv $DOCROOT_DIR
sudo chmod 0755 $DOCROOT_DIR
#
echo "Creating $SERVER_ROOT_DIR"
sudo mkdir -p $SERVER_ROOT_DIR

echo "Setting permissions on $SERVER_ROOT_DIR"
sudo chown -R jv:jv $SERVER_ROOT_DIR
sudo chmod 0755 $SERVER_ROOT_DIR
#
echo "Removing clones directory"
rm -rf $CLONES_DIR
#
echo "Creating clones directory"
mkdir $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories"
git clone git@github.com:<yourid>/taskmuncher-client $CLONES_DIR/client
git clone git@github.com:<yourid>/taskmuncher-server $CLONES_DIR/server

#
# copy .env file
#
echo "Copy .env file to cloned client directory"
cp -r $SAVE_ENV_DIR/client.env $CLONES_DIR/client/.env
#
# work in the client clones directory
#
echo "Move to the cloned client directory"
cd $CLONES_DIR/client
#
# install node modules
#
echo "Install node modules"
npm install
#
# run production build
#
echo "Run production build"
npm run production


#
# copy .env file
#
echo "Copy .env file to cloned server directory"
cp -r $SAVE_ENV_DIR/server.env $CLONES_DIR/server/.env
#
# work in the server clones directory
#
echo "Move to the cloned server directory"
cd $CLONES_DIR/server
#
# install node modules
#
echo "Install node modules"
npm install


#
# Delete files in nginx docroot
#
echo "Delete files in Nginx Docroot $DOCROOT_DIR"
rm -rf $DOCROOT_DIR/*

#
# Delete files in nginx server-root
#
echo "Delete files in Nginx server root $SERVER_ROOT_DIR"
rm -rf $SERVER_ROOT_DIR/*


#
# Copy client files to nginx
#
echo "Copy client files to $DOCROOT_DIR"
cp -r $CLONES_DIR/client/dist/* $DOCROOT_DIR

#
# set permissions
#
echo "Setting permissions on $DOCROOT_DIR"
sudo chown -R jv:jv $DOCROOT_DIR
find $DOCROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $DOCROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files


#
# Copy server files to nginx
#
echo "Copy server files to Nginx $SERVER_ROOT_DIR"
cp -r $CLONES_DIR/server/* $SERVER_ROOT_DIR
cp -r $CLONES_DIR/server/.env $SERVER_ROOT_DIR

#
# set permissions
#
echo "Setting permissions on $SERVER_ROOT_DIR"
sudo chown -R jv:jv $SERVER_ROOT_DIR
find $SERVER_ROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $SERVER_ROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files
#

echo "Handle PM2"
cd $SERVER_ROOT_DIR
handle-pm2
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

Ensure

```
chmod 744 deploy-apps
```

## Create PM2 script

```
cd websites-config/taskmuncher-config/taskmuncher/bin
```

Create file `handle-pm2`

```
#!/bin/bash
#
# script to add task to pm2 if not already added, or to restart
# the task if it has already been added.
#
echo "Current PM2 status"
pm2 list
#
echo "Check status of task"
pm2 describe server > /dev/null
RUNNING=$? 
if [ "${RUNNING}" -ne 0 ]; then
  echo "Adding task to PM2"
  cd /var/www/taskmuncher/server
  pm2 start server.js
else
  echo "Restarting task"
  pm2 restart server
fi;

#
echo "Show current pm2 status"
pm2 list

echo "Restarting PM2"
pm2 restart all
```

Ensure

```
chmod 744 handle-pm2
```

## Create Nginx Restart Script

```
cd websites-config/taskmuncher-config/taskmuncher/bin
```

Create file `nginx-restart`

```
#!/bin/bash
#
# script to restart nginx
#
echo "Restarting Nginx"
sudo nginx -t
sudo systemctl restart nginx
```

Ensure

```
chmod 744 nginx-restart
```

## Create Mongo Status Script

```
cd websites-config/taskmuncher-config/taskmuncher/bin
```

Create file 'mongo-status'

```
#!/bin/bash
#
# script to show mongo status
#
echo "Mongo Status"
sudo systemctl status mongodb
```

Ensure

```
chmod 744 mongo-status
```

## Create First Deployment script

```
cd websites-config/taskmuncher-config/taskmuncher
```

Create file 'first-deploy'

```
#!/bin/sh
#
#  script to setup the user environment
#
# setup ssh to github
#
echo "setup ssh to github"
eval "$(ssh-agent)"
ssh-add -k ~/.ssh/id_github
#
CLONES_DIR="/home/jv/clones"
SITE_DIR=$CLONES_DIR/mac/websites-config/taskmuncher-config/taskmuncher
#
echo "Clean"
rm -rf bin clones cronjobs save-env tmp
#
echo "Make directories"
mkdir -p bin
mkdir -p clones
mkdir -p cronjobs
mkdir -p save-env
mkdir -p tmp
#

echo "Git clone repo_shell_scripts to $CLONES_DIR"
git clone git@github.com:<your id>/<your repo> $CLONES_DIR

#
echo "Copy .profile"
cp -r $SITE_DIR/.profile ~/.profile

#
echo "Copy README.md"
cp -r $SITE_DIR/README.md ~/README.md

#
echo "Copy .vimrc"
cp -r $SITE_DIR/.vimrc ~/.vimrc

#
echo "Copy bin directory"
cp -r $SITE_DIR/bin ~

#
echo "Copy save-env directory"
cp -r $SITE_DIR/save-env ~

echo "Delete $CLONES_DIR"
# rm -rf $CLONES_DIR

echo "Completed"
```

Ensure

```
chmod 744 first-deploy
```

## Execute First Deployment

Copy first-deploy to the root of your droplet user.

Login to your droplet

```
ssh-to-taskmuncher
```

and execute the script

```
./first-deploy
```

# Perform Deployment

Login to your droplet

```
ssh-to-taskmuncher
```

and execute the script

```
./deploy-apps
```

## Other Tasks

There are usually other tasks that need to be performed.

### Mongo

May need to run mongo scripts, for example

```
cd /var/www/taskmuncher/server/scripts
mongo localhost:27017/taskmuncher all-data.js
```

Check database

```
cd /var/www/taskmuncher/server/scripts
mongo localhost:27017/taskmuncher list-data.js
```

### Cron Job

May need a cron job, for example

```
crontab -e

0 * * * *  /home/jv/cronjobs/update-feeds
```

```
crontab -l
```

### PM2

May need to have PM2 start a task. If so, it will look like this

```
cd /var/www/myapp/html
pm2 start server.js
```
