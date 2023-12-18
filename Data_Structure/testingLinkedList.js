//practice first on linkedlist

//first create class for node
//each node object has a data and next

class linkedlistNode {
  data;
  next;
  constructor(_data) {
    this.data = _data;
  }
}

let node1 = new linkedlistNode(10);
let node2 = new linkedlistNode(20);

//create iterator class
class linkedListIterator {
  currentNode;
  constructor(node) {
    this.currentNode = node;
  }
  data() {
    if ((this.currentNode.data = null)) {
      return;
    }
    this.currentNode.data;
  }
  next() {
    if (this.currentNode != null) {
      this.currentNode = this.currentNode.next;
    }
    return this;
  }
  current() {
    return this.currentNode;
  }
}
//create class for linkedList
class linkedList {
  head;
  tail;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  begin() {
    return new linkedListIterator(this.head);
  }
  append(value) {
    const newNode = new linkedlistNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
  addfirst(value) {
    const newNode = new linkedlistNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }
  find(value) {
    let currentNode = this.head;
    if (currentNode == null) {
      return;
    }
    while (currentNode.next != null) {
      if (currentNode.data == value) {
        return currentNode;
      } else {
        currentNode = currentNode.next;
      }
    }
  }
  
  addAfter(node_data, value) {
    const newNode = new linkedlistNode(value);
    let node = this.find(node_data);
    newNode.next = node.next;
    node.next = newNode;
  }
}

let list1 = new linkedList();
list1.append(10);
list1.append(20);
list1.append(30);
list1.append(40);
// console.log(list1);
// list1.addfirst("first value testing");
// console.log(list1.head.data)
// console.log(list1.head.next.data)
list1.addAfter(10, 15);
console.log(list1);
console.log(list1.head);
