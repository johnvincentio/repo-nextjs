---
meta-title: "Basic Javascript | John Vincent"
meta-description: "John Vincent's discussion on Basic JavaScript"
meta-keywords: "Basic JavaScript"
title: "Basic JavaScript"
subtitle: ""
lead: ""
category: [Javascript]
permalink: /javascript/basic-javascript/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Polymorphism

Polymorphism (many, forms) is the provision of a single interface to entities of different types.

Polymorphism is the ability (in programming) to present the same interface for differing underlying forms (data types).

Polymorphism is the characteristic of being able to assign a different meaning or usage to something in different contexts.

# Inheritance

Inheritance enables new objects to take on the properties of existing objects. A class that is used as the basis for inheritance is called a superclass or base class. A class that inherits from a superclass is called a subclass or derived class.

# Basic JavaScript

JavaScript is an Object Oriented Programming (OOP) language. A programming language can be called object-oriented if it provides four basic capabilities to developers −

* Encapsulation − the capability to store related information, whether data or methods, together in an object.

* Aggregation − the capability to store one object inside another object.

* Inheritance − the capability of a class to rely upon another class (or number of classes) for some of its properties and methods.

* Polymorphism − the capability to write one function or method that works in a variety of different ways.

Objects are composed of attributes. If an attribute contains a function, it is considered to be a method of the object, otherwise the attribute is considered a property.

## Prototype Language

JavaScript is a prototype based language. 

Every JavaScript Object has a prototype property, which makes inheritance possible.

The prototype property of an object is where we put methods and properties that we want <b>other objects to inherit</b>.

The constructor's prototype property is <b>NOT</b> the prototype of the constructor itself, it's the prototype of ALL instances that are created through it.

