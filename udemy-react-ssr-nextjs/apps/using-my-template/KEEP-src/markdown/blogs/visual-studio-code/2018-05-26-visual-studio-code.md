---
meta-title: "Mac Visual Studio Code | John Vincent"
meta-description: "John Vincent's installation and configuration of Visual Studio Code on a Mac"
meta-keywords: "Visual Studio, Editor, ESLint, Prettier, Webpack, React, Mocha, Express"

title: "Mac Visual Studio Code"
subtitle: "Installing and Configuring Visual Studio Code on a Mac"
lead: "Including configuration of ESLint, AirBnb, React, Express, Webpack and Prettier"

category: [Editor, Visual Studio Code, Eslint, Prettier, React]
permalink: /visual-studio-code/
---

There are also notes regarding debugging Express, Mocha and Webpack and Fixing ESLint errors.

<!-- end -->

# Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/)

[Visual Studio Code Shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)


Downloaded for Mac and installed.

## Command Line

```
"/Applications/Visual Studio Code.app/Contents/MacOS/Electron" <your-workspace>
```

## Preferences

For Mac, preferences file is

`/Users/jv/Library/Application Support/Code/User/settings.json`

which is currently

```
{
  "editor.renderIndentGuides": false,
  "window.zoomLevel": -1,
  "editor.tabSize": 2,
  "editor.insertSpaces": false,
  "editor.detectIndentation": false,
  "prettier.useTabs": true,
  "prettier.trailingComma": "es5",
  "prettier.tabWidth": 2,
  "prettier.printWidth": 120,
  "prettier.eslintIntegration": true,
  "prettier.singleQuote": true
}
```

The workspace settings file is located in your project at

`.vscode/settings.json`

## Basic Commands

* show all command: `shift+command+p`
* go to file: `command p`
* find in files: `shift command f`
* start debugging: `f5`
* toggle terminal: &#94;&#96;
* reformat code: `Shift Option F`

* Help
	* command p
		* ?


* List commands
	* command p
		* ?
		* &gt;


* Find a symbol
	* command p
		* ?
		* \#


## Extensions

To install an extension

* View
* Extensions
* Search for the plugin
	* Install

Installed the following:

- Bookmarks
- Debugger for Chrome
- ESLint Plugin
- gitignore
- Guides
- Import Cost
- JavaScript ES6 Snippets
- jQuery code snippets
- Moche Latte
- Npm `(egamma)`
- Npm intellisense
- Open in Browser
- Path IntelliSense - Autocompletes filenames in your code.
- Prettier - Code formatter
- PrintCode
- REST Client
- Search `node_modules` - Quickly search for node modules in your project.
- To Do Tasks

### To Print Code

* `View`
* `Command Palette`
* `PrintCode`

File is converted to Html and is shown in a browser from which it can be printed.

## ESLint

