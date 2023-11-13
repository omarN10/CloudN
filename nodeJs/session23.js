let colors = ["black", "White", "Gray", "Red", "Green"];
//testing indexof
/* 
let index1= colors.indexOf("blue");
console.log(colors.indexOf("blue"));
 */
function createCounter(n) {
  let counter = n;
  return function () {
    const counterNew = counter;
    counter = counter + 1;
    return counterNew;
  };
}
console.log(createCounter(10));

var createCounter = function (n, array) {
  let counter = n.length;
  let array1 = new Array();
  for (let i = 0; i < array.length; i++) {
    array1.push(n + i);
  }
  //console.log(array1);
  return function () {
    array1;
  };
};
console.log(createCounter(10, ["Call", "Call", "Call"]));

// console.log(colors[colors.length-1]);
Array.prototype.last = function () {
  if (this.length < 1) {
    return -1;
  }
  return this[this.length - 1];
};
console.log(colors.last());

//check if the array  have a specific element
let testExists = false;
if (colors.includes("gray") == true) {
  testExists = true;
  console.log("element exist");
  console.log(colors.includes("Gray"));
} else {
  console.log("element doesn't exist");
}

/* 
let testBool = false;
if (colors.indexOf("Gray") === -1) {
    testBool = false;
    console.log(testBool);
}else{
    testBool= true;
    console.log(testBool);   
}
if (testBool == true) {
    console.log("item exists");
}else{
    console.log("item doesn't exists");
}
 */

/* 
let testColors = colors.slice(1, 34);
if (testColors.length > 0) {
  for (let i = 0; i < testColors.length; i++) {
    if (testColors[i] == "White" || testColors[i] == "Gray") {
      console.log(`color is : ${testColors[i]}`);
    }
  }
}
 */
// colors.splice(3, 1,"Yellow","Blue");
/* console.log(colors.join("-"));
console.log(colors); */

//testing rest parameters
/* function testRest(...values) {
    let total = 0;
    for(let value of values){
        total += value;
        //console.log(value);
    }
    return total;
}
 */
//testing concat arrays
/* let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr4 = [10, 11, 12];
let arr3 = arr1.concat(arr2, arr4);
console.log(arr1);
console.log(arr2);
console.log(arr4);
console.log(arr3);
 */

/* 
let str1 = "firstName ";
let str2 = "lastName";
let str3 = str1.concat(str2);
console.log(str3.toUpperCase());
console.log(str3.charAt(0)); */
