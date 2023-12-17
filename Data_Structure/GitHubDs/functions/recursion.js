//testing recursion for factorial
//the recursion is all about function calling itself and waits for the other result
//means each function is fully dependent on other function
//each function is opened in stack frame and kept open until the last function being called
//so each stack frame kept open until the next one finishes

function fact(number) {
  //base case
  if (number <= 1) {
    return 1;
  }

  return number + fact(number - 1);
}
// console.log(fact(5));

//practice on recursion

function getMultiplication(number) {
  //base case
  if (number <= 1) {
    return 1;
  }

  return number * getMultiplication(number - 1);
}

//recursion when a function calls itself
// const nTerms = prompt('Enter the number of terms: ');

// Write a function called collectOdd that takes in an array of numbers and
// returns a new array containing only the odd numbers from the input array.
//The function should use recursion to achieve this, and should not modify the original input array.
function collectOdd1(arr) {
  let newArr = []
  if (arr.length <1) {
    return 0;
  }
  let counter = arr.length -1;
  while (counter >=0) {
    if (arr[counter]%2 ==1) {
      newArr.push(arr[counter])
    }

    counter--;
  }
  return newArr;

}

// console.log(collectOdd([1,2,3,4,5,6]));

/* let newArr = [];
function collectOdd(arr) {  
  if (arr.length <1) {
    return newArr;
  }
  // while (arr.length >0) {
    if (arr[arr.length-1]%2==1) {
      newArr.push(arr[arr.length-1])
    }
    // arr.pop();
  
  arr.pop();
  return collectOdd(arr);
} */
let arrTesting1 = [1,2,3];
// let x = collectOdd(arrTesting1)
// console.log(collectOdd(arrTesting1));

//another solution 
function collectOdd(arr) {
  let result = [];

  // base case: if the input array is empty, return the empty result array
  if (!arr.length) {
      return result;
  }

  // if the first element in the array is odd, add it to the result array
  if (arr[0] % 2 !== 0) {
      result.push(arr[0]);
  }

  // recursive case: call the function with the result array concatenated with the rest of the input array
  result = collectOdd(result.concat(arr.slice(1)));
  return result;
}
let ss = collectOdd(arrTesting1);
console.log(ss);