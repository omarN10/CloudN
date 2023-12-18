//stack
//can be based on array or linked list
//all Data Structure are based on array or linked list
//only Array or linked list works with memory
// last in first out

//1. stack based on linked list

const linkedList = require("./session9.js");
module.exports = class Stack {
  #data_list;
  constructor(unique) {
    this.#data_list = new linkedList(unique ?? false);
  }
  push(_data) {
    this.#data_list.insertFirst(_data);
  }
  pop() {
    var head_data = this.#data_list.head.data;
    this.#data_list.deleteHead();
    return head_data;
  }
  peek() {
    return this.#data_list.head.data;
  }
  isEmpty() {
    return this.#data_list.length <= 0;
  }
  print() {
    this.#data_list.printList();
  }
  size() {
    return this.#data_list.length;
  }
};
