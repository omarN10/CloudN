//create binary tree

class treeNode {
  constructor(value) {
    this.value = value;
  }
  left;
  right;
}

class binarySearchTree {
  root;
  insert(value) {
    const newNode = new treeNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      do {
        if (value === currentNode.value) {
          return null;
        }
        if (value < currentNode.value) {
          if (currentNode.left) {
            currentNode = currentNode.left;
          } else {
            currentNode.left = newNode;
            break;
          }
        } else {
          if (currentNode.right) {
            currentNode = currentNode.right;
          } else {
            currentNode.right = newNode;
            break;
          }
        }
      } while (currentNode);
    }
    return this;
  }

  have(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.value) {
        return true;
      } else {
        if (value < currentNode.value) {
          if (currentNode.left) {
            currentNode = currentNode.left;
            continue;
          }
          break;
        } else {
          if (currentNode.right) {
            currentNode = currentNode.right;
            continue;
          }
          break;
        }
      }
    }
    return false;
  }
  internalPreOrder(node) {
    if (node == null) return;
    let result = " ";
    result += node.value + " -> ";
    console.log(result);

    this.internalPreOrder(node.left);
    this.internalPreOrder(node.right);
  }
  preOrder() {
    this.internalPreOrder(this.root);
  }

  internalInOrder(node) {
    if (node == null) return;
    let result = " ";
    result += node.value + " -> ";
    this.internalInOrder(node.left);
    console.log(result);
    this.internalInOrder(node.right);
  }
  InOrder() {
    this.internalInOrder(this.root);
  }

  internalPostOrder(node) {
    if (node == null) return;
    let result = " ";
    result += node.value + " -> ";
    this.internalPostOrder(node.left);
    this.internalPostOrder(node.right);
    console.log(result);
  }
  PostOrder() {
    this.internalPostOrder(this.root);
    // console.log("")
  }
}

let tree = new binarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(20);
tree.insert(30);
tree.preOrder();
tree.InOrder();
tree.PostOrder();
// console.log(tree.preOrder())
// console.log(tree.have(20))
