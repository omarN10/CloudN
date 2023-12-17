//Testing linkedList from session9
const linkedList = require("./session9.js");

var list = new linkedList();
// console.log(list)
list.insertLast(1);
list.insertLast(2);
list.insertLast(10);
list.printList();
list.insertAfter(2, 5);
console.log(`length is : ${list.length}`);
list.printList();
list.deleteNode(2);
console.log(`length is : ${list.length}`);
