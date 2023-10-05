{
	//block scope
	// var data = 4;
}

// console.log(data);

//any varialbe declared in function only accessible in the function scope
function test() {
	var data = 5;
	console.log(data);
}
// test();

function test1() {
	var data = 5;
	console.log(data);
}
test1();
var data = 14;
console.log(data);