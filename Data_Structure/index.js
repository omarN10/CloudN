//Testing linkedList from session9
const linkedList = require("./session9.js");
// const Stack = require("./session10.js"); //based on linked list
const Stack = require("./session11.js"); //based on array
const Queue = require("./session12.js"); //get the queue
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
/* 
var stack = new Stack();
console.log(`isEmpty: ${stack.isEmpty()}`);
stack.push(12);
stack.push(23);
stack.push(34); */
/* console.log(stack.size());
stack.print();
console.log(`pop: ${stack.pop()}`)

 */
/* stack.print();

while (!stack.isEmpty()) {
  console.log(`pop: ${stack.pop()}`);
  console.log(`size: ${stack.size()}`);
  stack.print();
}
 */

let queue = new Queue();
queue.enqueue(5);
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
// queue.print();
// queue.dequeue();
// queue.print();
console.log(queue.peek());

if (queue.isEmpty()) {
  console.log("queue is empty");
} else {
  console.log("queue is not empty");
}
