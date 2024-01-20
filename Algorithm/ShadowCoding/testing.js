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
 
console.log(fact(5));
console.log(fact(6));
console.log(fact(-10));

