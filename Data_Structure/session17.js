const Queue = require("./session12");
//trees
//there is a lot of trees
//Binary tree, binary search tree, avl tree, splay tree, treap, b-tree, t-tree, etc..

//binary tree
//create two classes
//1. treeNode
class treeNode {
  Data;
  right;
  left;
  constructor(_data) {
    this.Data = _data;
    this.left = null;
    this.right = null;
  }
} // class treeNode
//2.BinaryTree
class binaryTree {
  constructor() {
    this.root = null;
  }
  insert(_data) {
    let newNode = new treeNode(_data);
    if (!this.root) {
      this.root = newNode;
      return;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  insertNode(node, newNode) {
    if (newNode.Data < node.Data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  search(data) {
    return this.searchNode(this.root, data);
  }
  searchNode(node, data) {
    if (!node || node.data === data) {
      return node;
    }
    if (data < node.data) {
      return this.searchNode(node.left, data);
    } else {
      return this.searchNode(node.right, data);
    }
  }
  traverseInOrder(callback) {
    this.inOrder(this.root, callback);
  }

  inOrder(node, callback) {
    if (node) {
      this.inOrder(node.left, callback);
      callback(node.data);
      this.inOrder(node.right, callback);
    }
  }
} //class binaryTree

let tree = new binaryTree();
tree.insert(4);
tree.insert(2);
tree.insert(1);

tree.traverseInOrder(data =>{
    console.log(data)
});
console.log(tree.search(5))