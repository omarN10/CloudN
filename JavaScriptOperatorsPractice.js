//understand all javascript operators

//1. conditional (ternary) operator  ? :

let name = "Omar";
let lastName = "Nasr";
let number1 = 10;
function testing(name1) {
  if (name1 == "Omar") {
    return true;
  }
}
let bool1 = testing(name);
let bool2 = !testing(name);
// console.log((testing(name) && number1 ==10 && true) ? "yes" : "no");
// console.log(bool2 ? "yes" : "no");

//2. nullish coalescing operator (??)
// return the right value if the first value is null or undefined
let testVar;
let testVar1 = null;
let number2 = testVar ?? "testing1 default value";
let number3 = testVar1 ?? "testing2 default value";
// console.log(number2);
// console.log(number3);

//3. Optional Chaining Operator
//return null or undefined instead of returning an error

//4. spread (...) operator
//expands an iterable into more elements

const numbers = [220, 35, 21, 87, 56];
let maxValue = Math.max(...numbers);
console.log(maxValue)
