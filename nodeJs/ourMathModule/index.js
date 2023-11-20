/* 
    avg function
    inputs: nums[] ...nums
    - sum all nums
    - divide sum on nums.length
    - return result
*/

exports.avg = function avg(...nums) {
  let result = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  result = sum / nums.length;
  return result;
};

/* 
    sets union
    inputs: 2 arrays .. first_set .. second_set
    
    steps:
    - copy first_array elements to the result
    - copy from second array to the result all elements that is not inculded in the 
    first array
    -return result
*/

exports.unionTwoSets = function unionTwoSets(first_set, second_set) {
  let result = new Array();
  /* for (let i = 0; i < first_set.length; i++) {
    result.push(first_set[i]);
  } */
  result = first_set;
  for (let j = 0; j < second_set.length; j++) {
    if (!result.includes(second_set[j])) {
      result.push(second_set[j]);
    }
  }
  return result;
};

/* let arr1 = [1, 2, 3, 4, 5];
let arr2 = [2, 4, 5, 6, 7, 8, 9];
console.log(unionTwoSets(arr1,arr2)); */

/* 
    sets intersection
    return items that exists in two arrays
    inputs: 2 arrays .. first_set .. second_set
    steps:
    -for each item in first set
    -if the item included in the second set push to result array 
*/
module.exports.intersection = function intersectionSets(first_set, second_set) {
  let result = [];
  for (let i = 0; i < first_set.length; i++) {
    if (second_set.includes(first_set[i])) {
      result.push(first_set[i]);
    }
  }
  return result;
};

//return max number

exports.max = function max(...nums) {
  let max = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  return max;
};
/* 
    find difference between two arrays
    inputs: two Array array1, array2
    steps:
    - for each in two arrays
    - check if the item doesn't exist in the first add it to result array

 */

exports.difference = function differenceArrays(array1, array2) {
  let result = new Array();
  for (let i = 0; i < array1.length; i++) {
    if (!array2.includes(array1[i])) {
      result.push(array1[i]);
    }
  }
  for (let j = 0; j < array2.length; j++) {
    if (!array1.includes(array2[j])) {
      result.push(array2[j]);
    }
  }
  return result;
};
