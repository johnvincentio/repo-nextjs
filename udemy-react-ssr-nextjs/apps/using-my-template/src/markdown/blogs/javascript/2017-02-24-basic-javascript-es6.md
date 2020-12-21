---
meta-title: "Basic JavaScript ES6 | John Vincent"
meta-description: "Basic JavaScript ES6"
meta-keywords: "JavaScript ES6"

title: "Basic JavaScript ES6"
subtitle: ""
lead: "Basic JavaScript ES6"

category: [Javascript, Es6]
permalink: /javascript/basic-javascript-es6/
---

Lets discuss with examples.

<!-- end -->

# JavaScript ES6 / ES2015

[ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/)

[ES6 in Depth Articles](https://hacks.mozilla.org/category/es6-in-depth/)

Contents

* [Let and Const](/javascript/basic-javascript-es6/#let-and-const)
* [Loops](/javascript/basic-javascript-es6/#loops)
* [Blocks and IIFEs](/javascript/basic-javascript-es6/#blocks)
* [Strings](/javascript/basic-javascript-es6/#strings)
* [Arrow Functions](/javascript/basic-javascript-es6/#arrow-functions)
* [Arrow Function this keyword](/javascript/basic-javascript-es6/#arrow-functions-this-keyword)
* [Object Destructuring](/javascript/basic-javascript-es6/#object-destructuring)
* [Property value](/javascript/basic-javascript-es6/#property-value)
* [Spread](/javascript/basic-javascript-es6/#spread)
* [Object Assign](/javascript/basic-javascript-es6/#object-assign)
* [Modules](/javascript/basic-javascript-es6/#modules)
* [Classes](/javascript/basic-javascript-es6/#classes)
* [Subclasses](/javascript/basic-javascript-es6/#subclasses)
* [Rest parameters](/javascript/basic-javascript-es6/#rest-parameters)
* [Default Parameters](/javascript/basic-javascript-es6/#default-parameters)
* [Maps](/javascript/basic-javascript-es6/#maps)
* [Arrays](/javascript/basic-javascript-es6/#arrays)
* [Sets](/javascript/basic-javascript-es6/#sets)
* [Array reduce() method](/javascript/basic-javascript-es6/#array-reduce)
* [Babel Transpiler](/javascript/basic-javascript-es6/#babel)

<br/>

<a name="let-and-const"></a>

## Let and Const

Instead of var, use let and const

```
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6);
```

Variables defined with `var` are `function scoped`.

Variables defined with `let` and `const` are `block scoped`

```
// ES5
function driversLicence5(passedTest) {

    if (passedTest) {
        console.log(firstName);
        var firstName = 'Pete';
        var yearOfBirth = 1995;
    }
    console.log("driversLicence5; " + firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence5(true);

// ES6
function driversLicence6(passedTest) {
    //console.log(firstName);
    let firstName;
    const yearOfBirth = 1990;
    if (passedTest) {
        firstName = 'John';
    }
    console.log("driversLicence6; " + firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence6(true);
```

Another example

```
let i = 23;

for (let i = 0; i < 5; i++) {
    console.log(i);
}

console.log("after loop " + i);
```

which produces

```
0
1
2
3
4
after loop 23
```

as `let` is `block scoped`

<br/>

<a name="loops"></a>

## Loops


### for of loops

Introduced for ES6, addresses all of the major issues with `for in loops`

#### Iterating over an Array

```
let iterable = [2, 4, 7];
for (const value of iterable) {	// 2, 4, 7
  console.log(value);
}
```

#### Iterating over a String

```
let iterable = 'abc';
for (const value of iterable) {	// 'a', 'b', 'c'
  console.log(value);
}
```

#### Iterating over a Map

```
let iterable = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const entry of iterable) {	// ['a', 1], ['b', 2], ['c', 3]
  console.log(entry);
}

for (let [key, value] of iterable) {		// 1, 2, 3
  console.log(value);
}
```

#### Iterating over a Set

```
let iterable = new Set([1, 1, 2, 2, 3, 3]);
for (let value of iterable) {
  console.log(value);	// 1, 2, 3
}
```

#### Iterating over arguments object

```
(function() {
  for (let argument of arguments) {
    console.log(argument);			// 1, 2, 3
  }
})(1, 2, 3);
```


### for() loop

Loops allow you to iterate over collections and objects.

```
for (let i = 0; i < 4; i++) {	// 0,1,2,3
  console.log(i);
}
```

### for in loops

loops also iterate tgrough properties of an object. Use with objects where index order isn't important.

```
let obj = {"alpha":0, "beta":20};

for (let i in obj) {	// alpha, beta
  console.log(i);
}
```

### Array.forEach()

```
let arr = [2,4,7];
arr.forEach((i) => {	// 2, 4, 7
  console.log(i);
})
```

### while loops

```
let i = 0
while(i < 4) {		// 0, 1, 2, 3
  console.log(i);
  i++;
}
```

### do while loops

```
let i = 0
do {					// 0, 1, 2, 3
  console.log(i);
  i++;
} while(i < 4) {		
```





<br/>

<a name="blocks"></a>

## Blocks and IIFEs

```
// ES5
(function() {
    var c = 3;
})();

console.log(c);
```

which produces an error, as var c = 3 is not accessible outside of the IIFE.

```
// ES6
{
    const a = 1;
    let b = 2;
    var c = 5;
    console.log(a + b);
}

//console.log(a + b);		// would error
console.log(c);
```

which produces

```
3
5
```

as `var c = 5;` is function scoped.

<br/>

<a name="strings"></a>

## Strings

```
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2016 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j'));
console.log(n.endsWith('Sm'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5));
```

<br/>

<a name="arrow-functions"></a>

## Arrow Functions

```
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log("ages5 "+ages5);


// ES6

// one parameter
let ages6 = years.map(el => 2016 - el);
console.log("(1) ages6 "+ages6);

// two parameters
ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log("(2) ages6 "+ages6);

// two parameters, multi lines of code in the function
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`;     // return explicitly stated
});
console.log("(3) ages6 "+ages6);
```

ES5

```
function Person(name) {
    this.name = name;
}

Person.prototype.myFriends5 = function(friends) {

    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el;
    }.bind(this));

    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);
```

ES6

```
function Person(name) {
    this.name = name;
}

Person.prototype.myFriends6 = function(friends) {

    var arr = friends.map(el => `${this.name} is friends with ${el}`);

    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('Mike').myFriends6(friends);
```

<br/>

<a name="arrow-functions-this-keyword"></a>

## Arrow Function this keyword

In ES6, arrow functions do not have a this keyword. 

In ES6, arrow function shares the `this` keyword with the surrounding function.

ES5, this refers to the window object.

```
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
};
box5.clickMe();
```

ES6, this refers to calling object

```
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
};
box6.clickMe();
```

In this example, use of 2 arrow functions causes this to be global

```
// this is from the global object.
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
};
box66.clickMe();
```

Example

```
const fakeTitles = [
  'Pirate Of Reality',
  'Guardians Of Hell',
  'Witches With Vigor',
  'Spies And Heroes',
  'Robots And Kings',
];

const abbreviations = fakeTitles.map(
  title => title.toLowerCase().slice(0, 3));

// equivalent using non-arrow functions
const abbreviationsEs5 = fakeTitles.map(function(title) { return title.toLowerCase().slice(0, 3); });

console.log(abbreviations); // ['pir', 'gua', 'wit', 'spi', 'rob']
```

Note that the arrow function syntax can vary, depending on how many parameters the function takes

```
const items = ['milk', 'bread', 'eggs', 'oranges'];

// when no parameters
items.forEach(() => console.log('another item'));

// when one parameter, the parentheses are optional
items.forEach((item) => console.log(item));
items.forEach(item => console.log(item));

// when more than one parameter
items.forEach((item, index) => console.log('Index ' + index + ' is: ' + item));
```

<br/>

<a name="object-destructuring"></a>

## Object Destructuring

Destructuring assignment is a new way of assigning values contained in objects and arrays to new variables.

ES5

```
var john = ['John', 26];
var name = john[0];
var age = john[1];
```

ES6

```
const [name, age] = ['John', 26];
console.log(name);
console.log(age);
```

ES6

```
const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);
```

ES6

```
function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);
```

ES6

```
const myObj = {a: 'apple', b: 'bumblebee', c: 'cat'}
const {a, c} = myObj;				// destructuring
console.log(a); // => apple
console.log(c); // => cat
```

<br/>

<a name="property-value"></a>

## Property value

This is a convenient shorthand you can use when you need to create an object literal out of a set of variables, and you want to map variable names to keys. It is essentially the inverse of object destructuring.

ES6

```
const x = 1;
const y = 2;
const myObj = {x, y};

console.log(myObj);
```

produces

```
{ x: 1, y: 2 }
```

<br/>

<a name="spread"></a>

## Spread

* is a convenient way to expand elements of an array.
* provides a compact way to apply parameters to functions.

ES5

```
function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log("sum1 "+sum1);

var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log("sum2 "+sum2);
```

ES6

```
function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var ages = [18, 30, 12, 21];
const sum3 = addFourAges(...ages);      // literally spreads the parameters
console.log("sum3 "+sum3);
```

ES6

```
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);
```

```
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];

Array.from(all).forEach(cur => cur.style.color = 'purple');
```

```
function calcVolume(width, height, depth) {
    return width * height * depth;
}
let values = [10, 20, 30];
console.log(calcVolume(...values)); // => 6000
```

<br/>


<a name="object-assign"></a>

## Object Assign

The `Object.assign` method helps us manage merging objects. Properties from objects passed as the second, third, fourth, etc. arguments are merged into the object passed as the first argument.

ES6

```
const objA = {
  foo: 'foo',
  bar: 'bar'
};

const objB = {
  foo: 'something else',
  bizz: 'bizz',
  bang: 'bang'
};

// merges params 2-n into param 1
console.log(Object.assign({}, objA, objB));
```

produces

```
'{ foo: 'something else', bar: 'bar', bizz: 'bizz', bang: 'bang' }
```

<br/>

<a name="modules"></a>

## Modules

Modules allow you to split your code into multiple files, exporting objects from one file and importing them into another. Each module provides a single object for importing, which you can destructure to access the individual variables which were exported. For example:

```
// file_a.js
export const width = 10;
export const height = 5;
```

```
// file_b.js
import {width, height} from './file_a';
console.log(width, height);
```

```
// file_b.js
import {width as tableWidth, height as tableHeight} from './file_a';
console.log(tableWidth, tableHeight);
```

```
// file_b.js
import * as dimensions from './file_a';
console.log(dimensions.width, dimensions.height);
```

Each module can also export a single variable called default, which has a corresponding shorthand syntax for importing:

```
// file_a.js
export default function area(width, height) {
    return width * height;
}
```

```
// file_b.js
// Shorthand
import area from './file_a';
// Long version
import {default as area} from './file_a';
```

The default export is generally used to export the most important variable from a module. Notice how you don't need to destructure to access the default export.

<br/>

<a name="classes"></a>

## Classes

ES5

```
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
};

var john5 = new Person5('John', 1990, 'teacher');
```

ES6

```
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    static greeting() {
        console.log('Hey there!');
    }
}

const john6 = new Person6('John', 1990, 'teacher');

Person6.greeting();

john6.calculateAge();
```

Note that

```
john6.greeting();
```

will fail.

<br/>

<a name="subclasses"></a>

## Subclasses

ES5

```
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
};

var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olymicGames = olymicGames;
    this.medals = medals;
};

Athlete5.prototype = Object.create(Person5.prototype);


Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
};


var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();
```

ES6

```
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
```

Another example

```
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() {
        console.log(`${this.name} barks`);
    }
}

const lassie = new Dog('lassie', 'Rough collie');
lassie.speak(); // lassie barks
```

<br/>

<a name="rest-parameters"></a>

## Rest parameters

Combines parameters passed to the function into an array.

ES6

```
function isFullAge6(...years) {
    years.forEach(cur => console.log((2016 - cur) >= 18));
}

isFullAge6(1990, 1999, 1965, 2016, 1987);
```

ES6

```
function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log((2016 - cur) >= limit));
}

isFullAge6(16, 1990, 1999, 1965, 2016, 1987);
```

<br/>

<a name="default-parameters"></a>

## Default Parameters

ES5, parameters that are not set have a value of <b>undefined</b>

```
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'american' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
```

ES6

```
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');
```

<br/>

<a name="maps"></a>

## Map

`Map` is a data collection type in which data is stored in a form of pairs, which contains a unique key and value mapped to that key. And because of the uniqueness of each stored key, there is no duplicate pair stored.

Key-value data structure. The key can be any type, including a function.

The original order of elements is preserved.

Map is an instance of Object.

#### Examples

```
const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer');
question.set(false, 'Wrong, please try again!');

console.log(question.get('question'));
console.log(question.size);


if(question.has(4)) {
    question.delete(4);
    console.log('Answer 4 is here')
}

//question.clear();


question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));


for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));
```

#### Iterators

```
const myMap = new Map();
myMap.set(0, 'zero');
myMap.set(1, 'one');
for (const [key, value] of myMap) {
	console.log(`${key} = ${value}`);
}
// 0 = zero
// 1 = one

