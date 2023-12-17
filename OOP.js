//oop revision
//classes are the blueprint of other objects

//classes are creating using "class" keyword

//classes are considered as template

//what is prototype

function User(name) {
  this.name = name;
}

let user1 = new User("Nasr");
let user2 = new User("Omar");

// console.log(User.prototype);
// console.log(user1);
const arr = [1, 2, 3, 4, 5, 6];
User.prototype.addTitle = function () {
  return `Mr. ${this.name}`;
};
// console.log(user1.addTitle())

function testingProt(arr) {
  return 1;
}
// console.log(testingProt.prototype)

/* 
    prototype
 */

// console.log(String.prototype)
let myString = "omar";
String.prototype.zFill = function (width) {
  let theResult = this;

  while (theResult.length < width) {
    theResult = `0${theResult}`;
  }
  return theResult.toString();
};

//every object has a prototype
//prototype chain ends with object.prototype
//in javascript function is object

let objTest = {
  a: 10,
  b: 50,
};

//testing getters and setters

class Student {
  constructor(name) {
    this.name = name;
  }

  get getName() {
    console.log(this.name);
  }
  set setName(newName) {
    this.name = newName;
  }
}
let student1 = new Student("omarN");

//use of static methods
//static methods are only accessible with class not objects

//Constructor Function
//use of inheritance

const parentUser = function (name, password) {
  this.name = name;
  this.password = password;
};
parentUser.prototype.printName = function () {
  console.log(this.name);
};

// create a child class
const childUser = function (name, password, course) {
  parentUser.call(this, name, password);
  this.course = course;
};
childUser.prototype = Object.create(parentUser.prototype);

childUser.prototype.stats = function () {
  console.log("stats");
};
const testingObj = new childUser("Omar", "Testing", "DS");
// testingObj.printName();

//ES6 inheritance

class parentTestingUser {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
  printName() {
    console.log(this.name);
  }
}

class childTestingUser extends parentTestingUser {
  constructor(name, password, course) {
    super(name, password);
    this.course = course;
  }
  stats() {
    console.log("stats");
  }
}

const testObjInherit = new childTestingUser("omar", "1", "testingCourse");
// testObjInherit.printName();