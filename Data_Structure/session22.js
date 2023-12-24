//heap

//implementation of graph using tree

class TreeNode {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  //create insert and insert node functions
  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
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

  //create traverseInOrder function
  traverseInOrder(node) {
    if (node) {
      this.traverseInOrder(node.left);
      console.log(node.value);
      this.traverseInOrder(node.right);
    }
  }
}

/* const graph = new BinaryTree();
graph.insert(10);
graph.insert(20);
graph.insert(5);
graph.insert(30);
graph.insert(9);

// let printGraph
graph.traverseInOrder(graph.root) */

//create heap
//heap is type of tree
//heap can be inserted to an array

//create heap based on array
//insert function
//scratches

/* 
    1. create a node with new value in the next available location( based on level order or breadth)
    2.get the parent using formulas 
    3.compare the new value with the parent value if new value is smaller then
        -swap parent and new nodes values
        -repeat from step 2
        else
        -exit
*/

class Heap {
  #data_list;
  #size;
  constructor() {
    this.#data_list = [];
    this.#size = 0;
  }

  //insert function
  insert(data) {
    var i = this.#size;
    this.#data_list[i] = data;
    this.#size++;

    var parent_index = Math.floor((i - 1) / 2);
    while (i != 0 && this.#data_list[i] < this.#data_list[parent_index]) {
      this.#data_list[i] = this.#data_list[parent_index];
      this.#data_list[parent_index] = data;
      i = parent_index;
      parent_index = Math.floor((i - 1) / 2);
    }
  }

  //print function
  print() {
    var print_data = "";
    for (let i = 0; i < this.#size; i++) {
      print_data += this.#data_list[i] + " - ";
    }
    console.log(print_data);
  }
  //size function
  size() {
    return this.#size;
  }
  draw() {
    var levels_count = Math.log2(this.#size) + 1;
    var line_width = Math.pow(2, levels_count - 1);

    var j = 0;
    for (var i = 0; i < levels_count; i++) {
      var nodes_count = Math.pow(2, i);
      var space = Math.ceil(line_width - nodes_count / 2);
      var space_between = Math.ceil(levels_count / nodes_count);
      space_between = space_between < 1 ? 1 : space_between;
      var k = j;
      var str = " ".repeat(space + space_between);
      for (; j < k + nodes_count; j++) {
        if (j == this.#size) {
          break;
        }
        if (this.#data_list[j]) {
          str += this.#data_list[j] + " ".repeat(space_between);
        }
      }
      str += " ".repeat(space) + "\n";
      console.log(str);
    }
  }

  //delete function (pop)
  //in heap only first node can be deleted
  //change root to the last node
  pop() {
    if (this.#size == 0) return null;
    var i = 0;
    var data = this.#data_list[i];

    this.#data_list[i] = this.#data_list[this.#size - 1];
    this.#data_list[this.#size - 1] = null;
    this.#size--;

    var left_index = 2 * i + 1;
    while (left_index < this.#size) {
      var right_index = 2 * i + 2;

      var smaller_index = left_index;
      if (
        this.#data_list[right_index] != null &&
        this.#data_list[right_index] < this.#data_list[left_index]
      ) {
        smaller_index = right_index;
      }

      if (this.#data_list[smaller_index] >= this.#data_list[i]) {
        break;
      }

      var temp = this.#data_list[i];
      this.#data_list[i] = this.#data_list[smaller_index];
      this.#data_list[smaller_index] = temp;

      i = smaller_index;
      left_index = 2 * i + 1;
    }
    return data;
  }
}

var heap = new Heap();
heap.insert(24);
heap.insert(32);
heap.insert(16);
heap.insert(45);
heap.insert(20);
heap.insert(53);
heap.insert(14);
heap.insert(27);

heap.print();
heap.draw();
heap.pop();
heap.print();

heap.draw();
