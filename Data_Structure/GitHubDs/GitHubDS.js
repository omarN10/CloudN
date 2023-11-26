function logAtLeastFive(n) {
  for (let i = 0; i <= Math.max(5, n); i++) {
    console.log(i);
  }
}
// console.log(typeof(logAtLeastFive));
// logAtLeastFive(1);

//Big O Notation for some of the Objects and Arrays methods
const person = { name: "John", age: 22, hobbies: ["reading", "sleeping"] };

// console.log(person.hobbies[1]);
/* 
let keys = Object.keys(person);
console.log(keys);

let values = Object.values(person);
console.log(values);

let Entries = Object.entries(person);
console.log(Entries);

console.log(person.hasOwnProperty("name")); */

/* const arrayTest = [1, 2, 3, 4, 5];
console.time("push");
arrayTest.push(6);
console.timeEnd("push");

console.time("unshift");
arrayTest.unshift(0);
console.timeEnd("unshift");  */

