//hash table from freecodeCamp
let obj = {
  Nathan: "555-0182",
  Jane: "315-0322",
};
let objectTesting = new Object();
// console.log(obj["Nathan"]);
// console.log(obj["Jane"]);

//hasOwnProperty checks if the ojbect have certain key
// console.log(obj.hasOwnProperty("Nathan"));
//console.log(obj.hasOwnProperty("Omar"));

//Map
//stores key-Pairs like dictionary

const collection = new Map();
collection.set("Nathan", "555-0182");
collection.set("Jane", "555-0182");
// collection.set("Jane", "2555-0182");

if (collection.get("Nathan")) {
  // console.log("value is found: ", collection.get("Nathan"));
}
if (!collection.get("Omar")) {
  // console.log("value is not found for the key")
}
// console.log(collection.get("Jane"))
// console.log(collection.size)
for (const [key, value] of collection) {
  // console.log(`${key} = ${value}`)
}

//create HashTable class with Table and size initial properties
//add hash() function to transform keys into indices
//add the set() and get() methods for adding and retrieving key/value pairs from the table

module.exports =class HashTable {
  constructor() {
    this.table = new Array(127);
    this.size = 0;
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  set(key, value) {
    const index = this._hash(key);
    if (this.table[index]) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index][i][1] = value;
          return;
        }
      }
      this.table[index].push([key, value]);
    } else {
      this.table[index] = [];
      this.table[index].push([key, value]);
    }
    this.size++;
  }

  get(key) {
    const index = this._hash(key);
    if (this.table[index]) {
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[index][i][0] === key) {
          return this.table[index][i][1];
        }
      }
    }
    return undefined;
  }
  

  remove(key) {
    const index = this._hash(key);

    if (this.table[index] && this.table[index].length) {
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index].splice(i, 1);
          this.size--;
          return true;
        }
      }
    } else {
      return false;
    }
  }

  display() {
    this.table.forEach((values, index) => {
      const chainedValues = values.map(
        ([key, value]) => `[ ${key}: ${value} ]`
      );
      console.log(`${index}: ${chainedValues}`);
    });
  }
}

// module.exports = {HashTable};
/* 
let table1 = new HashTable();
table1.set("Nathan", "1000");
table1.set("Janet", "2000");
table1.set("Jan", "3000");
table1.set("omar", "4000");
table1.set("omarr", "5000");
// console.log(table1.get("Nathan"));
// let val1 = table1.getValue("Nathan");
let key1 = "Nathan";
console.log(`value of the ${key1}: ${table1.get(key1)}`)
// console.log(table1)
// table1.remove(key1)
// console.log(table1)

table1.display(); */