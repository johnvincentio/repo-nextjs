---
meta-title: "Basic Node | John Vincent"
meta-description: "John Vincent's discussion on Basic Node"
meta-keywords: "Node"

title: "Basic Node"
subtitle: "Node on Mac"
lead: ""

category: [Mac, Node, Npm, Less, Yarn, Grunt]
permalink: /mac/basic-node/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Node

[NodeJS](https://nodejs.org/en/)

## Install / Update

From [NodeJS](https://nodejs.org/en/)

* Download recommended version, [this file for example](https://nodejs.org/dist/v10.15.3/node-v10.15.3.pkg)
* Execute the package file

installs to 

```
/usr/local/bin/node
/usr/local/bin/npm
```

```
which node
which npm
```

Check versions

```
node -v
npm -v
```

Global Node modules are kept in
`/usr/local/lib/node_modules`

## Path

Ensure `/usr/local/bin` is in your `PATH`

## Update Npm

One option is to update by updating Npm as outlined above.

Preferred

```
sudo npm install -g npm 
```

## Npm Global Modules

For example

```
sudo npm install -g less
```

will install `less` as `/usr/local/bin/lessc`

## Update Global Modules

For example

```
sudo npm update -g less
```

## Npm Cache

```
cd
cd .npm
ls
```

will show the cached files.

### Npm Clean Cache

```
sudo npm cache clean
```

### Npm Error

For example

```
npm list -g grunt
Unmet Peer Dependency grunt@~0.4.2
```

may require some upgrades.

## Package Install

For example

```
npm install underscore
npm install underscore@1.7.0

sudo npm update underscore

npm uninstall underscore
```

## Search for a Package

```
sudo npm search mkdir
```

shows packages including `mkdir` allowing for `sudo npm install -g mkdirp`

## Nodemon

[Nodemon](http://nodemon.io/)

```
sudo npm install -g nodemon

nodemon server.js
```

## Use a Package

For example `mkdir.js`

```
var mkdirp = require('mkdirp');
mkdirp('foo', function (err) {
    if (err) console.error(err)
    else console.log('Directory created!')
});
```

and then

```
node mkdir.js
```

creates directory `foo`

## DevTool - NodeJS Debugger

```
sudo npm install -g devtool

devtool app.js —break
```

## Less

[Less](http://lesscss.org/)

```
sudo npm install -g less

lessc styles.less styles.css
lessc styles.less ../css/styles.css
```

## Yarn

[Yarn](https://yarnpkg.com/en/)

```
npm install -g yarn

yarn -v
```

## uglifyjs

```
sudo npm install uglify-js --global

uglifyjs mkdir.js -o mkdir.min.js
```

## Grunt

[Grunt](http://gruntjs.com/)

```
sudo npm install -g grunt-cli
sudo npm install -g grunt-init
```

```
grunt --version

grunt-cli v0.1.13
```

## Other

```
npm config list
npm config get prefix

npm list --global
npm list -g --depth=0
```





	
	
	
	