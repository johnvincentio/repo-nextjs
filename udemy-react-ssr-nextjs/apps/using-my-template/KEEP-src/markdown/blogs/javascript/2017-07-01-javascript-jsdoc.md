---
meta-title: "JSDoc | John Vincent"
meta-description: "John Vincent's discussion on JSDoc"
meta-keywords: "JSDoc"
title: "JSDoc"
subtitle: "Using JSDoc"
lead: "The de facto standard for documenting Javascript code."
category: [JSDoc, Javascript]
permalink: /javascript/using-jsdoc/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# JSDoc

[Use JSDoc](http://usejsdoc.org/)


## Installation and Usage

```
npm install jsdoc --save-dev
```

To JSDoc a single file

```
./node_modules/.bin/jsdoc myJavaScriptFile.js
```

### JSDoc Configuration

My standard JSDoc configuration file

`root/jsdoc.json`

```
{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "source": {
        "include": [ "server.js", "config/", "api/", "public/assets/js", "test/", "scripts/" ],
        "exclude": [ "node_modules" ],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": [],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false,
        "default": {
            "includeDate": false,
            "outputSourceFiles": true
        }
    },
    "opts": {
        "template": "templates/default",  // same as -t templates/default
        "encoding": "utf8",               // same as -e utf8
        "destination": "./jsdoc/",          // same as -d ./out/
        "recurse": true                  // same as -r
        // "tutorials": "path/to/tutorials" // same as -u path/to/tutorials
    }
}
```

Notice

* `"source":"include"` is an array of directories.
* `"recurse": true` will cause JSDoc to look for all `.js` files within those folders.
* `"includeDate": false` else every time you run JSDoc, all files will be changed, a real pain for git.

Note

* If using `jsdoc.json`, command line arguments do not work.
* Sometimes JSDoc runs but does nothing and says nothing about trouble.

The following options are useful for watching JSDoc

```
"opts": {
    "verbose": true,
    "debug": true
}
```

#### Run JSDoc

```
./node_modules/.bin/jsdoc -c ./jsdoc.json
```

To execute

```
npm run jsdoc
```

## `package.json`

Adding JSDoc as a script, for example

```
"scripts": {
	"start": "nodemon server.js",
	"test": "mocha ./test",
	"jsdoc": "./node_modules/.bin/jsdoc -c ./jsdoc.json"
}
```

To run JSDoc

```
npm run jsdoc
```

## Viewing JSDoc

In `project-root/jsdoc.json`, notice

```
"destination": "./jsdoc/"
```

In browser, open file `./jsdoc/index.html`


## Example JSDoc

Let's attempt to make some rules

### class

```
/**
 * Utility methods to handle tasks related to the Users object.
 * @class UserUtils
 * @requires SubscriptionUtils
 */
class UserUtils {
```

### `exports.module`

At the top

* list the module name
* list required modules

```
/**
 * Handle tasks related to the RSS feeds
 *
 * @module rssController
 * @requires SubscriptionModel
 * @requires RssFeeder
 * @requires RssUtils
 */
```

For each require. Sometimes these do not work.
 
```
/**
* @const SubscriptionModel
* @description Mongoose Model of a Mongo collection Subscription
*/
const {SubscriptionModel} = require('../subscription/subscription.model');
```
 
 or

```
/**
* @const EmailUtils
* @description Various methods for formatting and sending emails.
*/
const EmailUtils = require('../../config/email');
```

```
/** Module for getting a RSS Feed */
const RssFeeder = require('./rss.feeder');
```
 
### method

It may be necessary to use @method

```
/**
 * Returns user object for the passed username.
 *
 * @method update_all
 * @param {String} username - username to find
 * @param {Array} _users - all users
 * @return {object} - user object if found, else undefined.
 * @throws {Error} if arguments are not defined
 */
    getUserFromUsers(username, _users) {
        if (username && _users && _users.length) {
            return _users.find(item => username === item.username);
        }
        throw Error('Exception in UserUtils::getUserFromUsers');
    }
```

Note

```
@method update_all
@param {String} - always provide object type
@return {object} - always provide object type
@throws {Error} if arguments are not defined
```

### Mongoose Model

```
/**
 * Handle Mongoose tasks related to the Counter collection
 *
 * @module CounterModel
 * @requires mongoose
 */
```

### Router

```
/**
 * Handle tasks related to routing requests for user subscriptions
 *
 * @module userSubscriptionRouter
 * @requires express
 * @requires userSubscriptionController
 */
```

### Long description

```
/**
 * Delete an article.
 * <p>Articles are stored in user.saved or user.read, grouped by subscription.</p>
 * <p>The approach used here is to delete duplicates, if they exist.</p>
```

```
 * <pre>
 *    '0b' Base 2:   binary 
 *    '0q' Base 4:   quaternary 
 *    '0o' Base 8:   octal
 *    '0x' Base 16:  hexadecimal
 * </pre>
```

```
 * Requires one of the following: 
 * <ul style="list-style: none;">
 *  <li> '0b' Base 2:   binary 
 *  <li> '0q' Base 4:   quaternary 
 *  <li> '0o' Base 8:   octal
 *  <li> '0x' Base 16:  hexadecimal
 * </ul>
```

```
 * Returns a subscription from the users.subscription array with
 *          <ul><li>users.subscription.url = passed url.</li></ul>
```

```
 * Add subscription.channel to all user.subscription[].<br/>
 * Note that user.subscription.subscribed = true;
```

```
/**
 * Return the articles not read by the user, grouped by subscription.
 *
 * <p>Note that subscription object for which the user is subscribed, required additional properties:
 * <ul>
 *      <li>subscribed = true</li>
 *      <li>title = channel.title from subscription</li>
 * </ul>
 * </p>
 * <p>Performs the following:
 * <ul>
 * <li>1. Filter each subscription</li>
 * <li>2. Verify user is subscribed to this subscription</li>
 * <li>3. Set subscribed = true</li>
 * <li>4. Set title to User.subscription.title</li>
 * <li>5. Filter all articles in the subscription</li>
 * <li>6. Remove articles that have been read.</li>
 * <li>7. Remove articles that have been saved.</li>
 * <li>8. Remove subscription if there are no remaining articles</li>
 * <li>9. Return the list of subscriptions.
 * </ul>
 * </p>
 *
 * @param {object} user - user
 * @param {object} allSubscriptions - all subscriptions.
 * @return {array} - articles not read by the user, grouped by subscription.
 * @throws {Error} if arguments are not defined
 */
```










