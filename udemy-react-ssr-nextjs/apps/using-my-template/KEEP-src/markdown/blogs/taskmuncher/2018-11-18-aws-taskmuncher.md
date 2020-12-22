---
meta-title: "Deploy TaskMuncher React App to AWS | John Vincent"
meta-description: "John Vincent's discussion on Deploy TaskMuncher React App to AWS"
meta-keywords: "TaskMuncher, React, AWS"

title: "Deploy TaskMuncher React App to AWS"
subtitle: ""
lead: ""

category: [React, Taskmuncher, Aws]
permalink: /taskmuncher/aws/taskmuncher/
---

This is part of a series of discussions regarding Deploying TaskMuncher.

<!-- end -->

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

[Amazon Web Services](https://aws.amazon.com)

# Deploy TaskMuncher to AWS

Use domain `https://johnvincentio.com` for the exercise.

Thus, Nginx server name is johnvincentio

# Create EC2 Instance

* Login to [AWS](https://aws.amazon.com)
* Go to [AWS Dashboard](https://console.aws.amazon.com/)
* Services
* EC2
* Instances (left nav)
* Launch Instance (button)

Step 1: Image type

* Ubuntu Server 16.04 LTS (HVM), SSD Volumn Type, 64-bit (x86). Ensure is Free Tier eligible.

Step 2: Instance Type

* General Purpose, t2.micro, Free Tier eligible, 1 cpu, 1 Gb Memory
	* Next>

Step 3: Configure Instance Details

* Next>

Step 4: Add Storage

* Next>

Step 5: Add Tags

* Next>

Step 6: Configure Security Group

Assign a security group

* Create a new security group

Ensure already has SSH.

Add, without changing values:

* HTTP
* HTTPS

* Review and Launch>

Step 7: Review Instance Launch

* Launch>

Select an existing key pair or create a new key pair

* Create a new key pair
* Key Pair Name: taskmuncher 
	* Download Key Pair

If select an existing key pair, ensure you have the correct `taskmuncher.pem` file.

Note the public DNS and public IP.

The instance is launched and will be available when the instance state is `running`

## Configure SSH

Copy `taskmuncher.pem` to `~/.ssh`

```
cd 
cd .ssh
```

List Extended Attributes

```
xattr taskmuncher.pem
```

which provides a list of extended attributes.

To remove attributes

```
xattr -d extended-attribute file
```

for example

```
xattr -d com.apple.metadata:kMDItemWhereFroms taskmuncher.pem
xattr -d com.apple.quarantine taskmuncher.pem
```

Set security

```
chmod 400 taskmuncher.pem
```

### Test SSH

This step is required even if you already have a `taskmuncher.pem` file as the only user that exists at this point is `ubuntu`.

```
ssh -vvv -o IdentitiesOnly=yes -i /Users/jv/.ssh/taskmuncher.pem ubuntu@ec2-18-220-92-91.us-east-2.compute.amazonaws.com
```

Note that user for Ubuntu volume is `ubuntu`

This should connect.

If get

```
The authenticity of host '13.59.236.131 (13.59.236.131)' can't be established.
ECDSA key fingerprint is SHA256:uc+xtpZbAyLmHe14Om00Y3aI4Sug08ZmleKX0je84co.
Are you sure you want to continue connecting (yes/no)?
```

reply `yes`

## Basic Ubuntu user configuration

* Add user `jv`
	* `sudo adduser {remote-user}`
	* `{password}`

* Root privileges
	* `sudo usermod -aG sudo {remote-user}`

Create bin directory

```
su - {remote-user}
cd
mkdir bin .ssh
```

Add bin to PATH and add aliases

```
su - {remote-user}
vi .profile

add

PATH="$HOME/bin:$HOME/.local/bin:$PATH"

lf() { ls -FaC $*; }
```

Copy authorized keys

```
sudo cp /home/ubuntu/.ssh/authorized_keys /home/jv/.ssh/authorized_keys

sudo -s
cd /home/jv/.ssh
chown jv:jv authorized_keys
```

## Basic root configuration

Add aliases to root

```
sudo -s
vi /etc/bash.bashrc

add
lf() { ls -FaC $*; }
```



### SSH Config File

On local, add to `~/.ssh/config`

```
##
## taskmuncher droplet at AWS
##
Host awstaskmuncher
    UseKeychain yes
    AddKeysToAgent yes
    HostName ec2-18-220-92-91.us-east-2.compute.amazonaws.com
    User jv
    IdentityFile ~/.ssh/taskmuncher.pem
```

Add to `~/.ssh/add_all`

```
ssh-add -K taskmuncher.pem
```

### Add to Keychain

On local, list keys

```
ssh-add -l
```

May be best to delete all keys

```
ssh-add -D
```

and then add keys

```
./add_all
```

### Make SSH Script

On local, create

`~/bin/ssh-to-aws-taskmuncher`

```
#!/bin/sh
#
# script to ssh into the AWS taskmuncher
#
echo "Script to ssh into the AWS taskmuncher"
echo " "
#
REMOTE_SERVER="awstaskmuncher"
echo " "
echo "Remote Server: $REMOTE_SERVER"
#
ssh "$REMOTE_SERVER"
#
echo " "
echo "Completed"
```

### Test SSH script

```
ssh-to-aws-taskmuncher
```

### Backup

Always backup SSH keys.

## Update Ubuntu Server

```
sudo apt-get update
```

did not retrieve any updates, just gets package information.

```
sudo apt-get dist-upgrade
continue?
Y

A new version of /boot/grub/menu.lst is available, but the version installed currently has been locally modified.

Keep the local version currently installed.
```

```
sudo reboot
```

or

Select Instance from From AWS Dashboard

* Actions, Instance State, Reboot

## Firewall

Setup a firewall using [Set Up a Basic Firewall](/taskmuncher/deploy/create-ubuntu-droplet/)

## Swap

Add only 2Gb of swap as disk space is very low.

Add Swap using [Add Swap](/taskmuncher/deploy/create-ubuntu-droplet/)

## Install Basics

Install Basics using [Install Basics](/taskmuncher/deploy/create-ubuntu-droplet/)

### Install Node and Npm

Install Node and Npm using [Install Node and Npm](/taskmuncher/deploy/create-ubuntu-droplet/)

### Install PM2

Install PM2 using [Install PM2](/taskmuncher/deploy/create-ubuntu-droplet/)

### Install HTML-Minifier

Install HTML-Minifier using [Install HTML-Minifier](/taskmuncher/deploy/create-ubuntu-droplet/)


## Install Mongo Ubuntu

Install Mongo Ubuntu using [Install Mongo Ubuntu](/taskmuncher/deploy/install-ubuntu-mongo/)

## Install Ubuntu Nginx

```
cd
sudo chown jv:jv .config
```

Install Ubuntu Nginx using [Install Ubuntu Nginx](/taskmuncher/deploy/install-ubuntu-nginx/)

## Configuring Google Domains

Use domain: johnvincentio.com

From EC2 dashboard, instance ip: 18.220.92.91

Configuring Google Domains using [Configuring Google Domains](/taskmuncher/deploy/configuring-domains/)

# Copy Configuration to Remote

From local

```
copy-taskmuncher-to-aws
```

## Ssh

On remote

```
cd
mkdir tmp
```

```
cp TODO/ssh/id_github /home/jv/.ssh
```

Create file `./ssh/add_all`

```
ssh-add -k id_github
```

Add keys, start agent

```
eval "$(ssh-agent)"
```

Run the script

```
add_all
```

## Copy h5bp

```
sudo cp -r /home/jv/TODO/nginx/h5bp /etc/nginx
sudo cp /home/jv/TODO/nginx/nginx.conf /etc/nginx
```

## Configure HTTP Nginx

Configure HTTP Nginx using [Configure HTTP Nginx](/taskmuncher/deploy/configure-http-nginx/)

* User: jv
* Group: jv
* Server: johnvincentio.com www.johnvincentio.com
* Nginx web server: /var/www/johnvincentio

## Create SSL Certificates

Create SSL Certificates using [Create SSL Certificates](/taskmuncher/deploy/ssl-nginx/)

```
sudo letsencrypt certonly -a webroot --webroot-path=/var/www/johnvincentio/html -d johnvincentio.com -d www.johnvincentio.com
```

```
sudo vi /etc/nginx/snippets/ssl-johnvincentio.com.conf

add:

ssl_certificate /etc/letsencrypt/live/johnvincentio.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/johnvincentio.com/privkey.pem;
```

## Configure HTTPS Nginx

```
sudo vi /etc/nginx/sites-available/https/johnvincentio
```

Configure HTTPS Nginx using [Configure HTTPS Nginx](/taskmuncher/deploy/configure-https-nginx/)

## First time deploy TaskMuncher React App to AWS

First time deploy TaskMuncher React App to AWS using [First time deploy TaskMuncher React App to Digital Ocean](/taskmuncher/deploy/taskmuncher/)

## Mongo

Run mongo scripts, for example

```
cd /var/www/johnvincentio/server/scripts
mongo localhost:27017/taskmuncher all-data.js
```

Check database

```
cd /var/www/johnvincentio/server/scripts
mongo localhost:27017/taskmuncher list-data.js
```

## .env files

`server.env`

```
HOME_URL=https://www.johnvincentio.com
```

## Finally

Test

```
https://www.johnvincentio.com
https://johnvincentio.com
```

Ensure login is working and data is accessible.

## Production Issues

Some production problems with resolutions

### Clean up

Taskmuncher Server log file

```
cd
cd tmp
rm logfile.txt
```

Building materials

```
cd
rm -rf TODO
rm -rf clones
```

`df -k` when system first built

```
Filesystem     1K-blocks    Used Available Use% Mounted on
udev              499284       0    499284   0% /dev
tmpfs             101440    7256     94184   8% /run
/dev/xvda1       8065444 4548212   3500848  57% /
tmpfs             507188       0    507188   0% /dev/shm
tmpfs               5120       0      5120   0% /run/lock
tmpfs             507188       0    507188   0% /sys/fs/cgroup
/dev/loop0         18432   18432         0 100% /snap/amazon-ssm-agent/1455
/dev/loop1         90624   90624         0 100% /snap/core/7270
/dev/loop2         91264   91264         0 100% /snap/core/7713
/dev/loop3         18432   18432         0 100% /snap/amazon-ssm-agent/1335
tmpfs             101440       0    101440   0% /run/user/1001
```

### Disk Full

`df -h` shows `/dev/xvda1` is full.

#### Large directories

Look for large directories, then drill down to find the culprits.

```
sudo du -x / | sort -n | tail -40
```

`/home/jv/clones` is over 600M

#### Large files

Look for troublesome files

```
sudo find / -type f -size +5M -exec ls -lh {} \;

or

find / -type -f -size +1M
```

Look for huge files

```
sudo find / -type f -printf '%12s %p\n' 2>/dev/null|awk '{if($1>999999999)print $0;}'
```

will show some basic culprits.

```
/var/lib/mongodb/diagnostic.data/metrics.
```

#### Log Files

```
sudo du -s /var/log/* | sort -n
```

Log files `/var/log`, and tmp `/tmp` are probably safe to delete, most of them. If do so, find processes with delete files

```
lsof | grep deleted
```

then reboot.


#### Remove Unused files

```
sudo apt-get update
sudo apt autoremove
```

This may happen a number of times

```
A new version of /boot/grub/menu.lst is available, but the current version installed currently has been locally modified

What would you like to do about menu.lst?
```

This is always the answer

```
Keep the local version currently installed
```

#### Swap

Swap is `2GB`, may be I should make this smaller.
