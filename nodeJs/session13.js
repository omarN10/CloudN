//let, var, const
//const number1 = 10;   //cannot be changed in the future
//explain difference between var, const and let
//any variable decalared with var is accessible and modifiable at any scope

var data = 5;
var data = 6; //declaring variables for two time is not the best action
console.log(data);
{
	console.log(data);
	var data = 7;
	console.log(data);
}
function how() {
	console.log(data);
	var data = 8;
}
// how();
