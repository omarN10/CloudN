//functions
//we have 4 types of functions
//regular function
console.log(add_number(10,40));

function add_number(firstNum, secondNum) {
  let result = firstNum + secondNum;
  return result;
}

let result = add_number(2, 4);
//console.log(result);
//console.log(add_number(6,10));

//function expression

const add_numbers1 = function (firstNum, secondNum) {
  let result = firstNum + secondNum;
  return result;
};
console.log(add_numbers1(10,40));

//arrow function
const add_numbers1Test = (firstNum,secondNum = 10) => {
  let result= firstNum+secondNum;
  return result;
}
console.log(add_numbers1Test(5));