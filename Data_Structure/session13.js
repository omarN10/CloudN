//keyValuePair- dictionary

const quickAndMergeSorting = require("./quickAndMergeSorts");
const hashTables = require("./hashTable");
// let name = "Omar";
// console.log(quickAndMergeSorting.printName(name));

let arrTest = [10, 2, 6, 4, 7];
const array = [4, 1, 2, 7, 5, 3];

// console.log(quickAndMergeSorting.quickSort(arrTest));
// console.log(quickAndMergeSorting.quickSort(array));

// console.log(quickAndMergeSorting.mergeSort(arrTest));
// console.log(quickAndMergeSorting.mergeSort(array));

let table2 = new hashTables();
table2.set("Janet", "2000");
table2.display();
