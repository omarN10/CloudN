//The sliding window pattern is a technique that involves iterating through an array and maintaining
//a "window" of elements that meet certain conditions. The window is typically defined by two pointers,
//one at the start of the window and one at the end.

/* 
The sliding window pattern is often used to solve problems that 
involve finding a subarray or subsequence of elements that meet certain conditions,
such as having a maximum or minimum sum, length, or average.
To use the sliding window pattern, we first initialize the start and end pointers to 
the beginning of the array. Then, we iterate through the array and update 
the window by moving the end pointer forward until the window meets the desired conditions. Once the window is valid, 
we can perform any necessary operations on the elements within the window, such as calculating the sum or finding the minimum element.
After performing these operations, we can then move the start pointer forward to "slide" the window along the array and
repeat the process until we have covered the entire array.
*/

function maxSumSubArray(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  //initialize two pointers to the beginning of the array
  let start = 0;
  let end = 0;
  //initialize two variables to store current and max sum
  let maxSum = 0;
  let currentSum = 0;

  while (end < arr.length) {
    currentSum += arr[end];
    maxSum = Math.max(maxSum, currentSum);

    if (currentSum < 0) {
      currentSum = 0;
      start = end + 1;
    }
    end++;
  }
  return maxSum;
}
// console.log(maxSumSubArray([1,2,-3,3,4,5,6,7,1,6]));

//create function that finds the longest contiguous subarray of a given array

function maxAvgSubarray(arr, k) {
  //create two variables
  let start = 0;
  let end = 0;

  let maxAvg = -Infinity;
  let currentSum = 0;
  //create variables to store the start and end indices of the maximum average subArray
  let maxStart = 0;
  let maxEnd = 0;

  while (end < arr.length) {
    currentSum += arr[end];
    if (end - start + 1 >= k) {
      let avg = currentSum / (end - start + 1);
      if (avg>maxAvg) {
        maxAvg =avg;
        maxStart = start;
        maxEnd = end;
      }
    }
    if (currentSum<0) {
        currentSum=0;
        start = end+1;
    }
    end++;
  }
  return arr.slice(maxStart,maxEnd+1);

}
function maxAvgSubarray1(arr, k) {
    // Initialize the start and end pointers to the beginning of the array.
    let start = 0;
    let end = 0;
    // Initialize a variable to store the maximum average.
    let maxAvg = -Infinity;
    // Initialize a variable to store the current sum.
    let currSum = 0;
    // Initialize variables to store the start and end indices of the maximum average subarray.
    let maxStart = 0;
    let maxEnd = 0;

    // Iterate through the array.
    while (end < arr.length) {
        // Add the current element to the current sum.
        currSum += arr[end];
        // If the current window is at least k elements long, update the maximum average if necessary.
        if (end - start + 1 >= k) {
            let avg = currSum / (end - start + 1);
            if (avg > maxAvg) {
                maxAvg = avg;
                maxStart = start;
                maxEnd = end;
            }
        }
        // If the current sum is negative, reset it to 0 and move the start pointer to the next element.
        if (currSum < 0) {
            currSum = 0;
            start = end + 1;
        }
        // Move the end pointer to the next element.
        end++;
    }

    // Return the maximum average subarray.
    return arr.slice(maxStart, maxEnd + 1);
}
// console.log(maxAvgSubarray1([1,2,3,4,5,6,7,9,10],3));

//Given an array of integers, find the maximum sum of a subarray with a fixed size k.

function maxSubArray(arr) {
  if (arr.length<1) {
    return 0;
  }
  //create start and end of the window

  let start = 0;
  let end = 0;
  let subArray= [];
  let maxSum = 0;
  let currSum = 0

  while (end<arr.length) {
    currSum += arr[end];
    maxSum = Math.max(currSum,maxSum);
    if (currSum <0) {
      currSum= 0;
      start = end+1;
    }
    end++;
  }
  // subArray = arr.slice(start,end);

  return maxSum;

}

let testArray = [-1,-2,-3,4,-4,5,6,7]
console.log(maxSubArray(testArray));