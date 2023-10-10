//adding index.js to the repo
// document.write("adding this file to the repo");
// console.log("tes");

//create a function that loop through array and give an empty array

function testArray(arr) {
  if (arr.length > 0) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
      console.log(`current number = ${arr[i]}`);
      console.log(`total is ${total}`);
    }
  } else {
    console.log("you entered an empty array");
  }
}

let arr1 = [1, 2, 3, 4, 5, 6, 7];
let arr2 = [];
testArray(arr1);
console.log("then print arr2 ");
testArray(arr2);