for (const key of myMap.keys()) {
	console.log(key);
}
// 0
// 1

for (const value of myMap.values()) {
	console.log(value);
}
// zero
// one

for (const [key, value] of myMap.entries()) {
	console.log(`${key} = ${value}`);
}
```

```
const kvArray = [['key1', 'value1'], ['key2', 'value2']];
const myMap = new Map(kvArray);
console.log(Array.from(myMap.keys()));
console.log(Array.from(myMap.values()));
```

#### Merge

```
// map of form [key, value,...]

const map1 = new Map(arr1);
const map2 = new Map(arr2);
const merged = new Map([...map1, ...map2]);
```

#### Object

The keys must be simple types, either integer, string or symbols.

The element order is not preserved.

```
var obj = {}; // Empty object
var obj = {id: 1, name: "Any"}; 
```

Access

```
obj.id;
obj['id'];
```

Check for existamce

```
const isExist = obj.id === undefined;

const isExist = 'id' in obj;
```

Iterating

```
const obj = {id: 1, name: "any"}
for (let key in obj) {
   console.log(`key: ${key}, value: ${obj[key]}`);
   // key: id, value: 1
   // key: name, value: any
}
```

or

```
Object.keys(obj).forEach((key)=> console.log(`key: ${key}, value: ${obj[key]}`));
//key: id, value: 1
//key: name, value: test
```

<br/>

<a name="arrays"></a>

## Array

Array is considered as `indexed collection` type of data structure ie data is ordered by an index value.

```
const arr = new Array(5);
```

length = 5 and elements are undefined.

ES6

```
const boxes = document.querySelectorAll('.box');

