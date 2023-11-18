const ourMath = require("./index.js");
let number1 = 10;
let number2 = 20;
let number3 = 30;

let average = ourMath.avg(1,2, 3,4,5,6,7,8);
// console.log(average);
/* 
if (average ===4.5) {
    console.log(`avg success and average is ${average}`);
}else{
    console.log("avg failure");
} */

// let arr1 = [1, 2, 3, 4, 5];
// let arr2 = [2, 4, 5, 6, 7, 8, 9];
// console.log(ourMath.unionTwoSets(arr1,arr2));

// console.log(ourMath.intersection([1,2,3,4],[3,4,5]));
// console.log(ourMath.intersection(arr1,arr2));
let arrTest = [10,20,30,40]
let max_value = ourMath.max(123,200,30) 
/* 
if (max_value ===123) {
    console.log("max Success");
} else {
    console.log("max failure");
} */

let arr1 = [1, 2, 3, 4, 5];
let arr2 = [2, 4, 7, 8, 9];

let diff = ourMath.difference(arr1,arr2);
if (!diff.length==0) {
    console.log(`difference array is`, diff);
} else {
    console.log("arrays are identical");
}