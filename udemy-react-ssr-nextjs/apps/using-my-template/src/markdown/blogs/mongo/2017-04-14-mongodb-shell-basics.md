---
meta-title: "Mongo Shell Basics | John Vincent"
meta-description: "Mongo Shell Basics"
meta-keywords: "Mongo"

title: "Mongo Shell Basics"
subtitle: ""
lead: "Working directly with Mongo"

category: [Mongo]
permalink: /mongo/mongo-shell-basics/
---

Mongo Shell Basics

<!-- end -->

This article refers to a [Thinkful course](https://courses.thinkful.com/node-001v5/assignment/2.1.2) 2.1.2

## Mongo Shell Basics

[Download data](https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json)

and Import

```
cd /Users/jv/Downloads
mongoimport --db tempTestDb --collection restaurants --drop --file primer-dataset.json
```

## Databases

[Database Commands Documentation](https://docs.mongodb.com/manual/reference/command/#database-operations)

[Collection Methods Documentation](https://docs.mongodb.com/v3.2/reference/method/js-collection/)

[Document Validation](https://docs.mongodb.com/manual/core/document-validation/)

Switch to the test database

```
use tempTestDb
```

A database is made up of collections, which are in turn made up of documents. A collection holds instances of a single kind of document. A recipes collection would contain individual recipe documents. A users collection would contain individual user documents.

A collection is comparable to a table in a relational database.

List collections:

```
db.getCollectionNames()
```

List one document from collection restaurants

```
db.restaurants.findOne()
```

## Creating Documents

```
var myRestaurant = {
  address: {},
  borough: "Queens",
  cuisine: "Colombian",
  grades: [],
  name: "Seba Seba",
  restaurant_id: "373737373737373737"
}
db.restaurants.insertOne(myRestaurant);
```

Also see:

[`insert()`](https://docs.mongodb.com/manual/reference/method/db.collection.insert/)

[`insertMany()`](https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#db.collection.insertMany)

## Querying Documents

[`find()`](https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find)

Example:

```
db.restaurants.
  find({borough: "Manhattan"}, {_id: 1, name: 1, address: 1}).
  sort({name: 1}).
  limit(5);
```

[Query Operators](https://docs.mongodb.com/manual/tutorial/query-documents/#read-operations-query-argument)

Query by Id

```
// In all of the remaining examples, any unique
// identifiers are only exemplary. When your Mongo
// server first imports its data, it will automatically
// generate _id values for each document. Use
// `db.restaurants.findOne({})._id;` to get the id of
// an existing object. You can then find by id as below:
var documentId = ObjectId('5840516d2af5143db9cd70c9');
db.restaurants.findOne({_id: documentId});
```

## Updating documents

[update()](https://docs.mongodb.com/manual/reference/method/db.collection.update/\#db.collection.update)

[`$set operator`](https://docs.mongodb.com/manual/reference/operator/update/set)

Example:

```
var objectId = db.restaurants.findOne({}, {_id: 1})._id

db.restaurants.updateOne(
  {_id: objectId},
  {$set: {name: "Foo Bar Bizz Bang"}}
);
// see our changes
db.restaurants.findOne({_id: objectId});
```

It's also possible to fully replace a document.

```
db.restaurants.updateOne(
  {_id: objectId},
  {name: "Yummy Yum Yum's"}
);
// this will return a document that ONLY
// has a name property, because if we don't use
// the $set operator and just send an object, Mongo replaces the current document properties with whatever
// we supply in this object.
db.restaurants.findOne({_id: objectId});
```

## Deleting documents

[remove()](https://docs.mongodb.com/manual/reference/method/db.collection.remove/#db.collection.remove)

or `.deleteOne` or `.deleteMany`

Example:

```
var objectId = db.restaurants.findOne({}, {_id: 1})._id
db.restaurants.find({_id: objectId}).count(); // => 1
db.restaurants.remove({_id: objectId});
db.restaurants.find({_id: objectId}).count(); // => 0
```

