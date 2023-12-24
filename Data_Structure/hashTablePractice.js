//practice on has table

//hash table also know as hash map
//hash table is based on key-value pairs
//uses hash function to map keys to array indices
//hash function is converting any data to numeric value
//hashing providing fast access to values based on their associated keys

//hash table in javascript can be implemented using maps or objects

//1. object
class hashTable {
  constructor(size) {
    this.table = {};
    this.size = size;
  }
  //create hashing function based on ASCII
  hash(key) {
    let hashValue = 0;
    //implement the hash value based on all character codes of the key
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    // console.log(hashValue % this.size);
    return hashValue % this.size;
  }

  //create insert function
  insert(key, value) {
    const hashKey = this.hash(key);
    this.table[hashKey] = value;
  }
  get(key) {
    const hashKey = this.hash(key);
    return this.table[hashKey];
  }
  remove(key) {
    const hashKey = this.hash(key);
    delete this.table[hashKey];
  }
}

let table1 = new hashTable(10);
table1.insert("productPrice1", 10);
table1.insert("productPrice2", 20);
table1.insert("productPrice3", 30);
// console.log(table1.get("productPrice3"));
// console.log(table1);

table1.remove("productPrice2");
// console.log(table1);

//understand pushing
let arr = new Array();
arr.push({ productPrice1: 10 });
// let testK = "productPrice1";
arr.push(20);
arr.push(30);
// console.log(arr[0].productPrice1);

//practice collision
//1. chaining

/* 
    1. create class with size
    2. in constructor create table from Array with size
    3. create empty array for each element
    4. create hash function from ascii
    5. add function (key, value) using push
    6. delete(key) using finding the array by key
    
 */

class hashTableCollisionChaining {
  constructor(size) {
    this.size = size;
    this.table = new Array(size);
    for (let i = 0; i < size; i++) {
      this.table[i] = [];
    }
  }
  hash(key) {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    // console.log(hashValue % this.size)
    return hashValue % this.size;
  }
  add(key, value) {
    const hashKey = this.hash(key);
    this.table[hashKey].push({key,value})
  }
  //get function
  get(key){
    const hashKey = this.hash(key);
    const bucket = this.table[hashKey];
    for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
            return bucket[i].value;
        }
        
    }
  }
  delete(key){
    const hashKey = this.hash(key);
    const bucket = this.table[hashKey]
    for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
            bucket.splice(i,1);
            return;
        }
    }
  }
}

let table2 = new hashTableCollisionChaining(10);
table2.add("o",270);
table2.add("o",27);
console.log(table2.get("o"))

