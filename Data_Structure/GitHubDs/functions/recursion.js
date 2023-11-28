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
