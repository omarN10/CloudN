//queue
const LinkedList = require("./session9.js");
/* var linkedList = new LinkedList(true);
linkedList.insertLast(10)
//console.log(linkedList);
linkedList.insertBefore(10,5);
console.log(linkedList)
linkedList.insertFirst(1);
// linkedList.deleteLast();
console.log(linkedList)

 */

//creating queue

module.exports= class Queue {
  #data_list;
  constructor() {
    this.#data_list = new LinkedList();
  }

  enqueue(_data) {
    this.#data_list.insertLast(_data);
  }
  dequeue() {
    var node_data = this.#data_list.head;
    this.#data_list.deleteHead();
    return node_data;
  }
  peek() { //returns the first element in the queue
    if (this.#data_list.head == null) {
      return null;
    }
    return this.#data_list.head.data;
  }
  isEmpty() {
    if (this.#data_list.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  size() {
    return this.#data_list.length;
  }
  print() {
    this.#data_list.printList();
  }
}
