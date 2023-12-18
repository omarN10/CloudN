//stack
//can be based on array or linked list
//all Data Structure are based on array or linked list
//only Array or linked list works with memory
// last in first out

//2. stack based on array
module.exports = class Stack {
  #data_list;
  #top_index;
  constructor(unique) {
    this.#data_list = [];
    this.#top_index = -1;
  }
  push(_data) {
    this.#data_list.push(_data);
    this.#top_index++;
  }
  pop() {
    if (this.#top_index == -1) return;
    var head_data = this.#data_list.splice(this.#top_index, 1)[0];
    this.#top_index--;
    // this.#data_list.deleteHead();
    return head_data;
  }
  peek() {
    return this.#data_list[this.#top_index];
  }
  isEmpty() {
    return this.#data_list.length <= 0;
  }
  print() {
    var print_data = "";
    for (let i = this.#top_index; i >= 0; i--) {
      print_data += this.#data_list[i] + " -> ";
    }
    console.log(print_data);
  }
  size() {
    return this.#data_list.length;
  }
};
