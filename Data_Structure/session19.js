//binary search tree
//testing two objects
let obj1 = {
  0: 10,
};
let obj2 = {
  0: 10,
};
let str = "eeatt";
let ojbTesting = {};
for (let i = 0; i < str.length; i++) {
  let key = str[i];
  if (!ojbTesting.hasOwnProperty(key)) {
    ojbTesting[key] = 1;
  } else {
    ojbTesting[key] += 1;
  }
}
console.log(ojbTesting);
