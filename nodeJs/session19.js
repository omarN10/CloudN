//session 19
//hoisting moving all declarations to the top of the current scope
/* let number1 = 6;
let number2 = 21;
if (!number1 % 2 == 0) {
  console.log(`${number1} is even number`);
} else {
  console.log("number is odd");
}
 */

//testing the dollar sign in object declaration

/* let $test = 10;
console.log(test);
 */
let objTest = {
  $name: "omar",
  $age: 10,
  $title: "software Engineer",
};
let $fullDetails = `the name is ${objTest.$name} age ${objTest.$age} and title is ${objTest.$title} `;

function $testIngFun(number1, number2) {
  let total;
  total = number1 + number2;
  console.log(total);
  total = number1 * number2;
  console.log(total);
  total = number1 / number2;
  console.log(total);
  total = number1 - number2;
  console.log(total);
}
// $testIngFun(10, 20);

//longest prefix in string
//testing comparing string
let str1 = "omar";
let str2 = "omar ";
/* if (str1.slice()==str2) {
  console.log(true);  
} */
let counter = str1.length;
let counter1 = str2.length;
// console.log(counter);
let string1 = str1.slice(0, counter);
let string2 = str2.slice(0, counter1);

for (let i = 0; i < str1.length; i++) {
  if (string1 == string2) {
    console.log("true equality");
  } else {
    counter--;
    counter1--;
  }
}
/*let arrTest = [10, 20, 30, 40, 50];
console.log(arrTest);
arrTest.push(10)
console.log(arrTest); */

