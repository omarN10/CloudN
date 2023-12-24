//create two functions

//1. quickSort

//2. mergeSort

//exports two functions

function quickSort(array) {
  let left_arr = [];
  let right_arr = [];
  let pivot = array[0];
  //base case
  if (array.length < 2) {
    return array;
  }
  for (let i = 1; i < array.length; i++) {
    if (array[i] <= pivot) {
      left_arr.push(array[i]);
    } else {
      right_arr.push(array[i]);
    }
  }

  return quickSort(left_arr).concat(pivot).concat(quickSort(right_arr));
}

//create mergeSort
function merger(arr1, arr2) {
  let i = 0;
  let j = 0;
  let mergedArr = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      mergedArr.push(arr2[j++]);
    } else {
      mergedArr.push(arr1[i++]);
    }
  }
  while (i < arr1.length) {
    mergedArr.push(arr1[i++]);
  }
  while (j<arr2.length) {
    mergedArr.push(arr2[j++])
  }
  return mergedArr;
}

function mergeSort(array) {
  //create a base case
  if (array.length <= 1) {
    return array;
  }

  //get the middle
  let middle = Math.floor(array.length / 2);
  let leftArr = mergeSort(array.slice(0, middle));
  let rightArr = mergeSort(array.slice(middle));

  return merger(leftArr, rightArr);
}

// module.exports=quickSort;
let arrTesting = [2, 1, 4, 6, 8, 9];
// console.log(quickSort(arrTesting));
// module.exports = quickSort;
/* module.exports.myDateTime = function () {
  return Date();
};
 */
/* function myDateTime1() {
    return Date();
}; */
// console.log(dt.myDateTime())
// let sortedArr=quickSort(arrTesting)
// console.log(sortedArr)
// console.log(testing())
// console.log(myDateTime1())

module.exports = { quickSort ,mergeSort};

// console.log(mergeSort(array))