---
meta-title: "Apache Solr | John Vincent"
meta-description: "John Vincent's discussion on Apache Solr"
meta-keywords: "Java, Apache, Solr"

title: "Apache Solr"
subtitle: ""
lead: ""

category: [Java, Solr]
permalink: /java/apache-solr/
---

This document discusses installation and basic usage of Apache Solr.

<!-- end -->

# Apache Solr

Solr is the popular, blazing-fast, open source enterprise search platform built on Apache Lucene™

[Apache Solr](http://lucene.apache.org/solr/)

[Solr Tutorial](http://lucene.apache.org/solr/guide/8_2/solr-tutorial.html)

[Solr Downloads](http://lucene.apache.org/solr/downloads.html)

## Download

[Download Solr 8.3.1](https://www.apache.org/dyn/closer.lua/lucene/solr/8.3.1/solr-8.3.1.tgz)

Chose from sites

```
wget http://mirror.cc.columbia.edu/pub/software/apache/lucene/solr/8.3.1/solr-8.3.1.tgz
```

and get the KEYS

```
https://www.apache.org/dist/lucene/solr/8.3.1/solr-8.3.1.tgz.asc
```

## Verify Download

```
cd /Users/jv/Desktop/OtherTools/apache-solr

gpg --import KEYS
gpg --verify solr-8.3.1.tgz.asc solr-8.3.1.tgz
```

```
tar -zxvf solr-8.3.1.tgz
```

# Start Solr

Start Solr using `techproducts`

```
cd solr-8.3.1
bin/solr -e techproducts
```

Check status

```
bin/solr status
```


## UI Admin

```
http://localhost:8983/solr
```

## Indexing Data

Note `~/solr-8.3.1/example/exampledocs` has many XML files.






