---
meta-title: "Create Ubuntu Droplet at Digital Ocean | John Vincent"
meta-description: "John Vincent's discussion on Create Ubuntu Droplet at Digital Ocean"
meta-keywords: "Create Ubuntu Droplet at Digital Ocean"

title: "Create Ubuntu Droplet at Digital Ocean"
subtitle: ""
lead: ""

category: [Taskmuncher, Digital Ocean, Ubuntu]
permalink: /taskmuncher/deploy/create-ubuntu-droplet/
---

Article that describes the creation and configuration of a Ubuntu droplet at Digital Ocean and the deployment of the TaskMuncher application.

This is part of a series of discussions regarding Deploying TaskMuncher to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Create Ubuntu Droplet at Digital Ocean

[Useful reference](https://www.youtube.com/watch?v=YWUQaqsdYUY)

[Sign in to Digital Ocean](https://digitalocean.com)

* Create Droplet
* Ubuntu `16.04 x64`
* Standard: $5/month
* Choose a datacenter region
* No SSH key
* Hostname: `taskmuncher`

The Ubuntu droplet is created and an IP provided.


## Set Root Password

Dashboard

* Select droplet
* Access (left nav)
* Reset Root Password
	* Password is emailed.

Get password from your email.

* Launch Console
* root
	* {password-from-your-email}

* Change password

## How To Connect To Your Droplet with SSH

[Useful reference](https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh)

[Initial Setup reference](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)

* Connect to droplet
	* ssh root@{your-ip}

```
The authenticity of host '<your-ip> (<your-ip>)' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

* Yes

#### Basic user configuration

* Add user
	* `adduser {remote-user}`
	* `{password}`

* Root privileges
	* `usermod -aG sudo {remote-user}`

Create bin directory

```
cd
mkdir bin
```

Add bin to PATH and add aliases

```
su - {remote-user}
vi .profile

add

PATH="$HOME/bin:$HOME/.local/bin:$PATH"

lf() { ls -FaC $*; }
```

#### Basic root configuration

Add aliases to root

```
sudo -s
vi /etc/bash.bashrc

add
lf() { ls -FaC $*; }
```

#### Add Public Key Authentication

From Mac

```
cd .ssh
ssh-keygen
```

```
Enter file in which to save the key (/Users/<my-user>/.ssh/id_rsa): id_taskmuncher
```

* passphrase: do not provide a passphrase

Generates two files

* private: `id_taskmuncher`
* public: `id_taskmuncher.pub`

Store key in keychain

```
chmod 600 id_taskmuncher*
ssh-add -K id_taskmuncher
```

Add to `.ssh/config`

```
Host taskmuncher
    UseKeychain yes
    AddKeysToAgent yes
    HostName <your-ip>
    User <your-user>
    IdentityFile ~/.ssh/id_taskmuncher
```

#### Copy public key to remote server

```
cd
cd .ssh
ssh-copy-id <remote-user>@<your-ip>
```

#### Verify Public Key on Remote Server

* Login to digital ocean droplet
* `su - <remote-user>`
* cd .ssh
* view `authorized_keys`
	* Key should be present	
	* Remove all other keys

#### Test SSH to Remote Server

```
ssh <remote-user>@<your-ip>
```

#### Disable Password Authentication

As root or your sudo user, open the SSH daemon configuration

```
sudo vi /etc/ssh/sshd_config
```

set:

```
PasswordAuthentication no
```

ensure:

```
PubkeyAuthentication yes
ChallengeResponseAuthentication no
```

reload the SSH daemon:

```
sudo systemctl reload sshd
```

Test Log In

```
ssh <remote-user>@<your-ip>
```

should log in without any passwords.

## Script SSH to `taskmuncher.com`

Optional, from local system, add the following to your bin directory

`ssh-to-taskmuncher`

```
#!/bin/sh
# 
# script to ssh into the taskmuncher
#
echo "Script to ssh into the taskmuncher"
echo " "
#
REMOTE_SERVER="taskmuncher"
echo " "
echo "Remote Server: $REMOTE_SERVER"
#
ssh "$REMOTE_SERVER"
#
echo " "
echo "Completed"
```

From now on, to access the droplet

```
ssh-to-taskmuncher
```

## Restart Droplet and Test

Before you spend any more time configuring your droplet make sure the access is set up correctly.

* Exit editors etc

As root

```
shutdown -h now
```

From `digitalocean.com` dashboard,

* refresh page
* Power
* Notice Droplet is powered down
* Power On

Verify ssh

```
ssh-to-taskmuncher
```

if any problems here, go back and fix.
 
## Set Up a Basic Firewall

[Firewall Rules Reference](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)

List applications:

```
sudo ufw app list
```

Available applications:
  OpenSSH

Ensure firewall allows SSH connection:

```
sudo ufw allow OpenSSH
```

enable the firewall:

```
sudo ufw enable
```

You can see that SSH connections are still allowed by typing:
```
sudo ufw status
```

## Add Swap

[Swap reference](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04)

Check System for Swap

```
sudo swapon -s
```

Check current disk usage

```
df -h
```

#### Create Swap File

```
sudo dd if=/dev/zero of=/swapfile bs=1G count=4
```

if this fails with:

```
dd: memory exhausted by input buffer of size 1073741824 bytes (1.0 GiB)
```

then try:

```
sudo fallocate -l 4G /swapfile
```

Check swap file

```
ls -lh /swapfile
```

#### Enabling the Swap File

Secure the swap file:

```
sudo chmod 600 /swapfile
```

tell our system to set up the swap space:

```
sudo mkswap /swapfile
```

enable the swap:

```
sudo swapon /swapfile
```

verify:

```
sudo swapon -s
```

#### Make the Swap File Permanent

Edit configuration file:

```
sudo vi /etc/fstab
```

Add to the end:

```
/swapfile   none    swap    sw    0   0
```

#### Tweak your Swap Settings

Current `swappiness` value by typing:

```
cat /proc/sys/vm/swappiness
```

For a VPS system, this number needs to be close to zero.

Edit configuration file:

```
sudo vi /etc/sysctl.conf
```

At the bottom, add:

```
vm.swappiness=10
```

Another related value that you might want to modify is the `vfs_cache_pressure`. This setting configures how much the system will choose to `cache inode` and `dentry` information over other data.

```
cat /proc/sys/vm/vfs_cache_pressure
sudo vi /etc/sysctl.conf
add:
vm.vfs_cache_pressure = 50
```

#### Check Swap

```
sudo swapon --summary
free -h
```

## Install Basics

```
sudo apt-get update
sudo apt-get install zip wget
```

## Install Node and Npm

[Installing Node](https://nodejs.org/en/download/package-manager/)

#### Node V8 - Best for Production

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```
which node
/usr/bin/node

which npm
/usr/bin/npm

node -v
v6.11.1

npm -v
v3.10.10
```

#### Node V6 - Reference Purposes Only

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```
which node
/usr/bin/node

which npm
/usr/bin/npm

node -v
v6.11.1

npm -v
v3.10.10
```

#### `Node V4` - Reference Purposes Only

[`Install Node v4`](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04)

```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

```
nodejs -v
v4.2.6

npm -v
3.5.2
```


##### Uninstall

```
which node
which npm
```

```
sudo apt-get remove nodejs
sudo apt-get remove npm
```

```
cd /etc/apt/sources.list.d
```

and remove any node list.

```
sudo apt-get update
```

## Install PM2

Use PM2, a production process manager for Node applications with a built-in load balancer.

Shutdown Ghost. Ensure Ghost is shutdown before proceeding.

Install PM2

```
sudo npm install pm2 -g
pm2 -v
```

## Install HTML-Minifier

```
sudo npm install html-minifier -g
```