const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

for (const cur of boxesArr6) {
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}
```

ES5

```
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(cur) {
    return cur >= 18;
});
console.log(full);

console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);
```

ES6

```
var ages = [12, 17, 8, 21, 14, 11];
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
```

produces

```
3
21
```

<br/>

<a name="array-reduce"></a>

### Array reduce() method

ES5

```
var data = [
    {"city":"seattle", "state":"WA", "population":652405, "land_area":83.9},
    {"city":"new york", "state":"NY", "population":8405837, "land_area":302.6},
    {"city":"boston", "state":"MA", "population":645966, "land_area":48.3},
    {"city":"kansas city", "state":"MO", "population":467007, "land_area":315}
  ];

var landSum = data.reduce(function(sum, d) {
    return sum + d.land_area;
}, 0);
console.log(landSum);
```

ES6

```
class Base {
    constructor(name, built) {
        this.name = name;
        this.built = built;
    }
    calculateAge() {
        var age = new Date().getFullYear() - this.built;
//        console.log("Base::calculateAge; age "+age);
        return age;
    }
}

class Park extends Base {
    constructor (name, built, trees, area) {
        super(name, built);
        this.trees = trees;
        this.area = area;
    }
}

const parks = [
new Park('park-1', 1990, 500, 12000),
new Park('park-2', 1950, 2000, 5000),
new Park('park-3', 1890, 4500, 3000)
];
```

```
const total2 = parks.reduce((sum, item) => sum + item.calculateAge(), 0);
console.log("total2 "+total2);
```

```
const total = parks.reduce((sum, item) => {
    return sum + item.calculateAge();
}, 0);
console.log("total "+total);
```

#### Reverse a string

```
function reverse(str) {
	if (!str) {
		return str;
	}
	return str.split('').reduce((c, v) => v + c, '');
}
```

### Using `Array.forEach()`

```
let total_street_length_2 = 0;
streets.forEach(el => total_street_length_2 += el.length);
console.log(`total_street_length_2 ${total_street_length_2}`);
```

### Using `Array.every()`

The `every()` method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value. 

```
function isBelowThreshold(currentValue) {
  return currentValue < 40;
}

