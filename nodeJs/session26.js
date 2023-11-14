//NodeJS modules
//components
//there are two ways for modules

//common JS (CJS)

/* 
(function (exports, require, module,__filename, __dirname) {
    //your code
})
*/

// console.log(__dirname);
// console.log(__filename);
// console.log(module);
// console.log(exports);
// console.log(require);

// console.log(arguments);

/* for (let i = 0; i <arguments.length; i++) {
    console.log(arguments[i]);
} */

let math = require("./ourMath");
let test = require("f:/o/js projects/cloudBaseNative/CloudN/index");
/* 
console.log(math.fact(5));
console.log(math.circleArea(10));
test.test();
test.testModule(); */

//use the built in modules
let os = require("os");
console.log("OS: ", os.platform(),os.arch());
// console.log(os.tmpdir());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.uptime()/60/60);
