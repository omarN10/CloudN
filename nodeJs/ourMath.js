//this file is created for testing teh modules in nodeJs

exports.fact = function factorial(number) {
  if (number <= 2) {
    return number;
  }
  let fact = 1;
  for (let i = 2; i <= number; i++) {
    fact *= i;
  }
  return fact;
};
// console.log("testing the console module");
function circleArea(radius) {
  return 3.14 * radius ** 2;
}

// exports.fact = factorial;
module.exports.circleArea = circleArea;
