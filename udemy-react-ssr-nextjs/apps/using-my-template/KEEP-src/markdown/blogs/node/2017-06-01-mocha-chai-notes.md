---
meta-title: "Mocha Chai Notes | John Vincent"
meta-description: "John Vincent's Mocha Chai Notes"
meta-keywords: "Mocha, Chai"

title: "Mocha Chai Notes"
subtitle: "Mocha Chai Quick Reference"
lead: "Put in one place those pesky Mocha/Chai options."

category: [Mocha, Chai, Node, Express]
permalink: /node/mocha-chai-notes/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Mocha

* [Mocha](https://mochajs.org) is a test framework.
* [Chai](http://chaijs.com) is an assertion library.
* [Faker](https://www.npmjs.com/package/faker) fakes variable values.

## Install for Node

```
npm init
npm install --save-dev mocha
npm install --save-dev chai
npm install --save-dev chai-http
npm install --save-dev faker
```

```
Add to package.json

  "scripts": {
    "start": "node main.js",
    "test": "mocha",
    "test-2": "ENV_1=value1 ENV_2=true mocha"
  },
```

and then

```
npm start

npm test
```

### Basic Code

`main.js`

```
const Game = require("./game.js");
const Board = require("./board.js");

const board = new Board();
const game = new Game(board);

game.start();
```

`board.js`

```
class Board {
	constructor() {
		this.init();
	}

/*
* initial setup of the board model
*/
	init() {
		this.rows = [];
		for (var x = 0; x < 7; x++) {
			var row = [];
			for (var y = 0; y < 7; y++) {
				var legal = true;
				var occupied = true;
				if (!this.isLegal(x, y)) {
					legal = false;
					occupied = false;
				}
				if (x === 3 && y === 3) {
					occupied = false;
				}
				row.push({ legal: legal, occupied: occupied });
			}
			this.rows.push(row);
		}
	}

	/*
* empty the board model
*/
	empty_board() {
		this.rows = [];
		for (var x = 0; x < 7; x++) {
			var row = [];
			for (var y = 0; y < 7; y++) {
				var legal = true;
				var occupied = false;
				if (!this.isLegal(x, y)) {
					legal = false;
				}
				row.push({ legal: legal, occupied: occupied });
			}
			this.rows.push(row);
		}
	}

	/*
* The board is treated as a square, so the function is used to determine which squares are
* within the board
*/
	isLegal(row, column) {
		if (row < 0 || row > 6) {
			return false;
		}
		if (column < 0 || column > 6) {
			return false;
		}
		if (row === 0 || row === 1 || row === 5 || row === 6) {
			if (column === 0 || column === 1 || column === 5 || column === 6) {
				return false;
			}
		}
		return true;
	}

	isOccupied(row, column) {
		if (!this.isLegal(row, column)) {
			throw Error(`Exception in isOccupied(); row ${row} column ${column} is not legal`);
		}
		return this.rows[row][column].occupied;
	}

	setEmpty(row, column) {
		if (!this.isLegal(row, column)) {
			throw Error(`Exception in setEmpty(); row ${row} column ${column} is not legal`);
		}
		this.rows[row][column].occupied = false;
	}

	setOccupied(row, column) {
		if (!this.isLegal(row, column)) {
			throw Error(`Exception in setEmpty(); row ${row} column ${column} is not legal`);
		}
		this.rows[row][column].occupied = true;
	}

	/*
* Look for any legal move from (row, column)
*
* Return:
*    true => >= 1 legal move from (row, column) was found.
*    false => there are no legal moves from (row, column)
*/
	//    anyLegalFromMoves(row, column) {
	//        return this.isFromUpMoveLegal(row, column) ||
	//                this.isFromDownMoveLegal(row, column) ||
	//                this.isFromLeftMoveLegal(row, column) ||
	//                this.isFromRightMoveLegal(row, column);
	//    }

	makeMoveStatus(status, from_row, from_column, via_row, via_column, to_row, to_column, type) {
		return {
			status: status,
			from: { row: from_row, column: from_column },
			via: { row: via_row, column: via_column },
			to: { row: to_row, column: to_column },
			type: type,
		};
	}

	findMove(row, column, type) {
		for (let current = type; current < 5; current++) {
			if (current === 1) {
				if (this.isFromUpMoveLegal(row, column)) {
					return this.makeMoveStatus("OK", row, column, row - 1, column, row - 2, column, current);
				}
			} else if (current === 2) {
				if (this.isFromRightMoveLegal(row, column)) {
					return this.makeMoveStatus("OK", row, column, row, column + 1, row, column + 2, current);
				}
			} else if (current === 3) {
				if (this.isFromDownMoveLegal(row, column)) {
					return this.makeMoveStatus("OK", row, column, row + 1, column, row + 2, column, current);
				}
			} else if (current === 4) {
				if (this.isFromLeftMoveLegal(row, column)) {
					return this.makeMoveStatus("OK", row, column, row, column - 1, row, column - 2, current);
				}
			}
		}
		return { status: "None" };
	}

	/*
* 1. Verify from and to are the 2 tiles apart, on a straight line.
* 2. Calculate the tile between from & to.
* 3. Verify from tile is legal and is occupied.
* 4. Verify in between tile is legal and is occupied.
* 5. Verify to tile is legal and is not occupied.
* 6. Update data model:
* 6a. Set from tile to empty
* 6b. Set in between tile to empty
* 6c. Set to tile to occupied.
*/
	makeMove(move) {
		//        console.log(">>> makeMove; move "+JSON.stringify(move));
		let { status, from, to, via } = move;
		if (status !== "OK") {
			throw Error(`Exception in makeMove(); move ${move} is invalid status`);
		}

		if (!this.isLegal(from.row, from.column) || !this.isOccupied(from.row, from.column)) {
			// 3
			throw Error(`Exception in makeMove(); from in ${move} is invalid`);
		}
		if (!this.isLegal(via.row, via.column) || !this.isOccupied(via.row, via.column)) {
			// 4
			throw Error(`Exception in makeMove(); via in ${move} is invalid`);
		}
		if (!this.isLegal(to.row, to.column) || this.isOccupied(to.row, to.column)) {
			// 5
			throw Error(`Exception in makeMove(); to in ${move} is invalid`);
		}

		this.setEmpty(from.row, from.column); // 6a
		this.setEmpty(via.row, via.column); // 6b
		this.setOccupied(to.row, to.column); // 6c

		//        console.log("<<< makeMove; move "+JSON.stringify(move));
		return true;
	}

	deleteMove(move) {
		//        console.log(">>> deleteMove; move "+JSON.stringify(move));
		let { status, from, to, via } = move;
		if (status !== "OK") {
			throw Error(`Exception in deleteMove(); move ${move} is invalid status`);
		}
		this.setOccupied(from.row, from.column);
		this.setOccupied(via.row, via.column);
		this.setEmpty(to.row, to.column);
		//        console.log("<<< deleteMove; move "+JSON.stringify(move));
	}

	isFromUpMoveLegal(row, column) {
		return (
			this.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			this.isLegal(row - 1, column) &&
			this.isOccupied(row - 1, column) &&
			this.isLegal(row - 2, column) &&
			!this.isOccupied(row - 2, column)
		);
	}
	isFromRightMoveLegal(row, column) {
		return (
			this.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			this.isLegal(row, column + 1) &&
			this.isOccupied(row, column + 1) &&
			this.isLegal(row, column + 2) &&
			!this.isOccupied(row, column + 2)
		);
	}
	isFromDownMoveLegal(row, column) {
		return (
			this.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			this.isLegal(row + 1, column) &&
			this.isOccupied(row + 1, column) &&
			this.isLegal(row + 2, column) &&
			!this.isOccupied(row + 2, column)
		);
	}
	isFromLeftMoveLegal(row, column) {
		return (
			this.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			this.isLegal(row, column - 1) &&
			this.isOccupied(row, column - 1) &&
			this.isLegal(row, column - 2) &&
			!this.isOccupied(row, column - 2)
		);
	}
}

module.exports = Board;
```

### Basic Tests

Test files go in folder test

For example, `test-board.js`

```
const Board = require("../board");

require("chai").should();

var expect = require("chai").expect;

describe("test Board.isLegal()", function() {
	it("isLegal() should return boolean", function() {
		let board = new Board();
		let ans = board.isLegal(-1, -1);
		ans.should.be.a("boolean");
		ans.should.equal(false);
	});

	it("isLegal() should understand legal tiles", function() {
		let board = new Board();

		for (let row = -3; row < 10; row++) {
			for (let col = -5; col < 11; col++) {
				if (row < 0 || row > 6 || col < 0 || col > 6) {
					board.isLegal(row, col).should.equal(false);
					continue;
				}
				if (row === 0 || row === 1 || row === 5 || row === 6) {
					if (col === 0 || col === 1 || col === 5 || col === 6) {
						board.isLegal(row, col).should.equal(false);
						continue;
					}
				}
				board.isLegal(row, col).should.equal(true);
			}
		}
	});
});

describe("testBoard.isOccupied()", function() {
	it("isOccupied(-1, -1) should throw Error", function() {
		expect(function() {
			new Board().isOccupied(-1, -1);
		}).to.throw(Error);
	});

	it("isOccupied(-1, 3) should throw Error", function() {
		expect(function() {
			new Board().isOccupied(-1, 3);
		}).to.throw(Error);
	});

	it("isOccupied(3, -1) should throw Error", function() {
		expect(function() {
			new Board().isOccupied(3, -1);
		}).to.throw(Error);
	});

	it("isOccupied(3, -1) should not throw Error", function() {
		expect(function() {
			new Board().isOccupied(3, 3);
		}).to.not.throw(Error);
	});

	it("isOccupied(3, 3) of a legal tile should return boolean", function() {
		new Board().isOccupied(3, 3).should.be.a("boolean");
	});

	it("isOccupied() should understand initial setup", function() {
		let board = new Board();

		for (let row = -3; row < 10; row++) {
			for (let col = -5; col < 11; col++) {
				if (row < 0 || row > 6 || col < 0 || col > 6) {
					continue;
				}
				if (row === 0 || row === 1 || row === 5 || row === 6) {
					if (col === 0 || col === 1 || col === 5 || col === 6) {
						continue;
					}
				}
				if (row === 3 && col === 3) {
					board.isOccupied(row, col).should.equal(false);
				} else {
					board.isOccupied(row, col).should.equal(true);
				}
			}
		}
	});
});

describe("testBoard.setEmpty()", function() {
	it("setEmpty(-1, -1) should throw Error", function() {
		expect(function() {
			new Board().setEmpty(-1, -1);
		}).to.throw(Error);
	});

	it("setEmpty(-1, 3) should throw Error", function() {
		expect(function() {
			new Board().setEmpty(-1, 3);
		}).to.throw(Error);
	});

	it("setEmpty(3, -1) should throw Error", function() {
		expect(function() {
			new Board().setEmpty(3, -1);
		}).to.throw(Error);
	});

	it("setEmpty(3, -1) should not throw Error", function() {
		expect(function() {
			new Board().setEmpty(3, 3);
		}).to.not.throw(Error);
	});

	it("setEmpty(2, 3) of a legal tile should return boolean", function() {
		new Board().isOccupied(2, 3).should.be.a("boolean");
	});

	it("setEmpty(2, 3) of an occupied tile should return empty", function() {
		let board = new Board();
		board.isOccupied(2, 3).should.equal(true);
		board.setEmpty(2, 3);
		board.isOccupied(2, 3).should.equal(false);
	});

	it("setEmpty() should understand initial setup", function() {
		let board = new Board();

		for (let row = -3; row < 10; row++) {
			for (let col = -5; col < 11; col++) {
				if (row < 0 || row > 6 || col < 0 || col > 6) {
					continue;
				}
				if (row === 0 || row === 1 || row === 5 || row === 6) {
					if (col === 0 || col === 1 || col === 5 || col === 6) {
						continue;
					}
				}
				board.setEmpty(row, col);
				board.isOccupied(row, col).should.equal(false);
			}
		}
	});
});

describe("testBoard.setOccupied()", function() {
	it("setOccupied(-1, -1) should throw Error", function() {
		expect(function() {
			new Board().setOccupied(-1, -1);
		}).to.throw(Error);
	});

	it("setOccupied(-1, 3) should throw Error", function() {
		expect(function() {
			new Board().setOccupied(-1, 3);
		}).to.throw(Error);
	});

	it("setOccupied(3, -1) should throw Error", function() {
		expect(function() {
			new Board().setOccupied(3, -1);
		}).to.throw(Error);
	});

	it("setOccupied(3, -1) should not throw Error", function() {
		expect(function() {
			new Board().setOccupied(3, 3);
		}).to.not.throw(Error);
	});

	it("setOccupied(3, 3) of an occupied tile should return occupied", function() {
		let board = new Board();
		board.isOccupied(3, 3).should.equal(false);
		board.setOccupied(3, 3);
		board.isOccupied(3, 3).should.equal(true);
	});

	it("setEmpty() should understand initial setup", function() {
		let board = new Board();

		for (let row = -3; row < 10; row++) {
			for (let col = -5; col < 11; col++) {
				if (row < 0 || row > 6 || col < 0 || col > 6) {
					continue;
				}
				if (row === 0 || row === 1 || row === 5 || row === 6) {
					if (col === 0 || col === 1 || col === 5 || col === 6) {
						continue;
					}
				}
				board.setEmpty(row, col);
				board.isOccupied(row, col).should.equal(false);
			}
		}
	});
});
```

## Install for Server

```
npm install --save-dev mocha
npm install --save-dev chai
npm install --save-dev chai-http
npm install --save-dev faker
```

Note that faker is not required, but I use it so frequently that I always just add it.

Other changes to `package.json`

```
"scripts": {
  "start": "nodemon server.js",
  "test": "mocha ./test",
  "devtool-app": "devtool server.js",
  "devtool-test": "devtool ./node_modules/mocha/bin/_mocha ./test"
},
```

Note, if deploying to Heroku, do not use `nodemon`

```
  "scripts": {
      "start": "node server.js",
      "test": "mocha ./test",
      "devtool-app": "devtool server.js",
      "devtool-test": "devtool ./node_modules/mocha/bin/_mocha ./test"
  },
```

Heroku does not load the environment before starting mocha, thus

```
"test": "MY-KEY=value mocha ./test"
```

To run all tests in sub-folders

```
"test": "mocha --recursive ./test"
```

### Run

Mocha recursively looks for `.js` files in a test folder

```
npm test
```

To setup Mocha tests in Visual Studio Code, please see [my notes](/visual-studio-code/)

## Set Order of Mocha Tests

`package.json`

```
"test": "mocha ./test"
```

Include the tests in the order you want to run them, for example

`test/test-all.js`

```
require('./app/test-app');
require('./base/test-1');
require('./search/test-search');
```

* `test/utils/data.js` contains test data as Json.
* `test/utils/check.js` verifies the data structures are correct.

As a best practice, use the following pattern to describe each test

```
describe('test-countArticles; Test SubscriptionUtils::countArticles', function() {
```

* `test-countArticles`; file name containing the tests
* `Test SubscriptionUtils::countArticles`; what is being tested.


## Select Tests

Run tests in a describe/it block

```
describe.only
it.only
```

Skip a block/it

```
describe.skip
it.skip
```

## Code

```
retrieveUserSubscription(url, userSubscriptions) {
    return url && userSubscriptions && userSubscriptions.length ?
        userSubscriptions.find(test => test.url === url)
        : undefined;
}
```

which will return undefined for unexpected conditions.

The test case could just check for undefined.

An alternative is to throw an exception.

### Exceptions

For example:

```
class SubscriptionUtils {

retrieveSubscription(url, allSubscriptions) {
    if (url && allSubscriptions && allSubscriptions.length) {
        return allSubscriptions.find(test => test.url === url);
    }
    throw Error('Exception in SubscriptionUtils::retrieveSubscription');
  }
}
```

test code:

```
expect(function() { subscriptionUtils.retrieveSubscription(url, null); }).to.throw('Exception in SubscriptionUtils::retrieveSubscription');
expect(function() { subscriptionUtils.retrieveSubscription(null, _subscriptions); }).to.throw('Exception in SubscriptionUtils::retrieveSubscription');
expect(function() { subscriptionUtils.retrieveSubscription(null, null); }).to.throw('Exception in SubscriptionUtils::retrieveSubscription');

expect(function() { subscriptionUtils.retrieveSubscription(url, undefined); }).to.throw('Exception in SubscriptionUtils::retrieveSubscription');
expect(function() { subscriptionUtils.retrieveSubscription(undefined, _subscriptions); }).to.throw('Exception in SubscriptionUtils::retrieveSubscription');
expect(function() { subscriptionUtils.retrieveSubscription(undefined, undefined); }).to.throw('Exception in SubscriptionUtils::retrieveSubscription');
```

```
try {}
catch(e) {
	e.should.be.an.instanceof(Error);
}
```

```
badInputs.forEach(function(input) {
  (function() {
      adder(input[0], input[1]);
  }).should.throw(Error);
```      
      
## Should

```
require('chai').should();
```

Common code usage

```
a.should.equal(1);
a.should.equal('abc');
ans.should.equal(false);
ans.should.equal(true);
a.should.be.false;
a.should.be.true;

res.body.id.should.be.null;
res.body.id.should.not.be.null;
sub_2.should.be.empty;
sub_1.should.not.be.empty;

res.should.be.html;

res.should.have.status(200);
res.body.length.should.be.at.least(1);
res.body.should.have.length.of(count);
res.should.have.status(200);
res.should.be.json;
res.body.should.be.a('array');

item.should.be.a('object');
item.should.include.keys(expectedKeys);

item.author.should.equal(`${blog.author.firstName} ${blog.author.lastName}`);

res.body.ingredients.should.include.members(newItem.ingredients);

res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
res.body.should.deep.equal(updateData);
 
(new Board()).isOccupied(3, 3).should.be.a('boolean');

```

## Expect

```
require('chai').expect();
```

```
expect(user.username).to.be.null;
expect(user.username).not.to.be.null;

expect(sub).to.be.defined;
expect(sub).be.undefined;

expect(user).to.be.an('object');
expect(sub_1).to.be.an('array');

expect(sub_1_2.title).to.be.equal('A');
expect(saved.length).to.be.equal(2);

expect(item.link).to.have.length.above(30);
expect(item.title).to.have.length.above(20);

```

## Assert

some day...

```
assert = require('assert')
```

## Avoid Time Outs

```
it('test long running test', () => {

}).timeout(150000);
```
