//linked list

/* class testing{
    constructor(name,age){
        this.name =name;
        this.age=age;
    }

    print() {
        console.log(this.name, this.age);
    }
}

let objTesting =  new testing("omar",27);

 */

// linked list consists different nodes and each node contains a data and pointer to next node

//last node next is pointing to null and called tail

class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}
let node1 = new Node(10);
let node2 = new Node(20);
let node3 = new Node(30);
node1.next = node2;
node2.next = node3;
node3.next = null;
// console.log(node1);
/* 
if (node3.next ==null) {
    console.log("final node");
} */
/* class linkedList {
  constructor(head) {
    this.head = head;
  }
}
let list1 = new linkedList(node1);
 console.log(list1); */

//loop to get the length in the list
function loop1(list) {
  let currentNode = list.head;
  while (currentNode != null) {
    console.log(currentNode.data);
    currentNode = currentNode.next;
  }
}
//get length function
function getLength(list) {
  let counter = 0;
  let currentNode = list.head;
  while (currentNode != null) {
    counter++;
    currentNode = currentNode.next;
  }
  return counter;
}
// let list2 = new linkedList();
// console.log(getLength(list1));
// console.log(getLength(list2));
/* if (getLength(list1)!=0) {
  console.log(`the list length is = ${getLength(list1)}`);
} */

//create linkedlist

class linkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class linkedList {
  constructor() {
    this.head = null;
  }

  add(data) {
    const newNode = new linkedListNode(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
  }

  //create print function
  print() {
    let currentNode = this.head;
    while (currentNode !== null) {
      console.log(currentNode.data);
      currentNode = currentNode.next;
    }
  }
}

const linkedListTest1 = new linkedList();
linkedListTest1.add(10);
linkedListTest1.add(20);
linkedListTest1.add(30);
// linkedListTest1.print();

class doublyNode {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}
class doublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(data) {
    const newNode = new doublyNode(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  print() {
    let currentNode = this.head;
    while (currentNode !== null) {
      console.log(currentNode.data);
      currentNode = currentNode.next;
    }
  }
}

let doubleListTest = new doublyLinkedList();
doubleListTest.add(10);
doubleListTest.add(20);
doubleListTest.add(30);
doubleListTest.print();