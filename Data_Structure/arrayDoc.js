//array object : enables storing multiple items under a single Variable name.
//and has members for performing common array operations

let arr = [10, 20, 30];
// console.log(typeof(arr));
let length = arr.length;
// console.log(arr[length - 1]);
let strOfArr = arr.toString();
// console.log(strOfArr);
// let index = arr.indexOf(41);

/* if (index == 2) {
    console.log(`the index of item is ${index}`);
} */

arr[3] = 60;
// arr.sort()
// console.log(arr);
// console.log(Object.keys(arr));

const arr2 = arr.slice().copyWithin(0, 1, 2);
// console.log(arr2);

// console.log(arr);
const arr3 = [...arr].copyWithin(0, 1);
const arr4 = [...arr].copyWithin(0, 1, 2);
// console.log(arr3);
// console.log(arr4);
/* 
let x = [] //testing empty array
console.log(x.length); */

//creating array using constructor

let arrCon = new Array();

// console.log(Array.from('foo'));
// console.log(Array.from([1,2,3],(x)=> x*10));

//testing mapping array
// console.log(arr);

// console.log(arr.indexOf(10) !== -1);

//access each element in the array
/* for (const item of arr) {
    console.log(item);
} */

//copying an array
/* 
let arrCopy = Array.from(arr);
let arrCopy1 = arr.slice()
console.log(arrCopy);
console.log(arrCopy1); */
let obj1Test = {
  name: "Omar",
  Age: 27,
  porfession: ["software Engineer", "businessMan"],
};

// console.log(JSON.stringify(obj1Test));

//testing ternary operator condition ?  true : false;
/* let x = 10;
let y = 20;
let bool1 = x==y ? true: false;
console.log(bool1); */

const board = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"],
];

console.log(`${board.join("\n")}\n\n`);
