---
meta-title: "Mongodb | John Vincent"
meta-description: "John Vincent's discussion on Mongodb"
meta-keywords: "Mongodb"

title: "Installing Mac Mongodb"
lead: "Installing and Configuring MongoDB"
subtitle: ""

category: [Mongo]
permalink: /mongo/installing-mongodb/
---

This article refers only to Mac

<!-- end -->

## Installation

Planning to use:

* MongoDB https://www.mongodb.com/ locally and 
* mLab https://mlab.com/ remotely.

They must use the same version of MongoDB.

As mLab is using MongoDB 3.2 at this time, I will install MongoDB 3.2 locally.

### Install, Start and Stop MongoDB

From [MongoDB](https://www.mongodb.com/), downloaded version 3.2.11.

Copied to:
`/Users/jv/Desktop/OtherTools/mongodb`

```
cd /Users/jv/Desktop/OtherTools/mongodb
mkdir data/db
```

### Create Mongo Shell Scripts

`cd ~/repo_shell_scripts/mac/mongodb`

Create file `mongodb.conf`

```
systemLog:
   destination: file
   path: "/Users/jv/Desktop/OtherTools/mongodb/log/mongod.log"
   logAppend: true
storage:
   journal:
      enabled: true
processManagement:
   fork: false
net:
   bindIp: 127.0.0.1
   port: 27017
setParameter:
   enableLocalhostAuthBypass: false
```

Notice port is specified here. The default is 27017

Create file start-database

```
#!/bin/sh
#
# script to start mongodb server
#
# Start Mongodb
#
echo Starting mongodb
mongod --dbpath $MONGODB_DATA --config $MONGODB_CONFIG_FILE
```

Create file start-console

```
#!/bin/sh
#
# script to start mongo command line
#
# Start Mongo
#
echo Starting mongo command line
mongo
```

Edit `.bash_profile`

```
#
# add MongoDB
#

MONGODB_HOME=/Users/jv/Desktop/OtherTools/mongodb
MONGODB_DATA=$MONGODB_HOME/data/db
MONGODB_CONFIG_FILE=mongodb.conf
echo "MongoDB Home: $MONGODB_HOME"
echo "MongoDB Data: $MONGODB_DATA"
echo "MongoDB Config File: $MONGODB_CONFIG_FILE"

export PATH=$MONGODB_HOME/bin:$PATH
```

### Manage MongoDB

Start MongoDB

```
cd /Users/jv/Desktop/MyDevelopment/repo_shell_scripts/mac/mongo
./start-database
```

Stop MongoDB

```
Ctrl-C the task
```

Mongo Console

```
cd /Users/jv/Desktop/MyDevelopment/repo_shell_scripts/mac/mongo
./start-console
```

Import into MongoDB

```
mongoimport --db tempTestDb --collection restaurants --drop --file primer-dataset.json
```

## System Limits

The default open file limit of 256 is too low for Mongo. Let's increase that.

Check current limits

```
ulimit -a
sudo launchctl limit
```

Create file

```
sudo vi /Library/LaunchDaemons/limit.maxfiles.plist
```

insert

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>limit.maxfiles</string>
    <key>ProgramArguments</key>
    <array>
      <string>launchctl</string>
      <string>limit</string>
      <string>maxfiles</string>
      <string>200000</string>
      <string>200000</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>ServiceIPC</key>
    <false/>
  </dict>
</plist>
```

Create file

```
sudo vi /Library/LaunchDaemons/limit.maxproc.plist
```

insert

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple/DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>limit.maxproc</string>
    <key>ProgramArguments</key>
    <array>
      <string>launchctl</string>
      <string>limit</string>
      <string>maxproc</string>
      <string>2048</string>
      <string>2048</string>
    </array>
    <key>RunAtLoad</key>
    <true />
    <key>ServiceIPC</key>
      <false />
  </dict>
</plist>
```

Set owner and permissions

```
sudo chown root:wheel /Library/LaunchDaemons/limit.maxfiles.plist
sudo chmod 644 /Library/LaunchDaemons/limit.maxfiles.plist

sudo chown root:wheel /Library/LaunchDaemons/limit.maxproc.plist
sudo chmod 644 /Library/LaunchDaemons/limit.maxproc.plist
```

Reload the launcher

```
sudo launchctl load -w /Library/LaunchDaemons/limit.maxfiles.plist
sudo launchctl load -w /Library/LaunchDaemons/limit.maxproc.plist
```

Open a new terminal session and verify the limits

```
ulimit -a
```

Verify open files >= 2560

Restart Mongo

```
cd /Users/jv/Desktop/MyDevelopment/repo_shell_scripts/mac/mongo
./start-database
```


### Some MongoDB Console Commands

```
db (show current database)
show dbs (show databases)

use jv1 (switch to database jv1)

show collections (show tables)

db.restaurants.find() (query collection “restaurants")
```

## MongoDB Notes

* Mongo database is not created until it has object(s) added.

* Collection is a table
* Documents are rows
* Field is a column.

* Documents are `org.son.documents`

* A document has a primary key field `_id` added by default.

### Other

For a 100MB Json file

```
https://github.com/seductiveapps/largeJSON
```

A mongo example database:

```
https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json
```



## Using mLab for Remote MongoDB Deployments

Get an account at [mLab](https://mlab.com)

Note:

* Driver examples: http://docs.mlab.com/languages

* Quickly get data into your MongoDB: http://blog.mlab.com/?p=2479

* Free MongoDB University classes: https://education.mongodb.com/


## Errors

```
“mongod” cannot be opened because the developer cannot be verified.
```

Solution is to select `mongod` in the `Finder`, Open the file.
