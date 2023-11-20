//hands on exercises

//get the factorial !5

let number = 10,
  total = 1;
let iteration = number;
// for (let i = 0; i <= 5; i++) {
// 	if (number == 0) {
// 		break;
// 	}
// 	console.log((total *= number));
// 	number--;
// }

// for (let i = 0; i < iteration; i++) {
// 	// total +=  number * number-1;
// 	// console.log(total);
// 	// console.log(number * (number - 1));
// 	total *= number;
// 	number--;
// 	console.log(total);
// }

// for (let i = 2; i <= number; i++) {
// 	total = total * i;
// 	console.log(total);
// }
// console.log(total);

//prime number from  1 to n
//input = n

//factorial of a number

//!5 = 5*4*3*2*1

// let number1 = 5;
// let iteration1 = number1;
// let total1 = 1;
// for (let i = 0; i < iteration1; i++) {
// //   console.log(number1 - i);
//   total1 *= number1 - i;
// }
// console.log(total1);

//other solution

/* const n = 5;
let fact = 1;

for (let i = 1; i <= n; i++) {
  fact = fact * i;
  //   console.log(fact);
} */

//prime numbers are any number that cannot be divided evenly by other numbers except 1 and it self and should be greater than 1

//check a number is prime or no

/* 
loop i = from 1 to n
	loop j=  from 2 to i
		i % j
 */
const n = 30;

for (let i = 2; i <= n; i++) {
  let isPrime = true;
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      isPrime = false;
      break;
    }
  }

  if (!isPrime) {
	// console.log(i);
  }else{
	console.log(i);
  }
}
