//shadow coding

//find if number is prime

function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

/* console.log(isPrime(1));
console.log(isPrime(5));
console.log(isPrime(6));
console.log(isPrime(3));
 */

//recursion
// Base case and recursive case
//base case is the condition where iterating stops

//factorial in recursion

function fact(number) {
  //base case
  if (number < 2) {
    return 1;
  }
  //recursive case
  return number * fact(number - 1);
}

/* console.log(fact(5));
console.log(fact(6));
console.log(fact(-10));
 */
//linear search vs binary search
let testingArr = [1, 4, 6, 8, 9, 2];
let sortArr = testingArr.sort((a, b) => a - b);
console.log(sortArr);
function linearSearch(numbers, n) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] == n) {
      return i;
    }
  }
  return -1;
}
// console.log(linearSearch(testingArr,9));

function binarySearch(number, n) {
  //check if array is not empty
  if (number.length < 1) {
    return -1;
  }
  //create left right and mid
  let left = 0;
  let right = number.length - 1;
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (number[mid] == n) {
      return mid;
    } else if (number[mid] > n) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
}

console.log(binarySearch(sortArr, 1));
