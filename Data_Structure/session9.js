//linked list implementation

class linkedListNode {
  date;
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

module.exports = class linkedList {
  head;
  tail;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  begin() {
    return new linkedListIterator(this.head);
  }
  printList() {
    var print_data = "";
    for (var itr = this.begin(); itr.current() != null; itr.next()) {
      print_data += itr.data + " -> ";
    }
    console.log(print_data);
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
  insertLast(_data) {
    var newNode = new linkedListNode(_data);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
  insertAfter(node_data, _data) {
    var node = this.find(node_data);
    var newNode = new linkedListNode(_data);
    newNode.next = node.next;
    node.next = newNode;
    if (this.tail == node) {
      this.tail == newNode;
    }
  }
  insertBefore(node_data, _data) {
    var node = this.find(node_data);
    var newNode = new linkedListNode(_data);
    newNode.next = node;

    var parentNode = this.findParent(node);
    if (parentNode == null) {
      this.head = newNode;
    } else {
      parentNode.next = newNode;
    }
  }
  deleteNode(node_data) {
    var node = this.find(node_data);
    if (node == null) {
      return;
    }
    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
    }else if (this.hed ==node) {
      this.head = node.next;
    }
  }
};

//testing return this
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
};
// console.log(Calculator.add(10));
/* const result = Calculator.add(10).substract(5).multiply(2).divide(3).value;
console.log(result)
 */
