//quick sort using recursion

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[0];
  let lessArr = [];
  let greatArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      lessArr.push(arr[i]);
    } else {
      greatArr.push(arr[i]);
    }
  }
  return [...quickSort(lessArr), pivot, ...quickSort(greatArr)];
}
let testArr = [3, 7,1, 5, 6, 9, 4,8, 2];
console.log(quickSort(testArr));
