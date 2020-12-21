---
meta-title: "Deploy to Droplet | John Vincent"
meta-description: "John Vincent's discussion on Deploy to Droplet"
meta-keywords: "Deploy to Droplet"

title: "Deploy to Droplet"
subtitle: ""
lead: ""

category: [Digital Ocean, Johnvincent.io]
permalink: /johnvincent/deploy-to-droplet/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Deploy to Droplet

Install HTML-Minifier

```
sudo npm install html-minifier -g
```

## Before deployment

On Mac, remove quarantine from all files going to the website.

```
cd /Users/jv/Desktop/MyDevelopment
```

Look for files with `com.apple.quarantine`

```
xattr -r -l  github/website/gatsby-website | grep -i com.apple.quarantine
xattr -r -l  github/website/demosite | grep -i com.apple.quarantine

xattr -r -l  github/projects/music-player | grep -i com.apple.quarantine
xattr -r -l  github/projects/github-app | grep -i com.apple.quarantine

xattr -r -l  github/website/omnifood | grep -i com.apple.quarantine
xattr -r -l  github/website/internet-resources | grep -i com.apple.quarantine

xattr -r -l  github/website/rijksmuseum | grep -i com.apple.quarantine
xattr -r -l  github/website/peg-solitaire | grep -i com.apple.quarantine
xattr -r -l  github/repo-images | grep -i com.apple.quarantine
```

To remove quarantine:

```
xattr -r -d com.apple.quarantine github/website/gatsby-website
xattr -r -d com.apple.quarantine github/website/demosite

xattr -r -d com.apple.quarantine github/projects/music-player
xattr -r -d com.apple.quarantine github/projects/github-app

xattr -r -d com.apple.quarantine github/website/omnifood
xattr -r -d com.apple.quarantine github/website/internet-resources

xattr -r -d  github/website/rijksmuseum | grep -i com.apple.quarantine
xattr -r -d  github/website/peg-solitaire | grep -i com.apple.quarantine
xattr -r -d  github/repo-images | grep -i com.apple.quarantine
```

### Create `.env` files

Create application `.env` files in

```
cd websites-config/websites-config/websites/save-env
```

Recommended to use:

* `client.env` for React applications
* `server.env` for Node applications

Copy your `.env` settings to these files.

## Create Deployment Script

```
cd websites-config/websites-config/websites/bin
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
CLONES_DIR="/home/jv/clones"
DOCROOT_DIR="/var/www/johnvincent.io/html"
#
echo "Removing clones directory $CLONES_DIR"
rm -rf $CLONES_DIR
#
echo "Creating clones directory $CLONES_DIR"
mkdir $CLONES_DIR
cd $CLONES_DIR
#
echo "Forcing sudo access"
sudo chmod 0755 $DOCROOT_DIR
#
echo "Git clone desired repositories to $CLONES_DIR"
git clone git@github.com:johnvincentio/gatsby-website $CLONES_DIR/gatsby-website

#
# Build Gatsby app
#
echo "Make the Gatsby app"
cd $CLONES_DIR/gatsby-website
#
echo "Npm install the Gatsby app $CLONES_DIR/gatsby-website"
npm install
#
echo "Make Gatsby app production"
npm run build
#
echo "Minify $CLONES_DIR/gatsby-website/public/index.html"
cp public/index.html public/index.work
html-minifier public/index.work --remove-comments --output public/index.html
rm public/index.work

#
# Delete files in nginx docroot
#
echo "Delete files in Nginx Docroot"
rm -rf $DOCROOT_DIR/*
#
# Copy files to nginx docroot
#
echo "Copy files to Nginx Docroot"
cp -r /home/jv/clones/gatsby-website/public/*  $DOCROOT_DIR

#
# set permissions
#
echo "Setting permissions on $DOCROOT_DIR"
sudo chown -R jv:jv $DOCROOT_DIR
sudo chmod 0755 $DOCROOT_DIR
find $DOCROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $DOCROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files

echo "Restarting Nginx"
nginx-restart

#
echo "Completed"
```

Ensure

```
chmod 744 deploy-apps
```

## Create Application Deployment Script

For each application, make a deployment script, for example

```
cd websites-config/websites-config/websites/bin
```

Create script `deploy-rijksmuseum-apps`

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
CLONES_DIR="/home/jv/clones"
DOCROOT_DIR="/var/www/rijksmuseum/html"
#
echo "Removing clones directory $CLONES_DIR"
rm -rf $CLONES_DIR
#
echo "Creating clones directory $CLONES_DIR"
mkdir $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories to $CLONES_DIR"
git clone git@github.com:johnvincentio/rijksmuseum $CLONES_DIR/rijksmuseum
#
# Delete files in nginx docroot
#
echo "Delete files in Nginx Docroot"
rm -rf $DOCROOT_DIR/*
#
# Copy files to nginx docroot
#
echo "Copy files to Nginx Docroot"
cp -r /home/jv/clones/rijksmuseum/collection/* $DOCROOT_DIR
#
# set permissions
#
echo "Setting permissions on $DOCROOT_DIR"
sudo chown -R jv:jv $DOCROOT_DIR
sudo chmod 0755 $DOCROOT_DIR
find $DOCROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $DOCROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files

echo "Restarting Nginx"
nginx-restart

#
echo "Completed"
```

Ensure

```
chmod 744 deploy-rijksmuseum-apps
```

## Create Nginx Restart Script

```
cd websites-config/websites-config/websites/bin
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
cd websites-config/websites-config/websites/bin
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
cd websites-config/websites-config/websites
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
SITE_DIR=$CLONES_DIR/mac/websites-config/websites-config/websites
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
ssh-to-website
```

and execute the script

```
./first-deploy
```

# Perform Deployment

Login to your droplet

```
ssh-to-website
```

and execute the script

```
./deploy-apps
```

Execute other deployment scripts

```
./deploy-music-app
./deploy-mygithub-app
./deploy-jekyll-app

./deploy-rijksmuseum-app
./deploy-internet-resources-app
./deploy-peg-solitaire-app
./deploy-omnifood-app
```

## Other Tasks

There are usually other tasks that need to be performed.

### PM2

May need to have PM2 start a task. If so, it will look like this

```
cd /var/www/myapp/html
pm2 start server.js
```
