---
meta-title: "Install Ubuntu Mongo | John Vincent"
meta-description: "John Vincent's discussion on Install Ubuntu Mongo"
meta-keywords: "Ubuntu, Mongo"

title: "Install Ubuntu Mongo"
subtitle: ""
lead: ""

category: [Taskmuncher, Ubuntu, Mongo]
permalink: /taskmuncher/deploy/install-ubuntu-mongo/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Install Mongo Ubuntu

[How to Install MongoDB on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)

[How to Install and Secure MongoDB on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04)

```
sudo apt-get update
```

## Adding the MongoDB Repository

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

Issue the following command to create a list file for MongoDB.

```
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```

After adding the repository details, we need to update the packages list.

```
sudo apt-get update
```

## Installing and Verifying MongoDB

Now we can install the MongoDB package itself.

```
sudo apt-get install -y mongodb-org
```

Verify installed

```
cd /usr/bin
ls mongo*
```

If failed, probably needs

```
sudo apt-get install -y --allow-unauthenticated mongodb-org
```

We'll create a unit file to manage the MongoDB service.

```
sudo vi /etc/systemd/system/mongodb.service
```

```
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```

Next, start the newly created service with `systemctl`

```
sudo systemctl start mongodb
```

Check that the service has started properly.

```
sudo systemctl status mongodb
```

Enable automatically starting MongoDB when the system starts.

```
sudo systemctl enable mongodb
```





