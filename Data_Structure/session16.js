//implementing hash tables
//converting keys to array index
//collision handling

/* 
    name: Hash

    inputs: -key

    Processes: 
*/

//class for hash table

class HashTable {
  entries;
  initialSize;
  entriesCount;
  constructor() {
    this.initialSize = 3;
    this.entriesCount = 0;
    this.entries = new Array(this.initialSize);
  }
  getHash(key, tableSize) {
    let FnvOffsetBasis = 2166136261;
    let FNVPrime = 16777619;
    let data = Buffer.from(key.toString(), "ascii");
    let hash = FnvOffsetBasis;
    for (let i = 0; i < data.length; i++) {
      hash ^= data[i];
      hash *= FNVPrime;
      console.log(
        `hash: ${key} ${hash} ${hash.toString(16)} ${
          hash % this.entries.length
        }`
      );
    }
    return +hash % tableSize;
  }
  ResizeOrNot() {
    if (this.entriesCount < this.entries.length) {
      return;
    }
    let newSize = this.entries.length + this.initialSize;
    console.log(`reszefrom  ${this.entries.length} to ${newSize}`);
  }
}

/* let testingHash = new Array(3);
testingHash[0] = { key: "someKey", value: "someValue" };
console.log(testingHash[0].value)
 */
//testing fnmvm
// let objTesting = new HashTable();
// objTesting.getHash(1,10);
/* function testingHashFunction(number) {
    
    let FnvOffsetBasis = 2166136261;
    let FNVPrime = 16777619;
    let data = Buffer.from(number.toString(),'ascii');
    let hash = FnvOffsetBasis;
    for (let i = 0; i < data.length; i++) {
        hash ^= data[i];
        hash *= FNVPrime;
        console.log(`hash: ${number} ${hash} ${hash.toString(8)} `)
    }
}
 */
