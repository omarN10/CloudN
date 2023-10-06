//for loop statement
//for (){}
/* for (expression; condition; increment){
    code
    }
*/

let number = 9;

// for (let i = 1; i <= 12; i++) {
//     console.log(i, i*number);
// }

//nested loop

// for (let i = 0; i <= 3; i++) {
// 	console.log(i);
// 	console.log("----");
// 	for (let j = 0; j <= 3; j++) {
// 		console.log(j);
// 	}
// 	console.log("====");
// }

for (let i = 0; i <= 6; i++) {
	if (i == 5) {
		break;
	}
	if (i % 2 == 1) {
		continue;
	}

	console.log(i);
}
