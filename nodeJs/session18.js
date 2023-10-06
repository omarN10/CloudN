//hands on exercises

//get the factorial !5

let number = 5,
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

for (let i = 1; i <= number; i++) {
	total = total * i;
	console.log(total);
}
// console.log(total);
