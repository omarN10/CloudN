//const is unchangeable anywhere
//if const variable declared inside scope it is only accessible inside the current scope
// const data = 5;

{
	const data = 6;
}
function test() {
	const data = 500;
	console.log(data);
}
test();
