// statements - if
//if(condition){code}
//boolean conditions true or false

var x = 5;
var y = 6;
var first_name = "Omar";
var age = 27;

if ((first_name == "Omar" && age >= 20) || (x == 5 && y == 6)) {
	// console.log("test passed and returns true");
}

//if (){} else {}
//if (condition){code}else{code}
if (first_name == "mm" && age >= 20) {
	// console.log("Ok");
} else {
	// console.log("Not Ok");
}

//if(){}
//else if(){}
//else{}

//if(condition1){code}
//else if(condition2){code} **can be many**
//else{code}

if (first_name == "sam") {
	// console.log("name is correct");
} else if (first_name == "Omar") {
	// console.log(`second condition is true and name is ${first_name}`);
} else {
	// console.log("name entered is wrong");
}
//t