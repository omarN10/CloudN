//linked list implementation

class linkedListNode {
  data;
  next;
  constructor(_data) {
    this.data = _data;
    this.next = null;
  }
}

class linkedListIterator {
  currentNode;
  constructor(node) {
    this.currentNode = node;
  }
  data() {
    if (this.currentNode == null) {
      return null;
    }

    return this.currentNode.data;
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

module.exports = class linkedList {
  head;
  tail;
  length;
  unique;
  constructor(unique) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.unique = unique ?? false;
  }
  begin() {
    return new linkedListIterator(this.head);
  }
  printList() {
    var print_data = "";
    // console.log("testing")
    for (var itr = this.begin(); itr.current() != null; itr.next()) {
      print_data += itr.data() + " -> ";
    }
    console.log(print_data);
  }
  isExist(_data) {
    if (this.find(_data)) {
      return true;
    } else {
      return false;
    }
  }

  find(_data) {
    for (var itr = this.begin(); itr.current() != null; itr.next()) {
      if (itr.data() == _data) {
        return itr.current();
      }
    }
    return null;
  }
  findParent(node) {
    for (var itr = this.begin(); itr.current() != null; itr.next()) {
      if (itr.current().next == node) {
        return itr.current();
      }
    }
    return null;
  }
  canInsert(_data) {
    if (this.unique && this.isExist(_data)) {
      console.log(_data, "Already exist");
      return false;
    } else {
      return true;
    }
  }
  insertLast(_data) {
    if (!this.canInsert(_data)) {
      return;
    }
    var newNode = new linkedListNode(_data);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  insertAfter(node_data, _data) {
    if (!this.canInsert(_data)) {
      return;
    }
    var node = this.find(node_data);
    var newNode = new linkedListNode(_data);
    newNode.next = node.next;
    node.next = newNode;
    if (this.tail == node) {
      this.tail == newNode;
    }
    this.length++;
  }
  insertBefore(node_data, _data) {
    if (!this.canInsert(_data)) {
      return;
    }
    var node = this.find(node_data);
    var newNode = new linkedListNode(_data);
    newNode.next = node;

    var parentNode = this.findParent(node);
    if (parentNode == null) {
      this.head = newNode;
    } else {
      parentNode.next = newNode;
    }
    this.length++;
  }
  deleteNode(node_data) {
    var node = this.find(node_data);
    if (node == null) {
      return;
    }
    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
    } else if (this.hed == node) {
      this.head = node.next;
    } else {
      var parentNode = this.findParent(node);
      if (this.tail == node) {
        this.tail = parentNode;
      } else {
        parentNode.next = node.next;
      }
    }
    this.length--;
    node = null;
  }
  insertFirst(_data) {
    if (!this.canInsert(_data)) {
      return;
    }
    var newNode = new linkedListNode(_data);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }
  deleteHead() {
    if (this.head == null) {
      return;
    }
    this.head = this.head.next;
    this.length--;
  }
  deleteLast() {
    if (this.head == null) {
      return;
    } else if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
      this.length--;
    }
    else{
      var parentNode = this.findParent(this.tail);
      parentNode.next = null;
      this.tail = parentNode;
      this.length--;
    }
  }
};

//testing return this
/* 
const Calculator = {
  value: 0,
  add(num) {
    this.value += num;
    return this;
  },
  substract(num) {
    this.value -= num;
    return this;
  },
  multiply(num) {
    this.value *= num;
    return this;
  },
  divide(num) {
    this.value /= num;
    return this;
  },
}; */
// console.log(Calculator.add(10));
/* const result = Calculator.add(10).substract(5).multiply(2).divide(3).value;
console.log(result)
 */
