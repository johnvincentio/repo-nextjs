---
meta-title: "Install Ghost | John Vincent"
meta-description: "John Vincent's discussion on Install Ghost"
meta-keywords: "Install Ghost"

title: "Install Ghost"
subtitle: ""
lead: ""

category: [Ghost, Jekyll Website]
permalink: /johnvincent/v1/install-ghost/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/v1/overview/)

<!-- end -->

# Install Ghost on Ubuntu

[Useful reference](https://www.digitalocean.com/community/tutorials/how-to-create-a-blog-with-ghost-and-nginx-on-ubuntu-14-04)

You must have set the swap for a successful installation of Ghost. 

[Overview of johnvincent.io website](/johnvincent/create-ubuntu-droplet/)

Ghost.org recommends to install Ghost in `var/www/ghost`

```
sudo mkdir -p /var/www/
cd /var/www/
sudo wget https://ghost.org/zip/ghost-latest.zip
```

unzip it

```
sudo unzip -d ghost ghost-latest.zip
sudo rm ghost-latest.zip
cd ghost/
```

Now we can install the Ghost dependencies and node modules (production dependencies only):

```
sudo npm install --production
```

## Setting up Ghost

```
cd /var/www/ghost
```

Copy example configuration file:

```
sudo cp config.example.js config.js
```

edit configuration file:

```
sudo vi config.js
```

```
var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: 'http://ghost.johnvincent.io',
        mail: {},
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost.db')
            },
            debug: false
        },

        server: {
            host: '127.0.0.1',
            port: '2368'
        }
    }
};

module.exports = config;
```

### Proxy

Note:

* use of port: 2368
* Nginx server block
	* `proxy_pass         http://127.0.0.1:2368;`

The proxy allows browser to use port 80.

### Ownership

Change the directory ownership to your own user so that you can write to it

```
sudo chown -R jv:jv /var/www/ghost
```

```
cd /var/www/ghost
find . -type d -print0 | xargs -0 chmod 0755 # For directories
find . -type f -print0 | xargs -0 chmod 0644 # For files
```

## Start Ghost

```
sudo npm start --production
```

## Test Ghost

Your blog is now available on http://ghost.johnvincent.io

* https://ghost.johnvincent.io
* http://ghost.johnvincent.io should redirect to https
