// console.log("to test this file and upload it");

//synchronous vs asynchronous

// console.log("test A");
// setTimeout(test1, 3000);
// function test1() {
// 	console.log("test C");
// }

// //set intervals

// let firstName = "Omar";
// setInterval(() => {
// 	testName(firstName);
// }, 1000);
// function myFunction() {
// 	let d = new Date();
// 	console.log(`${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`);
// }
// //function to print name for time
// function testName(name) {
// 	console.log(name);
// }

// const codeBlocker = () => {
// 	let i = 0;
// 	while (i < 1000000000) {
// 		i++;
// 	}
//     return "count to 10k is complete"
// };

//testing with async to return promise
const codeBlocker = async () => {
	return Promise.resolve().then(() => {
		let i = 0;
		while (i < 10) {
            console.log("omar");
			i++;
		}
		return "count to 10k is complete";
	});
};
console.log("test a");
codeBlocker().then(x => console.log(x));
console.log("test b");
