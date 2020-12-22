---
meta-title: "CRUD testing with wget and curl | John Vincent"
meta-description: "Usage details"
meta-keywords: "Wget, Curl"

title: "CRUD testing with wget and curl"
subtitle: "Usage details"
lead: "Basic wget and curl usage."

category: [Wget, Curl]
permalink: /general/crud-wget-curl/
---

This article attempts to layout a pattern so that similar tasks will be made easy.

These notes were used for this [Github Project](https://github.com/johnvincentio/nodejs-1/tree/master/1.4.7-challenge-blog-api)

<!-- end -->

## Node/Express Debugging

`devtool server.js --break`

## Gotchas

* be sure to set content type correct else express body parser will incorrectly parse out the data.


## GET URL

```
http://localhost:8080/shopping-list
http://localhost:8080/recipes
```

### wget

```
wget -S -O - "http://localhost:8080/shopping-list"
wget -S -O - "http://localhost:8080/recipes"
```

### curl

```
curl -H "Content-Type:application/json" "http://localhost:8080/shopping-list"
curl -H "Content-Type:application/json" "http://localhost:8080/recipes"
```

## POST URL

### wget

```
wget -O- --post-data='{"name": "coffee", "budget": "6"}' --header=Content-Type:application/json "http://localhost:8080/shopping-list"
wget -O- --post-data='{"name": "abc", "ingredients": ["a", "b", "c"]}' --header=Content-Type:application/json "http://localhost:8080/recipes"
```

### curl

```
curl -i -X POST -H "Content-Type:application/json" http://localhost:8080/shopping-list -d '{"name": "test", "budget": "99"}'
curl -i -X POST -H "Content-Type:application/json" http://localhost:8080/recipes -d '{"name": "abc", "ingredients": ["a", "b", "c"]}'
```

### Test POST with bad URLs

```
wget -O- --post-data='{"name": "abc"}' --header=Content-Type:application/json "http://localhost:8080/recipes"
wget -O- --post-data='{"ingredients": ["e", "f"]}' --header=Content-Type:application/json "http://localhost:8080/recipes"
wget -O- --post-data='{"name": "abc", "ingredients": []}' --header=Content-Type:application/json "http://localhost:8080/recipes"
```

## DELETE URL

Delete shopping list using delete method:

```
curl -X DELETE "http://localhost:8080/shopping-list/:id"
```

for example:

```
curl -X DELETE "http://localhost:8080/shopping-list/72191148-8ca8-45a5-a796-3f9b8139473c"
curl -X DELETE "http://localhost:8080/recipes/83b2883d-59cb-43c7-aff8-ca0af654ab22"
```

wget seems to hang:

```
wget --method=delete -S -O - "http://localhost:8080/shopping-list/:id"
```

## PUT URLs

Update with Curl PUT:

```
curl -i -X PUT -H "Content-Type: application/json" 'http://localhost:8080/shopping-list/a4a88b9c-3c7a-4fc5-85ed-52ea66431ee7' -d '{"name":"updated","id":"a4a88b9c-3c7a-4fc5-85ed-52ea66431ee7","budget":"99"}'

curl -i -X PUT -H "Content-Type: application/json" 'http://localhost:8080/recipes/6e27afba-c481-4321-b02c-f73546f29b0e' -d '{"name":"updated","id":"6e27afba-c481-4321-b02c-f73546f29b0e","ingredients":["a","b","c","d"]}'
```

wget, note use of `--body-data`

```
wget --method=put -O- --body-data='{"name": "acoffee", "budget": "9", "id":"b508608f-f0c8-42b4-81b7-d4419daa831d"}' --header=Content-Type:application/json "http://localhost:8080/shopping-list/b508608f-f0c8-42b4-81b7-d4419daa831d"
```

### Test PUT with bad URLs

```
curl -i -X PUT -H "Content-Type: application/json" 'http://localhost:8080/recipes/6e27afba-c481-4321-b02c-f73546f29b0e' -d '{"name":"updated","id":"6e27afba","ingredients":["a","b","c","d"]}'

curl -i -X PUT -H "Content-Type: application/json" 'http://localhost:8080/recipes/6e27afba-c481-4321-b02c-f73546f29b0e' -d '{"id":"6e27afba-c481-4321-b02c-f73546f29b0e","ingredients":["a","b","c","d"]}'

curl -i -X PUT -H "Content-Type: application/json" 'http://localhost:8080/recipes/6e27afba-c481-4321-b02c-f73546f29b0e' -d '{"name":"updated","id":"6e27afba-c481-4321-b02c-f73546f29b0e"}'

curl -i -X PUT -H "Content-Type: application/json" 'http://localhost:8080/recipes/not-exist' -d '{"name":"updated","id":"not-exist","ingredients":["a","b","c","d"]}'
```
