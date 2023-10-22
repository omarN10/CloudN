//testing flags and throwing errors
//use try and catch

//declare a flag

let flagTest = false;
function getRectArea(width, hieght) {
  if (isNaN(width) || isNaN(hieght)) {
    throw new Error(`parameter is not a number ${hieght} or ${width}`);
  }
}
flagTest = true;
let number1 = 10;
let number2 = "Omar10";
try {
  if (!isNaN(number2)) {
    // console.log("is number");
  } else if (isNaN(number2)) {
    // throw new Error("parameter is false");
  }
} catch (e) {
  console.error(e);
}

const event = new Date();
const jsonDate = event.toJSON();
console.log(jsonDate);
console.log(new Date(jsonDate).toString());
// console.log(event.getTime().toTimeString());
