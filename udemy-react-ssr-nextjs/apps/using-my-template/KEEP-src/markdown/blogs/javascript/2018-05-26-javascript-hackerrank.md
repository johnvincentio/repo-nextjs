---
meta-title: "Javascript at HackerRank | John Vincent"
meta-description: "John Vincent's discussion on Javascript at HackerRank"
meta-keywords: "JavaScript, HackerRank"
title: "Javascript at HackerRank"
subtitle: ""
lead: "How to work efficiently with HackerRank Challenges"
category: [Javascript, Hackerrank, Visual Studio Code]
permalink: /javascript/hackerrank/
---

I have created a pattern to enable quicker challenge resolutions.

<!-- end -->

# HackerRank

[HackerRank](https://www.hackerrank.com)

[Visual Studio Code Notes](/visual-studio-code/)

[HackerRank Github](https://github.com/johnvincentio/hackerrank)

[Chai Notes](/blog/#Chai)

## Setup

Base: `~/MyDevelopment/github/ui/hackerrank`

I use this as the Visual Studio Code workspace.

Create development directories

```
cd ~/MyDevelopment/github/ui/hackerrank
src/easy
src/medium
src/hard
```

## ESLint Configuration

```
cd ~/MyDevelopment/github/ui/hackerrank
```

Create `.eslintrc.json`

```
{
	"extends": [
		"airbnb",
		"prettier"
	],
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

## Development

```
cd ~/MyDevelopment/github/ui/hackerrank
mkdir src
cd src

npm init

npm i chai --save-dev
npm i chai-http --save-dev
npm i faker --save-dev
npm i mocha --save-dev
npm i jsdoc --save-dev
```

## Create challenge

I have put all my HackerRank challenges into

```
⁨MyDevelopment/⁨github/⁨ui/⁨hackerrank⁩/src/{challenge-difficulty}/{challenge-name}
```

`challenge-difficulty` is type `easy`, `medium`, `hard`


## Basic Template

```

/*
{Challenge URL}

{Challenge name}
*/

/* eslint-disable no-plusplus */

const convert = {};

let inputString = '';
let currentLine = 0;

function readLine() {
	console.error('inputString[currentLine] ', inputString[currentLine]);
	return inputString[currentLine++];
}

function minimumDistances(a) {}	// replace from challenge

convert.main = function main(input) {
	currentLine = 0;
	inputString = input;

/* insert from challenge */

	console.log(`result ${result}\n`);
	return result;
}

module.exports = convert;
```

or

```
function main(input) {
	currentLine = 0;
	inputString = input;

/* insert from challenge */

	console.log(`result ${result}\n`);
	return result;
}

module.exports = {
	main,
	anotherFunction
};
```

### Code

Copy the template to `a.js` and begin work.

Run the app to verify it runs:

```
node a
```

### Console Messages

To see console messages, use `console.error`

For example:

```
console.error('t1 ', t1, ' t2 ', t2);
```

## Unit Test Code

The above technique allows for the creation of unit tests.

Each challenge has sample input and outputs.

Use `const input` for the `sample input`

Verify the `result` using `chai`

Always add unit tests to cover every condition described.

### Basic Template for Unit Tests

Copy to `test/test.js`

```

/* global describe, it */

const should = require('chai').should();

const a = require('../a');

describe('test', () => {
	it('1', () => {
		const input = [
			'8',
			'1 2 3 4 3 3 2 1'
		];
		const result = a.main(input);
		result.should.be.a('array');
		result.length.should.equal(4);
		result[0].should.equal(8);
		result[1].should.equal(6);
		result[2].should.equal(4);
		result[3].should.equal(1);
	});

	it('2', () => {
		const input = [
			'6',
			'5 4 4 2 2 8'
		];
		const result = a.main(input);
		result.should.be.a('array');
		result.length.should.equal(4);
		result[0].should.equal(6);
		result[1].should.equal(4);
		result[2].should.equal(2);
		result[3].should.equal(1);
	});
});

describe('test', () => {
	it('1', () => {
		const input = [
			'6',
			'7 1 3 4 1 7'
		];
		const result = a.main(input);
		result.should.equal(3);
	});
});

```

### Run the Unit Tests

Create script `mocha` to run the unit tests

```
../../node_modules/mocha/bin/mocha test
```

To run the tests

```
./mocha
```

## Use Debugger

* Debug icon (left nav)
* Gear icon (top of debug view)
* Which edits `launch.json`

Add the following configuration

```
{
  "name": "name-of-challenge",
  "type": "node",
  "request": "launch",
  "program": "${workspaceRoot}/src/node_modules/mocha/bin/_mocha",
  "stopOnEntry": false,
  "args": ["src/{difficulty}/name-of-challenge/test/**/*.js", "--no-timeouts"],
  "cwd": "${workspaceRoot}",
  "runtimeExecutable": null,
  "env": { "NODE_ENV": "testing" }
},
```

* Debug view (top nav)
* Set a `breakpoint`.
* Select `Run name-of-challenge`
* Click on the green arrow icon to start debugging.

## Unlock a Testcase

This is necessary sometimes as I cannot possibly think of, or code the vast array of use cases.

```
cd test
mkdir testcase-{test case number}
```

* Unlock a test case
* Select `Download`, which opens the data in a new browser tab
* Copy data to `test/testcase-{test case number}/input.txt

Create `test/test-case-{test case number}.js`

### Basic Template

```

/* global describe, it, before */

/*
{URL of data download}

test case {test case number}
*/

/* eslint-disable no-plusplus */

const fs = require('fs');
const should = require('chai').should();

const a = require('../a');

const ide = false;	// true if using Visual Studio Code debugger
const inputFilename = ide ? 
	'./src/{challenge-difficulty}/{challenge-name}/test/testcase-{test case number}/input.txt' :
	'./test/testcase-{test case number}/input.txt';

const outputFilename = ide ? 
	'./src/{challenge-difficulty}/{challenge-name}/test/testcase-{test case number}/input.txt' :
	'./test/testcase-{test case number}/output.txt';

let inputString = null;
let outputString = null;

describe('testcase-{test case number}', () => {
	before(() => {
		const alpha = fs.readFileSync(inputFilename).toString();
		inputString = alpha
			.trim()
			.split('\n')
			.map(str => str.trim());
	});

	it('1', () => {
		const result = a.main(inputString);
		result.should.equal(110198);
	});
});

describe('testcase-{test case number}', () => {
	before(() => {
		const alpha = fs.readFileSync(inputFilename).toString();
		inputString = alpha
			.trim()
			.split('\n')
			.map(str => str.trim());

		const beta = fs.readFileSync(outputFilename).toString();
		outputString = beta
			.trim()
			.split('\n')
			.map(str => str.trim());
	});

	it('1', () => {
		const result = a.main(inputString);
		result.should.be.a('array');
		result.length.should.equal(outputString.length);
		for (let cnt = 0; cnt < outputString.length; cnt++) {
			result[cnt].should.equal(outputString[cnt]);
		}
	});
});

```




