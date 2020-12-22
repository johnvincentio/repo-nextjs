---
meta-title: "Create Site Map | John Vincent"
meta-description: "John Vincent's discussion on Create Site Map"
meta-keywords: "Site Map"

title: "Create Site Map"
subtitle: ""
lead: ""

category: [Taskmuncher, Sitemap]
permalink: /taskmuncher/deploy/create-sitemap/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Create Site Map

Create a script 'create-sitemap'

```
#!/bin/sh
#
OUTFILE=sitemap.xml
#
addFile() {
    CURFILE=$1;
    echo "\t<url>" >> $OUTFILE;
    echo "\t\t<loc>$MYHOST$CURFILE</loc>" >> $OUTFILE;
    echo "\t\t<lastmod>$DATE</lastmod>" >> $OUTFILE;
    echo "\t</url>" >> $OUTFILE;
}
#
DATE=`date +%Y-%m-%dT00:00:00+00:00`
# echo "Date $DATE"
MYHOST="https://www.taskmuncher.com"
#echo "MYHOST $MYHOST"
#
echo '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' > $OUTFILE
echo '\txmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' >> $OUTFILE
echo '\txsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 ' >> $OUTFILE
echo '\thttp://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">' >> $OUTFILE
#
addFile '/'
addFile '/#/join'
addFile '/#/signin'
#
echo '</urlset>' >> $OUTFILE
```

Execute the script

```
./create-sitemap
```

and copy `sitemap.xml` to the root of your project.


## For Node Express

It is more involved.

```
routes.js

add url to list not requiring a token

 '/sitemap.xml'
```

Add a route

```
routes.js

app.get('/sitemap', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/sitemap.xml'));
});
```

Test

```
http://localhost:8080/sitemap.xml
```
