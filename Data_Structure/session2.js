//data and memory
let testArr = [10, 20, 30, 40];
function getSum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// console.log(getSum(testArr));
class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
}

let node1 = new ListNode(2);
let node2 = new ListNode(3);
node1.next = node2;
// console.log(node1);

let list = new LinkedList(node1);
let list1 = new LinkedList(node2);
// console.log(list);
if (list1.head != null) {
  // console.log("not null");
//   console.log(list1);
}

//testing constructor function

class Student {
    constructor(name){
        this.name = name;
    }
}
let firstName = "Omar";
const std1 = new Student(firstName);
// console.log(std1.name);

//testing recursion
//remember that recursion are a bit similar to loop and have base case which is stopping condition
/* 
let sum=0;
function getSum(num) {
    sum += num;
    console.log(num);
    if (num >100) {
        return;
    }
    num +=10;
    getSum(num); //base case
    // return(num);
}

console.log(getSum(10)); */
/* 
function sum(number) {
    if (number<=0 ) {
        return 0;
    }
    return number + sum(number-1);
}
console.log(sum(5)); */

/* function addUpComplex(n)  {
  return (n * (n + 1)) / 2;
}

console.log(addUpComplex(10)); */