const arr = [1, 30, 39, 29, 10, 13];

console.log(arr.every(isBelowThreshold));  // true
```

or

```
[12, 5, 8, 130, 44].every(x => x >= 10); // false
[12, 54, 18, 130, 44].every(x => x >= 10); // true
```

#### Palindrome

```
function palindrome(str) {
	return str.split('').every((char, index) => {
		const rdx = str.length - index - 1;
		return char === str.substr(rdx, 1);
	});
}
palindrome('aba');	// true
```

### Using `Array.some()`

The `some()` method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. 

```
const arr = [1, 2, 3, 4, 5];

var even = function(element) {
  // checks whether an element is even
  return element % 2 === 0;
};

console.log(arr.some(even));
```

or

```
[2, 5, 8, 1, 4].some(x => x > 10);  // false
[12, 5, 8, 1, 4].some(x => x > 10);	// true
```

<br/>

<a name="sets"></a>

## Set

`Set` is a `keyed collection` data structure ie a collection using keys, the elements are iterable in the order of insertion.

The `Set` object lets you store unique values of any type, whether primitive values or object references.

```
const set1 = new Set([1, 2, 3, 4, 5]);
console.log(set1.has(1));		// true
console.log(set1.has(5));		// true
console.log(set1.has(6));		// false
```

```
const text = 'abcda';
const mySet = new Set(text);
console.log(' size ', mySet.size); // 4
console.log('mySet ', mySet); // 'a', 'b', 'c', 'd'
```

#### Remove duplicates from an array

```
const numbers = [2, 3, 4, 2, 3, 4, 1];
console.log([...new Set(numbers)]);	// 2,3,4,1
```

#### Arrays

```
const myArray = ['value1', 'value2', 'value3'];
const mySet = new Set(myArray);
console.log(mySet.has('value1')); // true

const array = [...mySet];
console.log(array); // [ 'value1', 'value2', 'value3' ]
```

#### Objects

```
const obj = { a: 1, b: 2, c: 3 };
const mySet = new Set();
mySet.add(1);
mySet.add(obj);
console.log('mySet ', mySet); // Set { 1, { a: 1, b: 2, c: 3 } }

for (const item of mySet) {
	console.log(item);	// 1, { a: 1, b: 2, c: 3 }
}
```

<br/>

<a name="babel"></a>

## Babel Transpiler

```
cd /Users/jv/Desktop/MyDevelopment/github/javascript/the-complete-javascript-course/babel

npm init

npm install —save-dev babel-cli babel-preset-es2015 babel-polyfill

./node_modules/.bin/babel —presets es2015 script.js —out-file script-transpiled.js

copy node_modules/babel-polyfill/dist/polyfill.min.js

change index.html to add refs
```


