//working with array
//testing operations

// let arrayTest = [10, 20, 30, 40];
// arrayTest.push(10)

/* for (let i = 0; i < arrayTest.length; i++) {
    console.log(arrayTest[i]);
} */

/* class Program {
  constructor(name) {
    this.name = name;
    this.age = 28;
  }

  printOut(){
    console.log(`name is ${this.name} and age is ${this.age}`);
  }
  getAge(){
    // console.log(this.age);
    console.log("testing");
    return `age is this ${this.age}`;
  }
}

let pro1 = new Program("omar");
// console.log(pro1.name);
pro1.printOut()
console.log(pro1.getAge());
 */

class ourArray {
  resize(arr, newSize) {
    if (newSize <= 0) {
      return;
    }
    if (arr == null) {
      return;
    }
    if (arr.length == newSize) {
      return;
    }
  }
}
class Program {
  test(params) {
    arr = [1, 2, 3];
    newArr = new ourArray();
    newArr.resize(arr, 5);
  }
}
/* 
let arr = [2, 4, 5, 6];
let testVar = arr[0]
console.log(testVar);
 */