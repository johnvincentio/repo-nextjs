---
meta-title: "JSHint Cheat Sheet | John Vincent"
meta-description: "John Vincent's Jshint Cheat Sheet"
meta-keywords: "JSHint"
title: "JSHint Cheat Sheet"
subtitle: "Quick JSHint Reference"
lead: "Put in one place those pesky JSHint options."

category: [Jshint]
permalink: /general/jshint-options/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# JSHint Options

[JSHint](http://jshint.com/)
[JSHint Options Reference](http://jshint.com/docs/options/)


## .jshintrc

I usually start a project with:

```
{
    "node" : false,
    "browser" : true,
    "jquery" : true,
    "strict" : true,
    "unused" : true,
    "jasmine" : true,
    "globals": {
        "$": false,
        "jQuery": false
  }
}
```

or:

```
{
    "node" : true,
    "browser" : false,
    "jquery" : false,
    "strict" : true,
    "unused" : true,
    "globals": {
  }
}
```

## Inline configuration

```
Used for node:
/* jshint esnext: true */
/* jshint node: true */
/* global require */

Useful for those pesky templates:
/* jshint multistr: true */

Used a lot for Mocha/Chai:
/* jshint expr: true */
/* global describe, it*/
/* global describe, it, before, after */


/* globals $:false */

/* jshint browser: true */

/* global define: false */

/* jshint strict:false */

/* jshint validthis: true */

/* jshint -W018 */

Disable warning, and then enable the warning.
/* jshint -W034 */
/* jshint +W034 */
           
/* jshint unused: false */
/* jshint unused: true */

/* jshint evil:true */

/* jshint browser: true, strict: true, undef: true */    

// Code here will be linted with JSHint.
/* jshint ignore:start */
// Code here will be ignored by JSHint.
/* jshint ignore:end */
// Code here will be linted with JSHint.

```


### Defaults

```
{
    // JSHint Default Configuration File (as on JSHint website)
    // See http://jshint.com/docs/ for more details

    "maxerr"        : 50,       // {int} Maximum error before stopping

    // Enforcing
    "bitwise"       : false,     // true: Prohibit bitwise operators (&, |, ^, etc.)
    "camelcase"     : false,     // true: Identifiers must be in camelCase
    "curly"         : false,     // true: Require {} for every new block or scope
    "eqeqeq"        : true,     // true: Require triple equals (===) for comparison
    "forin"         : true,     // true: Require filtering for..in loops with obj.hasOwnProperty()
    "freeze"        : true,     // true: prohibits overwriting prototypes of native objects such as Array, Date etc.
    "immed"         : false,    // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
    "indent"        : 2,        // {int} Number of spaces to use for indentation
    "latedef"       : true,     // true: Require variables/functions to be defined before being used
    "newcap"        : true,     // true: Require capitalization of all constructor functions e.g. `new F()`
    "noarg"         : true,     // true: Prohibit use of `arguments.caller` and `arguments.callee`
    "noempty"       : false,    // true: Prohibit use of empty blocks
    "nonbsp"        : true,     // true: Prohibit "non-breaking whitespace" characters.
    "nonew"         : false,    // true: Prohibit use of constructors for side-effects (without assignment)
    "plusplus"      : false,    // true: Prohibit use of `++` & `--`
    "quotmark"      : "single", // Quotation mark consistency:
                                //   false    : do nothing (default)
                                //   true     : ensure whatever is used is consistent
                                //   "single" : require single quotes
                                //   "double" : require double quotes
    "undef"         : true,     // true: Require all non-global variables to be declared (prevents global leaks)
    "unused"        : true,     // true: Require all defined variables be used
    "strict"        : true,     // true: Requires all functions run in ES5 Strict Mode
    "maxparams"     : false,    // {int} Max number of formal params allowed per function
    "maxdepth"      : 3,        // {int} Max depth of nested blocks (within functions)
    "maxstatements" : false,    // {int} Max number statements per function
    "maxcomplexity" : false,    // {int} Max cyclomatic complexity per function
    "maxlen"        : false,    // {int} Max number of characters per line

    // Relaxing
    "asi"           : false,     // true: Tolerate Automatic Semicolon Insertion (no semicolons)
    "boss"          : false,     // true: Tolerate assignments where comparisons would be expected
    "debug"         : false,     // true: Allow debugger statements e.g. browser breakpoints.
    "eqnull"        : false,     // true: Tolerate use of `== null`
    "es5"           : false,     // true: Allow ES5 syntax (ex: getters and setters)
    "esnext"        : false,     // true: Allow ES.next (ES6) syntax (ex: `const`)
    "moz"           : false,     // true: Allow Mozilla specific syntax (extends and overrides esnext features)
                                 // (ex: `for each`, multiple try/catch, function expression…)
    "evil"          : false,     // true: Tolerate use of `eval` and `new Function()`
    "expr"          : false,     // true: Tolerate `ExpressionStatement` as Programs
    "funcscope"     : false,     // true: Tolerate defining variables inside control statements
    "globalstrict"  : false,     // true: Allow global "use strict" (also enables 'strict')
    "iterator"      : false,     // true: Tolerate using the `__iterator__` property
    "lastsemic"     : false,     // true: Tolerate omitting a semicolon for the last statement of a 1-line block
    "laxbreak"      : false,     // true: Tolerate possibly unsafe line breakings
    "laxcomma"      : false,     // true: Tolerate comma-first style coding
    "loopfunc"      : false,     // true: Tolerate functions being defined in loops
    "multistr"      : false,     // true: Tolerate multi-line strings
    "noyield"       : false,     // true: Tolerate generator functions with no yield statement in them.
    "notypeof"      : false,     // true: Tolerate invalid typeof operator values
    "proto"         : false,     // true: Tolerate using the `__proto__` property
    "scripturl"     : false,     // true: Tolerate script-targeted URLs
    "shadow"        : true,      // true: Allows re-define variables later in code e.g. `var x=1; x=2;`
    "sub"           : false,     // true: Tolerate using `[]` notation when it can still be expressed in dot notation
    "supernew"      : false,     // true: Tolerate `new function () { ... };` and `new Object;`
    "validthis"     : false,     // true: Tolerate using this in a non-constructor function

    // Environments
    "browser"       : true,     // Web Browser (window, document, etc)
    "browserify"    : true,     // Browserify (node.js code in the browser)
    "couch"         : false,    // CouchDB
    "devel"         : true,     // Development/debugging (alert, confirm, etc)
    "dojo"          : false,    // Dojo Toolkit
    "jasmine"       : false,    // Jasmine
    "jquery"        : false,    // jQuery
    "mocha"         : true,     // Mocha
    "mootools"      : false,    // MooTools
    "node"          : true,     // Node.js
    "nonstandard"   : false,    // Widely adopted globals (escape, unescape, etc)
    "prototypejs"   : false,    // Prototype and Scriptaculous
    "qunit"         : false,    // QUnit
    "rhino"         : false,    // Rhino
    "shelljs"       : false,    // ShellJS
    "worker"        : false,    // Web Workers
    "wsh"           : false,    // Windows Scripting Host
    "yui"           : false,    // Yahoo User Interface

    // Custom Globals
    "globals"       : {
        "module": true
    }        // additional predefined global variables
}
```