To find eslint package, [see npm search](https://www.npmjs.com/search?q=eslint)

I have chosen to use airbnb eslint. [Ref for details](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

### Configure a project

I have chosen to configure ESlint on a per project basis.

Add to `package.json`, notice the versions:

```
"devDependencies": {
"eslint": "^4.9.0",
"eslint-config-airbnb": "^16.1.0",
"eslint-loader": "^1.9.0",
"eslint-plugin-import": "^2.7.0",
"eslint-plugin-jsx-a11y": "^6.0.2",
"eslint-plugin-react": "^7.4.0"
}
```

If using Prettier, also add:

```
"eslint-config-prettier": "^2.9.0",
```

get packages

```
npm install
```

Re-open the workspace.


### Base Node ESLint Configuration

Create `.eslintrc.json`

```
{
  "extends": ["airbnb", "prettier"],
  "env": {
    "node": true,
    "browser": false,
    "es6": true
  },
  "globals": {},
  "rules": {
    "no-console": 0,
    "max-len": [
      "error",
      {
        "code": 120,
        "tabWidth": 2,
        "comments": 120
      }
    ],
    "indent": [2, "tab", { "SwitchCase": 1 }],
    "no-tabs": 0
  },
  "plugins": []
}
```

### Base React ESLint Configuration

Create `.eslintrc.json` in client

```
{
  "extends": ["airbnb", "prettier", "prettier/react"],
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "globals": {},
  "rules": {
    "no-console": 0,
    "max-len": [
      "error",
      {
        "code": 120,
        "tabWidth": 2,
        "comments": 120,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignorePattern": "^import\\s.+\\sfrom\\s.+;$"
      }
    ],
    "indent": [2, "tab", { "SwitchCase": 1 }],
    "no-tabs": 0,
    "react/jsx-indent": ["off", 2],
    "react/jsx-indent-props": ["off", 2],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["to"]
      }
    ],
    "react/destructuring-assignment": ["off", "always"]
  },
  "plugins": ["react", "jsx-a11y", "import"]
}
```

### Base Express ESLint Configuration

Create `.eslintrc.json` in server

```
{
	"extends": "airbnb",
	"env": {
		"node": true,
		"browser": false,
		"es6": true
	},
	"globals": {},
	"rules": {
		"indent": [2, "tab"],
		"no-tabs": 0,
		"react/jsx-indent": ["off", 2],
		"react/jsx-indent-props": ["off", 2]
	},
	"plugins": []
}
```

Notice the `extends` clause.

### Base Browser ESLint Confiruation

Create `.eslintrc.json`

```
{
	"extends": [
		"airbnb",
		"prettier"
	],
	"env": {
		"node": false,
		"browser": true,
		"es6": false,
		"jquery": true
	},
	"globals": {},
	"rules": {
		"no-console": 0,
		"max-len": [
			"error",
			{
				"code": 120,
				"tabWidth": 2,
				"comments": 120
			}
		],
		"indent": [
			2,
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"no-tabs": 0
	},
	"plugins": []
}
```

Notice the `jquery` clause

### Configuring ESLint

[ESLint User Guide](http://eslint.org/docs/user-guide/configuring) is an excellent source. There are a vast number of options, too many to discuss here.

## Useful Eslint commands

Add to package.json scripts

### Eslint Versions

```
"eslint-versions": "npm info eslint-config-airbnb@latest peerDependencies",
```

will list the latest peer dependencies. Useful for checking which package versions to include.

### Eslint / Prettier Configuration Check

```
"eslint-check": "eslint --print-config . | eslint-config-prettier-check"
```

checks your eslint configuration looking for inconsistencies between your eslint and prettier configurations. Useful if you are having difficulties with Prettier.

### Eslint Your Code

```
"lint": "eslint 'src/**/*.{js,jsx}' --quiet",
```

performs eslint on all code in `src` and its subfolders. All messages are written to stdout. Useful for viewing all eslint problems in one place.

Note that folders may be ignored using `.eslintignore`

For example

```
node_modules
```

## Removing ESLint errors

Switching directly to airbnb eslint, for one project, created far too many errors.

Thus, for this project, I chose to configure two linters

* UI code
* Node code

`.eslintrc.json` in project root

```
{
  "env": {
    "node": true,
    "browser": false,
    "es6": true
  },
  "globals": {
  },
  "rules": {
    "eqeqeq": 1,
    "strict":"off",
    "no-console": "off",
    "camelcase": "off",
    "no-unused-expressions": "off",
    "indent": "off",
    "comma-dangle": "off",
    "object-curly-spacing": "off",
    "import/newline-after-import": "off",
    "prefer-const":"off",
    "no-var":"off",
    "space-before-function-paren": "off",
    "quotes":"off",
    "prefer-template":"off",
    "space-infix-ops":"off",
    "quote-props":"off",
    "arrow-parens": "off",
    "consistent-return":"off",
    "guard-for-in":"off",
    "arrow-spacing":"off",
    "object-property-newline":"off",
    "no-underscore-dangle":"off",
    "prefer-arrow-callback":"off",
    "brace-style":"off",
    "func-names":"off",
    "class-methods-use-this":"off",
    "no-path-concat":"off",
    "no-param-reassign":"off",
    "space-unary-ops":"off",
    "max-len":"off",
    "padded-blocks":"off",
    "no-multiple-empty-lines":"off",
    "vars-on-top":"off",
    "no-unused-vars":"off"
  },
  "plugins": [
  ],
  "extends": "airbnb"
}
```

`root/public/js/.eslintrc.json`

```
{
  "env": {
    "node": false,
    "browser": true,
    "jquery": true
  },
  "globals": {
  },
  "rules": {
    "eqeqeq": 1,
    "no-console": "off",
    "camelcase": "off",
    "no-unused-expressions": "off",
    "indent": "off",
    "comma-dangle": ["off"],
    "prefer-arrow-callback": "off",
    "strict": "off",
    "no-var": "off",
    "vars-on-top": "off",
    "prefer-template": "off",
    "quotes": "off",
    "quote-props": "off",
    "space-infix-ops": "off",
    "space-before-function-paren": "off",
    "object-curly-spacing": "off",
    "no-shadow": "off",
    "brace-style": "off",
    "no-multiple-empty-lines": "off",
    "max-len": "off",
    "func-names": "off",
    "spaced-comment": "off",
    "wrap-life": "off",
    "no-multi-str": "off",
    "padded-blocks": "off",
    "wrap-iife": "off",
    "object-shorthand": "off"
  },
  "plugins": [
    //you can put plugins here
  ],
  "extends": "airbnb"
}
```

This removes all errors from the workspace.

### Fixing ESLint errors

Now I have time to remove the rules one-by-one, cleaning the code in an orderly manner.

## In Code Rules

```
/* eslint-env node, mocha */

/* global describe, it, before, beforeEach, after, afterEach */

/* global document */

/* global $ */
```

## Inline Code Rules

```
// eslint-disable-next-line no-multi-str
// eslint-disable-next-line no-plusplus

// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line react/prefer-stateless-function
// eslint-disable-next-line no-useless-constructor

// eslint-disable-next-line no-mixed-operators

// eslint-disable-next-line react/no-typos
// eslint-disable-next-line function-paren-newline

```

```
// eslint-disable-line no-param-reassign
// eslint-disable-line react/forbid-prop-types
// eslint-disable-line react/no-typos

```

Disable all occurrences within file

```
/* eslint-disable global-require */
/* eslint no-restricted-globals: ["off"] */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
```

Maximum length, set to 150 characters

```
/* eslint max-len: [2, 150, 4] */ // maximum length of 150 characters
```

```
function doSomething(event) {
  // eslint-disable-next-line no-console
  console.log(event.currentTarget.getAttribute('data-something'));
}
```


## Configuring Prettier Plugin

Thus can be a real pest seemingly frequently changing.

To change a Visual Studio Code preferences for all workspaces, edit preferences file.

For Mac, preferences file is

`/Users/jv/Library/Application Support/Code/User/settings.json`

If only wish to make the change for a workspace, change the workspace settings file which is located in your project at

`.vscode/settings.json`

The current setup appears to

1. `.vscode/settings.json`

```
{
  "editor.formatOnSave": true
}
```

2. Disable the Prettier plugin

3. .prettierrc

```
{
  "singleQuote": true,
  "tabWidth": 2
}
```

Add Format on Save

```
{
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	}
}
```

or for earlier versions of the linter

```
{
	"eslint.autoFixOnSave": true
}
```

or 

```
{
  "editor.formatOnSave": true
}
```

Edit `.eslintrc.json`

```
"extends": ["airbnb", "prettier"],
```

Beware of `max-len`. The following will break Prettier

```
"max-len": [2, 100, 4],
```

Use the following code instead:

```
"max-len": ["error", {
	"code": 100,
	"tabWidth": 2
}]
```

or, better yet

```
"max-len": ["error", {
	"code": 100,
	"tabWidth": 2,
	"comments": 100,
	"ignoreTrailingComments": true,
	"ignoreUrls": true,
	"ignorePattern": "^import\\s.+\\sfrom\\s.+;$"
}]
```

Restart Visual Studio Code to enable the changes.

### Prettier Plugin to Ignore Code

To ignore a piece of code, precede the code with

```
JavaScript
// prettier-ignore

JSX
{/* prettier-ignore */}

SCSS, CSS
/* prettier-ignore */

Markdown
<!-- prettier-ignore -->
```

To exclude files from formatting, add entries to the `.prettierignore` file in the project root.

## Prettier, Quotes or Double Quotes

By default, Prettier uses double quotes.

To override and use single quotes, create file `.prettierrc` in root folder and enter:

```
"prettier.singleQuote": true,
```

or false for double quotes.

## Debugger

#### Set conditional breakpoint

* Right click the breakpoint
* Enter the condition

## Debugging Node Application

For simple usage:

* Select `.js` file
* F5 to start the debugger.

To add a configuration:

* Debug icon (left nav)
* Gear icon (top of debug view)

Which creates a default `launch.json`

Use Add Configuration if necessary to get to the following

```
{
	"type": "node",
	"request": "launch",
	"name": "Run my Application",
	"program": "${workspaceRoot}/directory/file.js",
	"args": ["arg1", "arg2"],
	"env": {
		"ENV_1": "value1",
		"ENV_2": "value2"
	}
}
```
	
## Debugging Express Application

* Debug icon (left nav)
* Gear icon (top of debug view)

Which creates a default `launch.json`

Use Add Configuration if necessary to get to the following

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Attach to Process",
            "processId": "${command:PickProcess}",
            "port": 5858
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceRoot}/server.js"
        },
				{
					"type": "node",
					"request": "launch",
					"name": "Launch Create-Music-Data",
					"program": "${workspaceRoot}/create-music-data/create-all.js",
					"runtimeArgs": ["--max-old-space-size=8192"]
				}
    ]
}
```

* Open file to debugged and set a `breakpoint`.
* F5 to start debugging app

## Mocha

Install extensions

* [Mocha Latte](https://marketplace.visualstudio.com/items?itemName=cspotcode.vscode-mocha-latte)

To run tests:

* Command Palette (Shift+CMD+P)
* Mocha: Run all tests

### Debugging Mocha

* Debug icon (left nav)
* Gear icon (top of debug view)
* Which edits `launch.json`

Add the following configuration

```
{
// Name of configuration; appears in the launch configuration drop down menu.
	"name": "Run mocha",
// Type of configuration. Possible values: "node", "mono".
	"type": "node",
// Workspace relative or absolute path to the program.
	"program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",
// Automatically stop program after launch.
	"stopOnEntry": false,
// Command line arguments passed to the program.
	"args": ["test/**/*.js", "--no-timeouts"],
// Workspace relative or absolute path to the working directory of the program being debugged. Default is the current workspace.
	"cwd": "${workspaceRoot}",
// Workspace relative or absolute path to the runtime executable to be used. Default is the runtime executable on the PATH.
	"runtimeExecutable": null,
// Environment variables passed to the program.
	"env": { "NODE_ENV": "testing"}
},
```

* Debug view (top nav)
* Set a `breakpoint`.
* Select 'Run Mocha'
* Click on the green arrow icon to start debugging.

## Debugging Webpack

* Debug icon (left nav)
* Gear icon (top of debug view)

Which creates a default `launch.json`

For this example:

* `${workspaceRoot}` is VSCode root directory
* `webpack/play-4` is the root directory of the project code.

Use Add Configuration if necessary to get to the following

```
{
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "Run webpack",
        "program": "${workspaceRoot}/webpack/play-4/node_modules/.bin/webpack",
        "cwd": "${workspaceRoot}/webpack/play-4/",
        "args": [ 
          "--config",
					"${workspaceRoot}/webpack/play-4/webpack.config.js",
					"--context",
					"${workspaceRoot}/webpack/play-4",
					"--output-path",
					"${workspaceRoot}/webpack/play-4/dist"
        ]
      },
      {
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        "program": "${file}"
      }
    ]
}
```

* Open `webpack.config.js` and set a `breakpoint`.
* F5 to start debugging app

## Debugging Mocha / Webpack

* Debug icon (left nav)
* Gear icon (top of debug view)

Which creates a default `launch.json`

Use Add Configuration if necessary to get to the following

```
{
	"type": "node",
	"request": "launch",
	"name": "Run mocha",
	"program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",
	"stopOnEntry": true,
	"args": ["test/**/*.js", "--recursive", "--compilers", "js:babel-register", "--no-timeouts", "--devtool", "source-map"],
	"cwd": "${workspaceRoot}",
	"runtimeExecutable": null,
	"env": { "NODE_ENV": "testing"}
},
```

* Use debugger statements
* F5 to start debugging app

## Debugging React

This is easiest to perform with Chrome Developer Tools.

* Sources
* Webpack
* .
* find the source file
* Open the file
* Set breakpoints etc

## Debugging React with Enzyme and Jest

* Debug icon (left nav)
* Gear icon (top of debug view)

Which creates a default `launch.json`

Use Add Configuration if necessary to get to the following

```
{
	"type": "node",
	"request": "launch",
	"name": "Debug Enzyme Jest",
	"program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
	"args": ["-i"],
	"cwd": "${workspaceRoot}",
	"outFiles": ["${workspaceRoot}/dist/**/*"],
	"env": {
		"NODE_ENV": "development"
	},
	"envFile": "${workspaceRoot}/.env"
}
```

* Use debugger statements
* F5 to start debugging app

Note

* `args -i` causes jest to run tests asynchronously

## Using Chrome Inspector

Add to `package.json`

```
"scripts": {
	"inspect": "node --inspect src/main.js",
},
```

Set a breakpoint and run

```
npm run inspect
```

From Chrome browser

```
chrome://inspect
```

See

* Remote Target
* Click on your node app

### JavaScript CPU Profiler

* Profiler
* Start & Stop

Displays Functions by Total Time.

### Memory

* Heap Snapshot
* Take snapshot

Take multiple snapshots to determine where additonal resources are being accumulated.

* Allocation instrumentation on timeline
* Stop

Useful

* Summary, also with a timeline
* Class filter, find my code
* Statistics

