const name = "omar";

/* setTimeout(() => {
  // printName(name);
}, 2000); */
function printName(name1) {
  console.log(name1);
}

//promises and async
//Asynchronous and synchronous programming
//JavaScript is single threaded language
/* 
console.log("function to do something");

setTimeout(() => console.log("get the list from the db"), 2000);
setTimeout(() => console.log("get the latest new"), 4000);

console.log("testing the waiting ");
 */

//Promises
//Promise make it easy to support Async programming
//promise means i will do in the future
/* 
const myPromise = new Promise((resolve, reject) => {
  // console.log("testing");

  let conenct = true;
  if (conenct) {
    resolve("connection established");
  } else {
    reject(Error("connection failed"));
  }
});

myPromise.then(
  (resolved) => {
    console.log(resolved);
  },
  (rejected) => console.log(rejected)
);
 */

const myPromise = new Promise((resolve, reject) => {
  // console.log("testing");
  /*resolve("Success");
  reject("failed"); */
  let number = Math.random() * 100;

  if (number < 70) {
    resolve("Good Number");
  } else {
    reject("Bad Number");
  }
});
/* 
myPromise.then(
  (resolved) => {
    console.log(resolved);
    // document.getElementById("Test1").innerHTML = resolved;
  },
  (rejected) => {
    // console.log(rejected);
    // document.getElementById("Test1").innerHTML = rejected;
  }
);
 */
myPromise.then(
  (resolved) => {
    console.log(resolved);
    // document.getElementById("Test1").innerHTML = resolved;
  },
  (rejected) => {
    console.log(rejected);
    // document.getElementById("Test1").innerHTML = rejected;
  }
);
// myPromise.catch((rejected) => console.log(rejected));