When a certain method (or property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the object's prototype. This continues until the method is found: <b>Prototype Chain</b>

### JavaScript Engine

* parser 
* generates abstract syntax tree
* passed to conversion to machine code
* generates machine code
* runs the code

## Execution Contexts

A box, container or a wrapper which stores variables and in which a piece of our code is evaluated and executed.

The Default is the Global Execution Context.

* Code that is not inside any function
* Associated with the global object
* In the browser, that is the window object

For example

```
var name = 'john';

function first() {
    var a = 'Hello!';
    second();
    var x = a + name;
}

function second() {
    var b = 'Hi!';
    third();
    var z = b + name;
}

function third() {
    var c = 'Hey!';
    var z = c + name;
}
first();
```

Variables within function first() are stored within the Execution Context: first()

When third() is invoked, <b>Execution stack</b> is

```
Execution Context: third()
Execution Context: second()
Execution Context: first()
Global execution context
```

### Execution Context Object

```
Variable Object (VO) - alls variables and function
Scope Chain
"this" variable
```

1. Creation Phase

* Creation of the Variable Object
	* The argument object is created, containing all the arguments that were passed into the function.
	* Code is scanned for function declarations; for each function, a property is created in the Variable Object, pointing to the function.
	* Code is scanned for variable declarations; for each variable, a property is created in the Variable Object and set to undefined.

The last 2 points are called Hoisting.

* Creation of the Scope chain
* Determine the value of the "this" variable

2. Execution Phase

* The code of the function that generated the current execution context is run line by line.


## Hoisting

Function declaration is hoisted.

```
calculateAge(1965);

abc = 'something';

function calculateAge(year) {
    console.log(2016 - year);
}

var abc;
console.log("abc "+abc);
```

Variable is hoisted and = undefined

```
console.log(age);
var age = 23;
```

* Function expressions are not hoisted.


## Scope

JavaScript uses function scope. Variables are visible to the function in which they are defined and in functions within the function.

List or a chain of objects that defines the variables that are in scope for that code.

JavaScript is a <b>lexically scoped</b> language.

Variables declared outside of a function are <b>global variables</b> and are visible everywhere in a JavaScript program.

Variables declared inside of a function have function scope and are visible only to code that appears inside that function.

Each new function creates a scope: the space/environment in which the variables it defines are accessible.

Example

```
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
```

produces

```
Hello!Hi!Hey!
```

second() scope has access to first() scope and Global scope.

Scope Chain

* second() scope
* first() scope
* Global scope


### Execution Stack vs Scope Chain

For example

```
// Example to show the differece between execution stack and scope chain
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third();
    }
}

function third() {
    var d = 'John';
//    console.log(a+b+c+d); // error b and c not defined
	console.log(a+d);
}
```

Execution Stack - Order in which functions are called

```
Execution Context: third()
Execution Context: second()
Execution Context: first()
Global execution context
```

Scope Chain - Order in which functions are written lexically

```
Scope third()
	a = 'Hello!'
	d = 'John'
Scope second()
	a = 'Hello!'
	b = 'Hi!'
	c = 'Hey!'
Scope first()
	a = 'Hello!'
	b = 'Hi!'
Global Scope
	a = 'Hello!'
```

## Determine the value of the "this" variable

<b>Regular function call:</b> the 'this' keyword points to the global object (the window object in the browser).

<b>Method call:</b> the 'this' variable points to the object that is calling the method.

The 'this' keyword is not assigned a value until a function where it is defined is actually called.

Example

```
console.log(this);	// Window object

calculateAge(1985);	// 1

function calculateAge(year) {
    console.log(2016 - year);
    console.log(this);		// 1, 
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);		// 2, 4
        console.log(2016 - this.yearOfBirth);

        function innerFunction() {
            console.log(this);	// 3
        }
        innerFunction();
    }
};

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};

mike.calculateAge = john.calculateAge;
mike.calculateAge();
```

```
1. calculateAge(1985)
	* this = Window

2. john.calculateAge();
	* this = Object (john)

3. innerFunction();
	* this = Window

4. mike.calculateAge(); // method borrowing
	* this = Object (mike)
```

# Objects

Everything is an object, except primitives (Numbers, Strings, Booleans, Undefined, Null)

## Object Properties

Object properties can be any of the three primitive data types, or any of the abstract data types, such as another object. Object properties are usually variables that are used internally in the object's methods, but can also be globally visible variables that are used throughout the page.

The syntax for adding a property to an object is −

`objectName.objectProperty = propertyValue;`

For example − The following code gets the document title using the "title" property of the document object.

`var str = document.title;`

## Object Methods

Method is a function that is attached to an object.

Methods are the functions that let the object do something or let something be done to it. There is a small difference between a function and a method – at a function is a standalone unit of statements and a method is attached to an object and can be referenced by the this keyword.

Methods are useful for everything from displaying the contents of the object to the screen to performing complex mathematical operations on a group of local properties and parameters.

For example − Following is a simple example to show how to use the write() method of document object to write any content on the document.

`document.write("This is test");`

## User-Defined Objects

All user-defined objects and built-in objects are descendants of an object called Object.

#### The new Operator

The new operator is used to create an instance of an object. To create an object, the new operator is followed by the constructor method.

In the following example, the constructor methods are Object(), Array(), and Date(). These constructors are built-in JavaScript functions.

```
var employee = new Object();
var books = new Array("C++", "Perl", "Java");
var day = new Date("August 15, 1947");
```

### The Object() Constructor

A constructor is a function that creates and initializes an object. JavaScript provides a special constructor function called Object() to build the object. The return value of the Object() constructor is assigned to a variable.

The variable contains a reference to the new object. The properties assigned to the object are not variables and are not defined with the var keyword.

#### Examples

```
var book = new Object();
book.subject = "JavaScript";
book.author  = "A.Name";
```

```
function book(title, author){
	this.title = title; 
	this.author  = author;
}
var myBook = new book("JavaScript", "A.Name");
```

```
function addPrice(amount){
	this.price = amount; 
}
 
function book(title, author){
	this.title = title;
	this.author  = author;
	this.addPrice = addPrice; // Assign that method as property.
}

var myBook = new book("JavaScript", "Name");
myBook.addPrice(5.95);
```

### Various Objects

```
var val = new Number(number);
var val = new Boolean(value);
var val = new String(string);

new Date( )
new Date(milliseconds)
new Date(datestring)
new Date(year,month,date[,hour,minute,second,millisecond ])

var pi_val = Math.PI;
var sine_val = Math.sin(30);

var pattern = new RegExp(pattern, attributes);
```

## Arrays

```
var names = ['John', 'Jane', 'Mark'];
var years = new Array(1990, 1969, 1948);

var john = ['John', 'Smith', 1990, 'designer', false];
john.push('blue');
john.unshift('Mr.');
john.pop();
john.shift();
console.log(john);
console.log(john.length);

if (john.indexOf('teacher') === -1) {
    console.log('John is NOT a teacher.');
}  
```

### Object Literal

```
var john = {
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false
};

console.log(john.lastName);
console.log(john['lastName']);
```

### new Object()

```
var jane = new Object();
jane.name = 'Jane';
jane.lastName = 'Smith';
jane['yearOfBirth'] = 1969;
jane['job'] = 'retired';
jane['isMarried'] = true;
```

### Objects and methods

```
var mike = {
    yearOfBirth: 1950,
    calculateAge: function() {
        this.age = 2016 - this.yearOfBirth;
    }
};

mike.calculateAge();
console.log(mike);
```

### `Object.prototype`

```
// what is this "Object.prototype" anyway...?
var prototypeType = typeof Object.prototype;
console.log(prototypeType);

// now let's examine it!
var hasOwn = Object.prototype.hasOwnProperty('hasOwnProperty');
console.log(hasOwn);
```

### Iterating over Object properties

```
function StudentReport() {
    var grade1 = 4;     // private
    var grade2 = 2;
    var grade3 = 1;
    this.getGPA = function() {      // public
        return (grade1 + grade2 + grade3) / 3;
    };
}

var myStudentReport = new StudentReport();

for (var x in myStudentReport) {
    if (typeof myStudentReport[x] !== "function") {
        console.log("Muahaha! " + myStudentReport[x]);
    }
}
// if (typeof languages[x] === "string") {
```

```
function Dog(breed) {
    this.breed = breed;
}

Dog.prototype.sayHello = function() {
    console.log("Hello this is a "+this.breed+" dog");
};

var yourDog = new Dog("golden retriever");
yourDog.sayHello();

var myDog = new Dog("dachshund");
myDog.sayHello();
```

```
function Person(first, last, age) {
    this.firstname = first;
    this.lastname = last;
    this.age = age;
    var bankBalance = 7500;     // private

    this.askTeller = function(pass) {
        if (pass == 1234) return bankBalance;
        else return "Wrong password.";
    };
}

var john = new Person('John', 'Smith', 30);
var myBalance = john.askTeller(1234);
```

### Private vs Public Method

Private

`var returnBalance = function()`

Public

`this.askTeller = function()`

```
function Person(first, last, age) {
    this.firstname = first;
    this.lastname = last;
    this.age = age;
    var bankBalance = 7500;

    var returnBalance = function() {        // private method
        return bankBalance;
    };

    // create the new function here
    this.askTeller = function() {       // public, returns a function
        return returnBalance;
    };
    this.getName = function() {
        return this.firstname + " " + this.lastname;
    }
}

var john = new Person('John', 'Smith', 30);
console.log(john.returnBalance);

var myBalanceMethod = john.askTeller(); // returns a method
var myBalance = myBalanceMethod();
console.log(myBalance);
```

### Array of Objects

```
var family = new Array();
family[0] = new Person("alice", 'abcd', 40);
family[1] = new Person("bob", 'defg', 42);

for (var idx in family) {
    var item = family[idx];
    console.log(item.name);
}
```

### Function Expression

```
var ageDifference = function(person1, person2) {
    return person1.age - person2.age;
};

var olderAge = function(person1, person2) {
    return person1.age > person2.age ? person1.name : person2.name;
};

var alice = new Person("Alice", 'abcd', 30);
var billy = new Person("Billy", 'defg', 25);

var diff = ageDifference (alice, billy);

console.log("The older person is " + olderAge(alice, billy));
```

### Prototype Chain

```
function Animal(name, numLegs) {
    this.name = name;
    this.numLegs = numLegs;
    this.isAlive = true;
}

function Penguin(name) {
    this.name = name;
    this.numLegs = 2;
}

function Emperor(name) {
    this.name = name;
    this.saying = "Waddle waddle";
}

// set up the prototype chain
Penguin.prototype = new Animal();
Emperor.prototype = new Penguin();

var myEmperor = new Emperor("Jules");

console.log(myEmperor.saying); // should print "Waddle waddle"
console.log(myEmperor.numLegs); // should print 2
console.log(myEmperor.isAlive); // should print true
```

```
// 3 lines required to make harry_potter
var harry_potter = new Object();
harry_potter.pages = 350;
harry_potter.author = "J.K. Rowling";

or

// A custom constructor for book
function Book (pages, author) {
    this.pages = pages;
    this.author = author;
}

// Use our new constructor to make the_hobbit in one line

var the_hobbit = new Book(320, "J.R.R. Tolkien");
```

```
var bob = {
    firstName: "Bob",
    lastName: "Jones",
    phoneNumber: "(650) 777-7777",
    email: "bob.jones@example.com"
};

var mary = {
    firstName: "Mary",
    lastName: "Johnson",
    phoneNumber: "(650) 888-8888",
    email: "mary.johnson@example.com"
};

var contacts = [bob, mary];

function printPerson(person) {
    console.log(person.firstName+' '+person.lastName);
}

function list() {
    for (var idx in contacts) {
        printPerson(contacts[idx]);
    }
}

function search(lastName) {
    for (var idx in contacts) {
        if (contacts[idx].lastName === lastName)
            printPerson(contacts[idx]);
    }
}

function add(firstName, lastName, phoneNumber, email) {
    contacts[contacts.length] = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email
    };
}

list();

search("Jones");

add("A", "B", "123456789", "abc@gmail.com");

list();


//printPerson(contacts[0]);
//printPerson(contacts[1]);

```

### extends

```
class Rectangle {
    constructor(w, h) {
        this.w = w;
        this.h = h;
    }
}

Rectangle.prototype.area = function () {
  return this.w * this.h;
}

class Square extends Rectangle {
  constructor(w) {
    super(w, w);
  }
}

const rec = new Rectangle(3, 4);
const sqr = new Square(3);
console.log(rec.area());
console.log(sqr.area());
```

### new Object()

```
var square = new Object();
square.sideLength = 6;
square.calcPerimeter = function() {
  return this.sideLength * 4;
};
// help us define an area method here
square.calcArea = function() {
    return this.sideLength * this.sideLength;
};

var p = square.calcPerimeter();
var a = square.calcArea();
console.log("p "+p+" a "+a);
```

### this keyword

```
/*
The keyword this acts as a placeholder, and will refer to whichever object called that method when the method is actually used.
*/

// here we define our method using "this", before we even introduce bob
var setAge = function (newAge) {
  this.age = newAge;
};

// now we make bob
var bob = new Object();
bob.age = 30;
// and down here we just use the method we already made
bob.setAge = setAge;

// change bob's age to 50 here
bob.setAge(50);
```

### Object in an Object

```
var Spencer = {
  age: 22,
  country: "United States"
};

// make your own object here called me

Spencer.me = {};
Spencer.me.age = 34;
Spencer.me.country = 'Mars';

Spencer 
	age: 22
	country: "United States"
	me:
		age: 34
		country: "Mars"
```

### Object literal pattern

```
var friends = {
//    firstName: '',
//    lastName: '',
//    number: ''
//    abc() {
//        return 'xyz';
//    }
};

friends["bill"] = {};
friends.bill.firstName = "Bill";
friends.bill.lastName = "Last";
friends.bill.number = "12345";

friends.steve = {};
friends.steve.firstName = "Steve";
friends.steve.lastName = "Jobs";
friends.steve.number = "(408) 555-5555";
friends.steve.address1 = "1 Infinite Loop";
friends.steve.address2 = "Cupertino, CA 95014";

var myobj = {};
myobj.bill = new Object();
myobj.bill.firstName = "Bill";
myobj.steve = new Object();
myobj.steve.firstName = "Steve";

function list() {
    for (var key in friends) {
        console.log(key);
    }
}
function search(name) {
    for (var key in friends) {
        if (friends[key].firstName === name) {
//            console.log(friends[key]);
            display(friends[key]);
            return friends[key];
        }
    }
}
function display(friend) {
    console.log("First Name: "+friend.firstName);
    console.log("Last Name: "+friend.lastName);
    console.log("Number: "+friend.number);
    console.log("Address: "+friend.address1);
    console.log("         "+friend.address2);
}

//list();
//
//console.log("search...");
//search("john");
search("Steve");

//console.log(friends.steve.abc());
```

### Function Expression

```
var greeting = function (name) {
    console.log("Great to see you," + " " + name);
};

greeting("fido");
```

```
var ABC = ABC || {};

ABC.abcd = {

    do_1 : function() {
        console.log("--- ABC.Subspace.do_1");
    },

    do_2 : function(name, path) {
        console.log("--- ABC.Subspace.do_2; name " + name + " path " + path);
    }
};

function test1() {
    ABC.abcd.do_1();
}

ABC.abcd.do_1();

// test1();
```

## Function Constructor

```
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');
```

### Inheritance

```
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    this.myfunc = function() {
        console.log("in myfunc");
    };
};

Person.prototype.calculateAge  = function() {
    console.log(2016 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);

john.myfunc();

john.hasOwnProperty('job');     // true

john.hasOwnProperty('lastName');     // false

john instanceof Person;		// true
```

### Array Prototype

```
var x = [2, 4, 6];
console.log(x);
```

```
x.__proto__ is Array()
```

## `Object.create`

```
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});
```

### Primitives vs Objects

#### Primitives

Primitive holds the value

```
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);
```

#### Objects

var keeps a reference to the object

```
var obj1 = {
    name: 'John',
    age: 26
};
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);
```

#### Functions

Object Arguments are references

```
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj.city);
```

## Functions

Functions are objects.

JavaScript functions are called "First-Class Functions"

* A function is an instance of the Object type.
* A function behaves like any other object.
* We can store functions in a variable.
* We can pass a function as an argument to another function.
* We can return a function from a function.

### Passing functions as arguments - Callback Function

```
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(rates);
```

### Callback

A callback is a function that is to be executed after another function has finished executing — hence the name `call back`.

or

In JavaScript, functions are objects. Because of this, functions can take functions as arguments, and can be returned by other functions. Functions that do this are called higher-order functions. Any function that is passed as an argument is called a callback function.

#### Why Callbacks

JavaScript is an event driven language. This means that instead of waiting for a response before moving on, JavaScript will keep executing while listening for other events.

For example

```
function first(){
  // Simulate a code delay
  setTimeout( function(){
    console.log(1);
  }, 500 );
}
function second(){
  console.log(2);
}
first();
second();
```

will print

```
2
1
```

JavaScript executed our functions in the correct order, first() and the second(), it's just that JavaScript didn’t wait for a response from first() before moving on to execute second().

Callbacks are a way to make sure certain code doesn’t execute until other code has already finished execution.

```
function app(name, callback) {
  console.log(`In app, name ${name}`);
  callback();
}

function callback() {
  console.log('In callback');
}

app('my app', callback);
```

### Functions returning functions

Uses Anonymous function.

Returns a function that can be used later. This is possible because functions are First-Class functions in JavaScript because they are effectively objects.

```
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');	// is a function
var designerQuestion = interviewQuestion('designer');

teacherQuestion('John');
designerQuestion('John');
designerQuestion('jane');
designerQuestion('Mark');
designerQuestion('Mike');

interviewQuestion('teacher')('Mark');
```

Notice

```
interviewQuestion('teacher')('Mark');
```

`interviewQuestion('teacher')` returns a function, thus is

```
function('Mark')
```

## Function declaration

```
// Function declaration: starts with "function"
function isNil(value) {
  return value == null;
}
```

## Function expression

```
// Function expression: starts with "var"
var isTruthy = function(value) {
  return !!value;
};
```

## Self-executing closure

```
(function() {

})();
```


## Immediately Invoked Function Expression (IIFE)


No function name is not allowed.

```
function() {
}
```

make as a IIFE

```
(function() {
})();
```

```
// Function expression (IIFE): starts with "("

(function messageFunction(message) {
    return message + ' World!';
})('Hello again');

// passes 'Hello Again' as parameter to the function.
```

Simple app

```
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();
```

Rewritten using IIFE, providing data privacy.

```
(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();
```

IIFE with arguments

```
(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);
```


## Closure

“A closure is a special kind of object that combines two things: a function, and the environment in which that function was created. The environment consists of any local variables that were in-scope at the time that the closure was created.”

Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

<b>An inner function has always access to the variables and parameters of its outer function, even after the outer function has returned.</b>


```
function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
// var retirementGermany = retirement(65);
// var retirementIceland = retirement(67);

retirementUS(1990);
// retirementGermany(1990);
// retirementIceland(1990);

//retirement(66)(1990);
```

Notice `var retirementUS = retirement(66);`

`retirementUS` is `function(yearOfBirth)` with Scopes

```
Closure (retirement)
	a: " years left until retirement."
	retirementAge = 66
Global 
```

When `var retirementUS = retirement(66)` has executed

```
retirement() is removed from the execution stack.
retirement() scope stays on the Scope Chain.
```

`retirementUS(1990)` causes

```
retirementUS() to be added to the execution stack
retirementUS() scope to be added to the scope chain.
```

`retirementUS()` scope now has access to the retirement() scope.

The current execution context has "closed in" on the outer variable object, so that it can use it, so that is why it is called a closure.

The scope chain always stays intact.

### Another example

```
function interviewQuestion(job) {
    return function(name) {
        if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is?');
        } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        } else {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

interviewQuestion('teacher')('John');
```

### Another example

A function inside a function can access variables defined in the parent function.


```
var name = "Fred";

function sayMyName() {
  var lastname = "Flintstone";
  
  function sayMyLastName() {  // a closure
    console.log(lastname);
  }

  sayMyLastName();
}

sayMyName();
```

or

```
function sayMyName(firstname) {
  var lastname = "Flintstone";
 
  function sayMyLastName() {  // a closure
    console.log(`Name ${firstname} ${lastname}`);
  }

  sayMyLastName();
}

sayMyName('Fred');
```

or

```
function sayMyName(firstname) {
  var lastname = "Flintstone";
 
  function sayMyLastName() {  // a closure
    console.log(`Name ${firstname} ${lastname}`);
  }

  sayMyLastName();
}

sayMyName('Fred');
sayMyName('Bill');
```

or

```
function sayMyName(firstname) {
  var lastname = "Flintstone";
  
  return function makeName(middlename) {  // a closure
    return `${firstname} ${middlename} ${lastname}`;
  }
}

var p1 = sayMyName('Fred');

console.log('name 1 ', p1('Sid'));

console.log('name 1 ', sayMyName('Fred')('Sid'));

console.log('name 2 ', sayMyName('Bill')('Vic'));
```

# Bind, Call and Apply

By example

```
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');
```

which produces

```
Good morning, Ladies and gentlemen! I'm John, I'm a teacher and I'm 26 years old.
```

## Call

Method borrowing with a general form of

```
myobj.myfunction.call(obj2,….)
```

for ‘this’ within `myfunction`, set this to `obj2`

For example

```
john.presentation.call(emily, 'friendly', 'afternoon');
```

which produces

```
Hey! What's up? I'm Emily, I'm a designer and I'm 35 years old. Have a nice afternoon.
```

## Apply

<b>Apply</b> is similar to <b>Call</b>, except <b>Apply</b> accepts its arguments as an array.

Method borrowing with a general form of

```
myobj.myfunction.apply(obj2,[params as an array])
```

for ‘this’ within `myfunction`, set this to `obj2`

For example

```
john.presentation.apply(emily, ['friendly', 'afternoon']);
```

which produces

```
Hey! What's up? I'm Emily, I'm a designer and I'm 35 years old. Have a nice afternoon.
```

## Bind

The bind() method creates a new function that, when called, has its <b>this</b> keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

`var var1 = myobj.myfunction.bind(obj2,`

for ‘this’ within `myfunction`, set this to `obj2`

`var1` is now an object that is a reference to a function for which ‘this’ now means `obj2`.

This var can now be executed multiply, with different parameters.

Very useful for creating functions with preset arguments.

For example

```
var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning');
```

which produces

```
Hey! What's up? I'm John, I'm a teacher and I'm 26 years old. Have a nice morning.
```

and

```
johnFriendly('night');
```

which produces

```
Hey! What's up? I'm John, I'm a teacher and I'm 26 years old. Have a nice night.
```

For example

```
var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');
```

which produces

```
Good afternoon, Ladies and gentlemen! I'm Emily, I'm a designer and I'm 35 years old.
```

Another example

```
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
var fullOther= arrayCalc(ages, isFullAge.bind(this, 28));
console.log(ages);
console.log(fullJapan);
console.log(fullOther);
```

which produces

```
[26, 51, 79, 11, 18]
[true, true, true, false, false]
[false, true, true, false, false]
```

## Currying

Briefly, currying is a way of constructing functions that allows partial application of a function’s arguments. 

What this means is that you can pass all of the arguments a function is expecting and get the result, or pass a subset of those arguments and get a function back that’s waiting for the rest of the arguments.

## Arguments

<b>arguments</b> variable is a keyword, just like <b>this</b>

```
function isFullAge5() {
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= 18);
    });
}
```

# Binary


## AND Operator: &

The `AND &` operator compares each binary digit from two integers. If both of the two digits are 1, then
the corresponding output digit will also be 1, otherwise it will be 0.

```
function isOdd(num) {
	const mask = 1;
	const bool = !!(num & mask);
}
```

Convert to boolean

```
const bool = !!(num & mask);
```

## OR Operator: |

In the `OR |` operator, instead of needing both input bits to be 1 for the output bit to be 1, the resultant bit value will be 
set to 1 as long as either of the input bits are 1

```
const ans2 = num1 | num2;
```

## XOR Operator: ^

The `XOR ^` operator produces 1 in the truth table when both bits are different;
that is when one of the bits is a 1 and the other is a 0

```
function xor(num1, num2) {
	return num1 ^ num2;
}
```

## NOT Operator: ~

The `NOT ~` operator is the simplest of the operations involving binary values. The `~` operator operates on
only a single bit and provides the complement (opposite) value

```
const result = ~num;
```

## Use Binary

```
function exercise(num) {
  let mask = 0b100;
  let result = num | mask;
  console.log(`mask ${mask.toString(2)}; num ${num}, ${num.toString(2)} result ${result}, ${result.toString(2)}`);
}
```

Set as binary

```
let mask = 0b100
```

Display as binary

```
${result.toString(2)}
```

## Shift Operators

* Left Shift Operator: `<<`

* Right Shift Operator: `>>`

* Zero-Fill Right Shift Operator: `>>>`

```
function leftShift(num, shift) {
	return num << shift;
}

function rightShift(num, shift) {
	return num >> shift;
}

function zeroFillRightShift(num, shift) {
	return num >>> shift;
}
```

## Using Shift Operators

```
function isSet(num, bitPosition) {
	return !!(num & (2 ** bitPosition));
}

function clearBit(number, bitPosition) {
	const mask = ~(1 << bitPosition);
	return number & mask;
}

function setBit(number, bitPosition) {
	return number | (1 << bitPosition);
}

function updateBit(number, bitPosition, bitValue) {
	const bitValueNormalized = bitValue ? 1 : 0;
	const clearMask = ~(1 << bitPosition);
	return (number & clearMask) | (bitValueNormalized << bitPosition);
}

function getBit(number, bitPosition) {
	return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}
```

## typeof

```
let year = 23;
let day = '12';
let before = false';
let abc;
console.log(typeof year);
console.log(typeof day);
console.log(typeof before);
console.log(typeof abc);

number
string
boolean
undefined
```

```
const question = new Map();
question.set(1, 'ES5');

etc

for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}
```

## Truthy and Falsy values

```
undefined, null, 0, '', NaN
```

```
Not falsy values
```

## Other

```
arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
```

## Require and Exports

```
const mediaTags = require('./mediaTags').mediatags;

const tags = mediaTags(pathname);
```

```
const jsmediatags = require('jsmediatags');

function mediatags(filename) {
	return new Promise((resolve, reject) => {
		jsmediatags.read(filename, {
			onSuccess(tag) {
				resolve(tag);
			},
			onError(error) {
				reject(error);
			}
		});
	});
}

module.exports = { mediatags };
```

# Utilities

Some useful utilities follow

```
/*
word = 'abc'
returns:
{ a: false, b: false, c: false }
*/
export function convertStringtoObject(word) {
	const obj = [...word].reduce((ac,a) => ({...ac,[a]: false}),{});
	return obj;
}

/*
word = 'abc'
returns:
[ { id: 0, key: 'a', value: false }, { id: 1, key: 'b', value: false }, { id: 2, key: 'c', value: false } ]
*/
export function convertStringtoArrayObject(word) {
	const obj = [...word].map((letter, id)  =>  ({ id, key: letter, value: false }));
	return obj;
}

/*
[ { id: 0, key: 'a', value: false }, { id: 1, key: 'b', value: false }, { id: 2, key: 'c', value: false } ]
returns:
'abc'
*/
export function convertArrayObjectsToString(arr) {
	const str = arr.reduce((ac, a) => (ac + a.key), '');
	return str;
}

/*
[ { id: 0, key: 'A', value: false }, { id: 1, key: 'B', value: false }, { id: 2, key: 'C', value: false } ], 'B'
returns:
[ { id: 0, key: 'A', value: false }, { id: 1, key: 'B', value: true }, { id: 2, key: 'C', value: false } ]'
*/
export function updateArrayObjectsForLetter(arr, key) {
	const obj = arr.map(letter => ({
		id: letter.id,
		key: letter.key,
		value: (key === letter.key ? true : letter.value)
	}));
	return obj;
}

/*
[ { id: 0, key: 'A', value: false }, { id: 1, key: 'B', value: false }, { id: 2, key: 'C', value: false } ], 'B'
returns:
	true
*/
export function isLetterInArrayObjects(arr, key) {
	let bool = false;
	arr.forEach(letter => { if (key === letter.key) bool = true });
	return bool;
}

/*
[ { id: 0, key: 'A', value: true }, { id: 1, key: 'B', value: true }, { id: 2, key: 'C', value: true } ]
returns:
	true
*/
export function isArrayObjectsComplete(arr) {
	let bool = true;
	arr.forEach(letter => { 
		if (! letter.value) bool = false;
	});
	return bool;
}

```

```

function doubleDigits(num) {
  const str = `${num}`;
  if (str.length < 2) {
    return `0${str}`;
  }
  return str;
}

export function defaultDate() {
  const date = new Date();
  // prettier-ignore
  const str = `${date.getFullYear()}-${doubleDigits(date.getMonth() + 1)}-${doubleDigits(date.getDate())}`;
  return str;
}

export function remainingProperties(props, types) {
  // console.log('---utils::remainingProperties, props ', props, ' types ', types);
  const ret = {};
  Object.entries(props).forEach(([key, value]) => {
    // console.log(`${key} ${value}`);
    if (!types[key]) {
      // console.log('key ', key, ' not found');
      ret[key] = value;
    }
  });
  // console.log('---utils::remainingProperties, ret ', ret);
  return ret;
}

export function initcap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isDesktop() {
  return window.matchMedia('(max-width: 767px)').matches;
}

export function isMdUp() {
  return window.matchMedia('(min-width: 960px)').matches;
}

export function copyMoves(original) {
  const moves = [ ...original];
  return moves;
}

const board = JSON.parse(JSON.stringify(original));


export default function random() {
  return Math.floor(Math.random() * 6);
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

improveText(s, replacement) {
  if (typeof s !== 'string') return '';
  const arr = [];
  s.split(' ').forEach((item) => {
    arr.push(capitalize(item));
  });
  return arr.join(replacement);
}

createName(s) {
  if (typeof s !== 'string') return '';
  const arr = [];
  s.split('-').forEach((item) => {
    arr.push(this.capitalize(item));
  });
  const result = arr.join('');
  // console.log('createName; result ', result);
  return result;
}

getWeekDay(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

getMonth(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[date.getMonth()];
}

splitter(str) {
  const result = str.match(/^([\d]{4}-[\d]{2}-[\d]{2})-(.+)$/);
  return result;
}

formatDate(date) {
  return `${this.getMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;
}
```




