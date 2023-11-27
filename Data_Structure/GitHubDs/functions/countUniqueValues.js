function countUniqueValues(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let obj1 = {};
  let newArr = [];
  for (const value of arr) {
    obj1[value] = (obj1[value] || 0) + 1;
  }
  for (const key in obj1) {
    if (obj1[key] == 1) {
      newArr.push(key);
    }
  }
  return newArr;
}
let testArr = [2, 3, 6, 7, 9, 1, 2, 3];
let arrSorted = [1,2,3,3,4,5,6,7,7,9];
// console.log(countUniqueValues(testArr));

/* let obj12 = {
    test:1,
    age: 30
}
for (const key in obj12) {
    console.log(obj12[key]);
} */

function countUniqueValues1(arr) {
  if (arr.length<=1) {
    return arr;
  }
  
  //initiate a counter and a pointer to the first element
  let i = 0;
  for (let j = 1; j <arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }

  return i+1;
}

console.log(countUniqueValues1(arrSorted));