//array

let array1 = new Array(3);
array1[0] = 1520;
array1[1] = 1520;
// array1[ 2]= 1520;
array1[2] = array1[0] + array1[1];

//2d array

let array2 = [
  [1, 2],
  [3, 4],
  [4, 5],
];
// console.log(array2[0].length);
/* 
for (let i = 0; i < array2.length; i++) {
  for (let j = 0; j < array2[i].length; j++) {
    console.log(array2[i][j]);
  }
}
 */
//jagged array
//array of arrays of different lengths

let array4Jagged = [
  [1, 2, 3],
  [4, 5],
  [6, 7, 8, 9],
];

// console.log(array4Jagged);
