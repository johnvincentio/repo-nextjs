---
meta-title: "Mongo in the Cloud | John Vincent"
meta-description: "Mongo in the Cloud"
meta-keywords: "Mongo, Mlab"

title: "Mongo in the Cloud"
subtitle: ""
lead: "Setup a Mongo Database at mLab"

category: [Mongo, Mlab]
permalink: /mongo/mongodb-cloud/
---

Setting up a Mongo Database is straightforward.

<!-- end -->

## Getting Started

Get an account at [mLab](https://mlab.com) if you do not already have one.

## Using mLab

Sign in to [mLab](https://mlab.com/home)

1. MongoDB Deployments
    * Create New

2. Single-node (free)
    * Sandbox (free)
    * Note MongoDB version

3. Database Name: jv-test-1
4. Click Create new MongoDB deployment

## Create a User

* Select Database
* Users Tab
* Click Add database user
* Create User, user = `jvtest`

```
To connect using the mongo shell:
mongo ds117348.mlab.com:17348/jv-test-1 -u <dbuser> -p <dbpassword>

To connect using a driver via the standard MongoDB URI (what's this?):
mongodb://<dbuser>:<dbpassword>@ds117348.mlab.com:17348/jv-test-1
```

* Download [Mongo Data](https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json)

* Import Data

```
mongoimport --db jv-test-1 --collection restaurants --drop --file primer-dataset.json --host ds117348.mlab.com --port 17348  -u jvtest -p <password>
```

* Connect to the database

```
mongo ds117348.mlab.com:17348/jv-test-1 -u jvtest -p <password>
```

* Verify data

```
use jv-test-1
db.restaurants.find()

```
