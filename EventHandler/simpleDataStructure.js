//this file is practicing simple data structure in JavaScript

//1. Array
const number = [1, 2, 3, 4, 5];
const fruits = ["Apple", "Banana", "orange"];
/* console.log(number[1]);
console.log(fruits[0]);
 */
//2. Objects
//objects are key-value pairs and used to store and represent structure data
const student = {
  name: "Omar",
  age: 27,
  address: {
    street: "remaya",
    block: 1,
  },
  print: function () {
    console.log(`${this.address.street}`);
  },
};
// student.print();
// console.log(student.print);

//3. Sets
//sets are collection of unique values. they can be used to store a collection of values and ensure that each value appears only once in the set

const setTest = new Set();
setTest.add(1);
setTest.add(2);
setTest.add(1);
// console.log(setTest);

//4. Maps
//maps are similar to objects but allow any type of value as keys.
const vegetables = new Map();
vegetables.set("green", 500);
vegetables.set("tomatoes", 200);
vegetables.set("cucumber", 100);
vegetables.set(500, "potatoes");
// console.log(vegetables);

//5. Stacks: follow the last-in-first-out principle

//6. Queues: follow the first-in-first-out principle

//7. linked-list: elements are stored in nodes and each node contains a reference to the next node

//8. Trees: Hierarchal Data Structure composed of nodes, each node can have child node forming branching structure

//9. Graphs: consist of a collection of nodes(Vertices) connect by edges. they are used to represent relationships between objects
