//some common problem solving patterns
/* 
    - Frequency Counter
    - Multiple Pointers
    - Sliding window
    - Divide and Conquer
    - Recursion
*/

//1. Frequency counter
let obj = {};
//use object to
/* 
let arr =[1, 2, 3, 2, 3, 1, 3]
let key1 = arr[0].toString();
let key2 = arr[1].toString();
let key3 = arr[2].toString();
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
for (let i = 0; i <arr.length; i++) {
    if (key1==arr[i]) {
        counter1++;
    }
    if (key2==arr[i]) {
        counter2++;
    }
    if (key3==arr[i]) {
        counter3++;
    }
}
obj[key1 ]= counter1;
obj[key2]= counter2;
obj[key3] = counter3;
console.log(obj);
console.log(obj[key1]); */

// Write a function same that takes in two arrays of numbers arrOne and arrTwo. The function should return
//a boolean indicating whether or not the elements in arrOne are the squares of the elements in arrTwo.
/* function same(arrOne, arrTwo) {
  //declare validation variable
  let validateT = false;

  //check if the length
  if (arrOne.length !== arrTwo.length) {
    return validateT;
  }

  for (const element of arrOne) {
    if (!arrTwo.includes(element ** 2)) {
      validateT = false;
    }
    arrTwo.splice(arrTwo.indexOf(element ** 2), 1);
    validateT = true;
  }
  return validateT; //some boolean variable
}

let arr1 = [1, 2, 3, 4];
let arr2 = [1, 4, 9, 16];
if (same(arr1,arr2)) {
    console.log(`The function is returning true`);
}
 */
//testing splice

/* let arrTesting = [1, 2, 3, 4, 5, 6];
let newArr1 = arrTesting.slice(1,4)
let netArr2 = arrTesting.splice()
console.log(newArr1); */

/* const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 1, 'Feb');
// Inserts at index 1
console.log(months); */

// Write a function same that takes in two arrays of numbers arrOne and arrTwo. The function should return
//a boolean indicating whether or not the elements in arrOne are the squares of the elements in arrTwo.
//with frequency counter
function frequencyCounterFun(arrOne, arrTwo) {
  if (arrOne.length != arrTwo.length) {
    return false;
  }

  // Initialize empty frequency counter objects for arr1 and arr2
  const frequencyCounter1 = {};
  const frequencyCounter2 = {};

  for (const val of arrOne) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (const val of arrTwo) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  for (const key in frequencyCounter1) {
    const sqrtKey = parseInt(key, 10) ** 2;
    if (
      !(sqrtKey in frequencyCounter2) ||
      frequencyCounter2[sqrtKey] !== frequencyCounter1[key]
    ) {
      return false;
    }
  }
  return true;
}
/* let testArr = [1,2,3,3,4,5,1];
let frequencyCounter1 = {};
for (let val of testArr) {
    frequencyCounter1[val] = (frequencyCounter1[val] ||0 ) + 1;
}
console.log(frequencyCounter1); */
/* let arrTestingOf = [1,2,3,4,5,6];
let newArr = [];
for (const val of arrTestingOf) {
    newArr.push(val);
    console.log(val);
}
console.log(newArr); */
/* let arr11 = [1, 2, 3, 4];
let arr12 = [1, 4, 9, 14];
let boolTest = frequencyCounterFun(arr11, arr12);
if (boolTest) {
  console.log("two arrays are exponential");
} else {
  console.log("arrays are not exponential");
}
 */

function validAnagram(str1, str2) {
    if (str1.length != str2.length) {
        return false;
    }

    //create two frequency objects of the strings
    let freqObject1 = {}
    let freqObject2 = {}

    //loop to insert all characters of strings into objects with counter
    for (const val of str1) {
        freqObject1[val] = (freqObject1[val] ||0)+1;
    }
    for (const val of str2) {
        freqObject2[val]= (freqObject2[val] || 0) +1;
    }

    for (const key in freqObject1) {
        if (freqObject1[key] !== freqObject2[key]) {
            return false;
        }
    }
    return true;
}

