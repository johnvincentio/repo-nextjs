---
meta-title: "Overview of Peg Solitaire | John Vincent"
meta-description: "John Vincent's discussion on Overview of Peg Solitaire"
meta-keywords: "Peg Solitaire, Digital Ocean"

title: "Overview of Peg Solitaire"
subtitle: ""
lead: ""

category: [Html, Java, Spring]
permalink: /johnvincent/peg-solitaire-overview/
---

[![Home](/images/portfolio/peg-solitaire.gif)](https://www.peg-solitaire.johnvincent.io)

<!-- end -->

# Peg Solitaire

[Peg Solitaire at Wikipedia](https://en.wikipedia.org/wiki/Peg_solitaire)

Peg Solitaire is a game that consists of a board with 33 holes arranged in the pattern
given in the picture above. At the start, every hole except the center is filled with a peg.
The player then starts jumping pegs. Any peg that is jumped over is removed, just as
in checkers. Vertical and horizontal jumps are allowed, but diagonal jumps are forbidden.
The goal is to reach a position where only one peg remains, and that peg is in the center
hole.

## Live Deployment

[Play Peg Solitaire](https://www.peg-solitaire.johnvincent.io)

## Technical

* [Peg Solitaire](https://www.peg-solitaire.johnvincent.io) is a responsive web application.
* [Peg Solitaire](https://www.peg-solitaire.johnvincent.io) is built using [HTML5](/blog/#Html), [Javascript](/blog/#Javascript), jQuery, [Sass](/blog/#Sass), and [CSS3](/blog/#Css).
* [Peg Solitaire](https://www.peg-solitaire.johnvincent.io) solutions are provided by a [SpringBoot Microservice](/blog/#Spring).

### Client

* [HTML5](/blog/#Html)
* Html5 DnD
* [Javascript](/blog/#Javascript)
* jQuery
* [CSS3](/blog/#Css)
* [Sass](/blog/#Sass)
* Fully responsive

### Server

* [SpringBoot Microservice](/blog/#Spring)
* [Java](/blog/#Java)

### Production Deployment

* [Digital Ocean](/blog/#Digital_Ocean)
* [Ubuntu](/blog/#Ubuntu)
* [Nginx](/blog/#Nginx)
* [SSL certificates](/blog/#Ssl)
* [PM2](/blog/#Pm2)

## Deployment Overview

Deployed to Digital Ocean along with the [main website](). See [Overview of johnvincent.io website](/johnvincent/overview/)

The following details the changes that were made to that environment.

### Install and Configure Java

Update the system

```
sudo apt-get update && apt-get upgrade
```

install the default JDK

```
sudo apt-get install default-jdk
```

Check java version

```
java -version
```

### Nginx Server Configuration

`/etc/nginx/sites-available/https/peg-solitaire`

```
server {
    listen 80;
    listen [::]:80;
    server_name peg-solitaire.johnvincent.io www.peg-solitaire.johnvincent.io;
    return 301 https://www.peg-solitaire.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-peg-solitaire-johnvincent.io.conf;
    include snippets/ssl-params.conf;

    server_name peg-solitaire.johnvincent.io;
    return 301 https://www.peg-solitaire.johnvincent.io$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-peg-solitaire-johnvincent.io.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;

    root /var/www/peg-solitaire/html;

    index index.html;

    server_name www.peg-solitaire.johnvincent.io;

    location / {
        try_files $uri $uri/ =404;
    }
    location /api {
        proxy_pass http://localhost:9417/solution;
    }
    location ~ /.well-known {
         allow all;
    }
}
```

Notice the proxy to the SpringBoot Microservice

```
location /api {
    proxy_pass http://localhost:9417/solution;
}
```

### Deployment script

'deploy-peg-solitaire-app'

```
#!/bin/sh
#
#  script to get, build and deploy apps to nginx
#
# setup ssh to github
#
echo "setup ssh to github"
eval "$(ssh-agent)"
ssh-add -k ~/.ssh/id_github
#
cd
cd tmp
#
CLONES_DIR="/home/jv/clones"
DOCROOT_DIR="/var/www/peg-solitaire/html"
SERVER_ROOT_DIR="/var/www/peg-solitaire/server"
#
echo "Removing clones directory $CLONES_DIR"
rm -rf $CLONES_DIR
#
echo "Creating clones directory $CLONES_DIR"
mkdir $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories to $CLONES_DIR"
git clone git@github.com:johnvincentio/peg-solitaire $CLONES_DIR/peg-solitaire
git clone git@github.com:johnvincentio/peg-solitaire-server $CLONES_DIR/peg-solitaire-server
#
# Delete files in nginx docroot
#
echo "Delete files in Nginx Docroot"
rm -rf $DOCROOT_DIR/*
#
# Copy files to nginx docroot
#
echo "Copy files to Nginx Docroot"
cp -r /home/jv/clones/peg-solitaire/* $DOCROOT_DIR
#
# set permissions
#
echo "Setting permissions on $DOCROOT_DIR"
sudo chown -R jv:jv $DOCROOT_DIR
sudo chmod 0755 $DOCROOT_DIR
find $DOCROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $DOCROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files

#
# Delete files in nginx server-root
#
echo "Delete files in server root $SERVER_ROOT_DIR"
rm -rf $SERVER_ROOT_DIR/*

#
# Copy files to server root
#
echo "Copy files to server root"
cp /home/jv/clones/peg-solitaire-server/solitaire.jar $SERVER_ROOT_DIR
cp /home/jv/clones/peg-solitaire-server/solitaire/solitaire.json $SERVER_ROOT_DIR

echo "Setting permissions on $SERVER_ROOT_DIR"
sudo chown -R jv:jv $SERVER_ROOT_DIR
sudo chmod 0755 $SERVER_ROOT_DIR
find $SERVER_ROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $SERVER_ROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files

echo "Handle PM2"
cd $SERVER_ROOT_DIR
handle-pm2

echo "Restarting Nginx"
nginx-restart

#
echo "Completed"
```

### Spring Microservice

Notice the copy to `/var/www/peg-solitaire/server` of

* solitaire.jar
* solitaire.json

### Keep SpringBoot Microservice running

The deployment uses [PM2](/blog/#Pm2) to keep the Microservice running.

Create `/var/www/peg-solitaire/solitaire.json`

```
{
    "apps":[
    {
        "name":"peg-solitaire-server",
        "cwd":".",
        "script":"/usr/bin/java",
        "args":[
            "-jar",
            "/var/www/peg-solitaire/server/solitaire.jar"
        ],
        "watch":[
            "/var/www/peg-solitaire/server/solitaire.jar"
        ],
        "node_args":[],
        "log_date_format":"YYYY-MM-DD HH:mm Z",
        "exec_interpreter":"",
        "exec_mode":"fork"
     }
   ]
}
```

### Pm2 Control Script

Modify `handle-pm2`

```
#!/bin/bash
#
# script to add tasks to pm2 if not already added, or to restart
# the tasks if they have already been added.
#
echo "Current PM2 status"
pm2 list
#
echo "Check status of music server"
pm2 describe server > /dev/null
RUNNING=$? 
if [ "${RUNNING}" -ne 0 ]; then
  echo "Adding music server to PM2"
  cd /var/www/music/server
  pm2 start server.js
else
  echo "Restarting music server"
  pm2 restart server
fi;

echo "Check status of peg-solitaire server"
pm2 describe peg-solitaire-server > /dev/null
RUNNING=$? 
if [ "${RUNNING}" -ne 0 ]; then
  echo "Adding peg-solitaire-server to PM2"
	cd /var/www/peg-solitaire/server
  pm2 start solitaire.json
else
  echo "Restarting peg-solitaire-server"
  pm2 restart peg-solitaire-server
fi;

#
echo "Show current pm2 status"
pm2 list

echo "Restarting PM2"
pm2 restart all
```

## Production Testing

To test the SpringBoot Microservice from a server

```
wget http://localhost:9417/solution
```

To test the SpringBoot Microservice from a browser

```
https://www.peg-solitaire.johnvincent.io/api
```

## Production Status

To show the state of all services

```
pm2 list
```

To show the state of the microservice

```
pm2 show peg-solitaire-server 
```

Notice the logs may be found at

```
/home/jv/.pm2/logs
```

To monitor the microservice

```
pm2 monit peg-solitaire-server 
```

## Development

[Peg Solitaire Client](https://github.com/johnvincentio/peg-solitaire) is a browser based client.

[Peg Solitaire Server](https://github.com/johnvincentio/peg-solitaire-server) is a SpringBoot Microservice that provides solutions.

[Peg Solitaire Solutions](https://github.com/johnvincentio/peg-solitaire-solutions) is a node application that calculates all possible solutions.


### Build SpingBoot Microservice

[Spring Initializr](https://start.spring.io/)

Dependency: Spring Web

Start Eclipse-jee from `/Users/jv/Desktop/MyDevelopment/github/projects/peg-solitaire-server`

Import Project from `/Users/jv/Desktop/MyDevelopment/github/projects/peg-solitaire-server`

### Server Port

Edit `application.properties` and add `server.port=9417`

### Execute the service

```
cd /Users/jv/Desktop/MyDevelopment/github/projects/peg-solitaire-server/solitaire
./mvnw spring-boot:run
```

### Test the service

```
http://localhost:9417/solution
```

or

```
http://localhost:9417/solution?id=637
```

### Build Microservice as an executable Jar

Create `/Users/jv/Desktop/MyDevelopment/github/projects/peg-solitaire-server/solitaire/create-package`

```
#!/bin/sh
#
# script to create Jar
#
#
echo "Maven clean and make the package"
./mvnw clean package

echo "Save Jar"
cp target/solitaire-0.0.1-SNAPSHOT.jar ../solitaire.jar

echo "Completed"
```

Run the script `create-package` 

and

```
java -jar solitaire.jar
```

Test using

```
http://localhost:9417/solution?id=10000
```

or

```
wget http://localhost:9417/solution?id=10000
```

### Test the client

Create `/Users/jv/Desktop/MyDevelopment/github/website/peg-solitaire/run-http-server`

```
#!/bin/sh
#
#  script to run http server
#
PORT="9501"
echo "Run HTTP server on port $PORT"
#
run-http-server $PORT .
```

Start HTTP Server

```
cd /Users/jv/Desktop/MyDevelopment/github/website/peg-solitaire

./run-http-server
```

and test

```
http://127.0.0.1:9501
```

## Other

The proxy of the `/api` to a microservice `http://localhost:9517/solution` will cause CORS problems.

SpringBoot has a built-in solution.

```
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/solution")
	public List<Solution> findSolution(@RequestParam(value = "id", defaultValue = "0") int id) {
		StringBuffer sb = getFileContents(id);
		List<Solution> list = Utils.JSONArraytoListObject(sb.toString());
		return list;
	}
```

This implementation allows all. To be more restrictive, use something like

```
@CrossOrigin(origins = "http://localhost:9501")
```

