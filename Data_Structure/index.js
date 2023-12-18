//Testing linkedList from session9
const linkedList = require("./session9.js");
// const Stack = require("./session10.js"); //based on linked list
const Stack = require("./session11.js"); //based on array
/* 
var list = new linkedList(true);
// console.log(list)
list.insertLast(1);
list.insertLast(2);
list.insertLast(2);
list.insertLast(3);
list.insertAfter(2, 5);
list.printList();
console.log(`length is : ${list.length}`);
list.printList();
// list.deleteNode(2);
// console.log(`length is : ${list.length}`);
 */

var stack = new Stack();
console.log(`isEmpty: ${stack.isEmpty()}`);
stack.push(12);
stack.push(23);
stack.push(34);
/* console.log(stack.size());
stack.print();
console.log(`pop: ${stack.pop()}`)

 */
stack.print();

while (!stack.isEmpty()) {
  console.log(`pop: ${stack.pop()}`);
  console.log(`size: ${stack.size()}`);
  stack.print();
}
