---
meta-title: "Mongo Basic Drills | John Vincent"
meta-description: "Mongo Basic Drills"
meta-keywords: "Mongo"

title: "Mongo Basic Drills"
subtitle: ""
lead: "Practice CRUD operations on a Mongo shell."

category: [Mongo]
permalink: /mongo/mongodb-basic-drills/
---

Basic Mongo Drills.

<!-- end -->

This article refers to a [Thinkful course](https://courses.thinkful.com/node-001v5/assignment/2.1.3) 2.1.3

# Mongo Basic Drills


## Getting Started

Download and import data into MongoDB.

For details, [see this article](/mongo/mongo-shell-basics/)


## Basics

Start with:

```
use tempTestDb
db (show current database)
```

```
show dbs
show tables
show collections (show tables)

db.getCollectionNames()
```

## Get all

Find the command that retrieves all restaurants.

```
db['restaurants'].find()

db.restaurants.find()

coll = db.getCollection("restaurants")
coll.find()

coll = db.restaurants
coll.find()
```

## Limit and sort

Find the command that the first 10 restaurants that appear when `db.restaurants` is alphabetically sorted by the name property.

```
db.restaurants.
  find().
  sort({name: 1}).
  limit(10);
```

## Get by `_id`

Retrieve a single restaurant by `_id` from the restaurants collection. This means you'll first need to get the `_id` for one of the restaurants imported into the database.

Get the `objectid` of the first record and then find the record for that `objectid`

```
var objectId = db.restaurants.findOne({}, {_id: 1})._id
db.restaurants.find({_id: objectId});
```

Verify it is the first record:

```
db.restaurants.findOne()
```

Another way to find a record by `objectid`

```
var documentId = ObjectId('58f25d86e6f2f6c130af4d9f');
db.restaurants.findOne({_id: documentId});
```

## Get by value

Write a command that gets all restaurants from the borough of "Queens".

```
db.restaurants.find({borough: "Queens"});
```

Count these records:

```
db.restaurants.
  find({borough: "Queens"}).count();
5656
```

ascending order:

```
db.restaurants.
  find({borough: "Queens"}).
  sort({name: 1});
```

descending order:

```
db.restaurants.
  find({borough: "Queens"}).
  sort({name: -1});
```

Limit fields:

```
db.restaurants.
  find({borough: "Queens"}, {borough: 1, name: 1}).
  sort({name: 1});

db.restaurants.
  find({borough: "Queens"}, {borough: 1, name: 1}).
  sort({name: -1});

db.restaurants.
  find({}, {borough: 1, name: 1}).
  sort({name: -1});

db.restaurants.
  find({}, {name: 1, borough: 1}).
  sort({name: -1});

db.restaurants.
  find({}, {name: 1}).
  sort({name: -1});

db.restaurants.
  find({}, {name: 1}).
  sort({name: 1});
```

Do not list a column:

```
db.restaurants.
  find({}, {name: 1, _id: 0}).
  sort({name: -1});
```

Exclude columns:

```
db.restaurants.
  find({borough: "Queens"}, {borough: 0, name: 0, address: 0, grades: 0}).
  sort({name: -1});
```

List field in embedded document:

```
db.restaurants.
  find({borough: "Queens"}, {borough: 1, name: 1, "address.street": 1}).
  sort({name: -1});

db.restaurants.
  find({borough: "Queens"}, {borough: 1, name: 1, "grades.score": 1}).
  sort({name: -1});
```

Ignore empty string:

```
db.restaurants.
  find({name: {$ne:""}}, {name: 1}).
  sort({name: 1})
```

## Count

Write a command that gives the number of documents in `db.restaurants`

```
db.restaurants.count()

db['restaurants'].count()
=> 25359

db.restaurants.find({name: {$ne:""}}).count()
=> 25208
```

List the collection and count:

```
db.getCollectionNames().map(function(name) {
    return { "name": name, "count": db[name].count() }
})
```

## Count by nested value

Write a command that gives the number of restaurants whose zip code value is `11206`. Note that this property is at `document.address.zipcode`, so you'll need to use dot notation to query on the nested zip code property.

Notice field is in quote `"address.zipcode"`

```
db.restaurants.
  find({"address.zipcode": {$eq:"11206"}}).count()
155
```

With this syntax, the equals operator is assumed:

```
db.restaurants.
  find({"address.zipcode": "11206"}).count()
```

List all records with `"address.zipcode" = "11206"`

```
db.restaurants.
  find({"address.zipcode": {$eq:"11206"}}, {"address.zipcode": 1})
```

## Delete by id

Write a command that deletes a document from `db.restaurants`. This means you'll first need to get the `_id` for one of the restaurants imported into the database.

Let's delete the first record with `zipcode="11206"`

First, get a count of records with `zipcode="11206"`

```
db.restaurants.find({"address.zipcode": {$eq:"11206"}}).count()
=> 155
```

Make `objectId`

```
var objectId = db.restaurants.findOne({"address.zipcode": {$eq:"11206"}}, {_id: 1})._id
```

Ensure it is only one record:

```
db.restaurants.find({_id: objectId}).count();
=> 1
```

Delete the record:

```
db.restaurants.remove({_id: objectId});
```

Find the record by `objectId` to ensure it does not exist:

```
db.restaurants.find({_id: objectId}).count();
=> 0
```

Count of records with `zipcode="11206"`, should be one less:

```
db.restaurants.find({"address.zipcode": {$eq:"11206"}}).count()
=> 154
```

## Update a single document

Write a command that sets the name property of a document with a specific `_id` to `'Bizz Bar Bang'`. Make sure that you're not replacing the existing document, but instead updating only the name property.

Let's update the first record with `zipcode="11206"`

```
var objectId = db.restaurants.findOne({"address.zipcode": {$eq:"11206"}}, {_id: 1})._id
db.restaurants.findOne({_id: objectId});

db.restaurants.updateOne(
  {_id: objectId},
  {$set: {name: "Foo Bar Bizz Bang"}}
);

db.restaurants.findOne({_id: objectId});
```

## Update many documents

Uh oh, two zip codes are being merged! The '10035' zip code is being merged with '10036'. Write a command that updates values accordingly.


What am I dealing with?
[Zip Code by NYC Neighborhoods](https://www.health.ny.gov/statistics/cancer/registry/appendix/neighborhoods.htm)

Zip codes 10035 and 10036 are both in Manhattan.

Check that all these records really are in borough: manhattan

```
db.restaurants.find( {
    $and: [
        {"address.zipcode": { $eq: "10035" } },
        {"borough": { $eq: "Manhattan"} }
    ]
}).count()
=> 87

db.restaurants.find( {
    $and: [
        {"address.zipcode": { $eq: "10035" } },
        {"borough": { $ne: "Manhattan"} }
    ]
}).count()
=> 0

db.restaurants.find( {
    $and: [
        {"address.zipcode": { $eq: "10036" } },
        {"borough": { $eq: "Manhattan"} }
    ]
}).count()
=> 610

db.restaurants.find( {
    $and: [
        {"address.zipcode": { $eq: "10036" } },
        {"borough": { $ne: "Manhattan"} }
    ]
}).count()
=> 1
```

One trouble record, let's see it:

```
db.restaurants.find( {
    $and: [
        {"address.zipcode": { $eq: "10036" } },
        {"borough": { $ne: "Manhattan"} }
    ]
})
```

```
{ "_id" : ObjectId("58f25d87e6f2f6c130afa02a"), "address" : { "building" : "253", "coord" : [ -73.986403, 40.7602027 ], "street" : "W 47Th St", "zipcode" : "10036" }, "borough" : "Missing", "cuisine" : "Chicken", "grades" : [ { "date" : ISODate("2014-09-30T00:00:00Z"), "grade" : "A", "score" : 7 } ], "name" : "Buffalo Wild Wings Grill & Bar", "restaurant_id" : "50005585" }
```

Notice that borough = "Missing"

Let's fix that:

```
var objectId = db.restaurants.findOne({
    $and: [
        {"address.zipcode": { $eq: "10036" } },
        {"borough": { $ne: "Manhattan"} }
    ]
},
{_id: 1})._id
db.restaurants.findOne({_id: objectId});

object id: 58f25d87e6f2f6c130afa02a

db.restaurants.updateOne(
  {_id: objectId},
  {$set: {borough: "Manhattan"}}
);

db.restaurants.findOne({_id: objectId});
```

Fixed that. Redo the counts:

```
db.restaurants.find( {
    $and: [
        {"address.zipcode": { $eq: "10036" } },
        {"borough": { $eq: "Manhattan"} }
    ]
}).count()
=> 611

db.restaurants.find( {
    $and: [
        {"address.zipcode": { $eq: "10036" } },
        {"borough": { $ne: "Manhattan"} }
    ]
}).count()
=> 0
```

Counts of both zip codes:

```
db.restaurants.
  find({"address.zipcode": {$eq:"10035"}}).count()
=> 87

db.restaurants.
  find({"address.zipcode": {$eq:"10036"}}).count()
=> 611
```

As `_id` is the unique key for documents within the collection, just updating the zip code will act as a merge.

```
db.restaurants.updateMany(
  {"address.zipcode": {$eq:"10035"}},
  {$set: {"address.zipcode": "10036"}}
);

=> { "acknowledged" : true, "matchedCount" : 87, "modifiedCount" : 87 }
```

Redo counts of both zip codes:

```
db.restaurants.
  find({"address.zipcode": {$eq:"10035"}}).count()
=> 0

db.restaurants.
  find({"address.zipcode": {$eq:"10036"}}).count()
=> 698
```

Count of 698 records is indeed = 87 + 611

### End
