//functions
//we have 4 types of functions
//regular function
//console.log(add_number(10,40));

function add_number(firstNum, secondNum = 10) {
  let result = firstNum + secondNum;
  return result;
}

//you can use the default value by declaring the value with the variable
/* function add_number(firstNum, secondNum=10) {
  let result = firstNum + secondNum;
  return result;
}
 */
let result = add_number(2);
// console.log(result);
// console.log(result);
//console.log(add_number(6,10));

//function expression

const add_numbers1 = function (firstNum, secondNum) {
  let result = firstNum + secondNum;
  return result;
};
// console.log(add_numbers1(10,40));

//arrow function
const add_numbers1Test = (firstNum, secondNum = 10) => {
  let result = firstNum + secondNum;
  return result;
};

const testArrow = firstnumber => console.log(firstnumber * 2);
// console.log(add_numbers1Test(5));
// console.log(testArrow(10));
// console.log(result);
// testArrow(result);
// let result = add_number(2, 4) +add_numbers1Test(2,3);
// console.log(result);

function add_test(...nums) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    console.log(nums[i]);
    result += nums[i];
  }
  console.log(result);
}
// add_test(15,25,30,40);

const add11 = function (number1,number2) {
  console.log(number1+number2);
}
add11(10,5);