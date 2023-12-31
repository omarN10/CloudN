//Multiple Patterns problem solving patterns
//the multiple pattern involves using two or more pointers to solve a problem by traversing a data structure.
//the pointers typically move toward each other or towards the middle of the data structure and the algorithm performs some
//on the values at the pointers' current positions

//creating two pointers and keeps moving them until it reaches the required result

//Suppose we want to find the first pair of elements in an array that sums to a target value
let sum = 10;
let arr = [2,3, 4, 5, 6, 7,8, 9, 10];

function twoPointers(arr, sumElement) {
  let newArr = [];
  let point1 = 0;
  let point2 = arr.length - 1;

  while (point1 < point2) {
    const sum = arr[point1] + arr[point2];
    if (sum == sumElement) {
      newArr.push(arr[point1], arr[point2]);
    //   arr.pop(arr[point1], arr[point2])
      // newArr[0]= arr[point1];
      // newArr[1]= arr[point2];
      //return newArr;
      // return [arr[point1],arr[point2]];
      break;
    } else if (sum > sumElement) {
      point2--;
    } else {
      point1++;
    }
  }
  /* if (newArr.length <= 0) {
    return "there are no elements equal to required element";
  } */
  /* let iterator = arr.length;
  while (iterator>0) {
    newArr.push(arr[iterator],arr[iterator])
    iterator--;
  } */
  return newArr;
}

// console.log(twoPointers(arr, sum));


//palindrome problem with two pointers

var isPalindrome= function (x) {
  return x == x.toString().split("").reverse().join("");
}

function palindromeCheck(number) {
  if (number<1) {
    return false;
  }
  if (number>1) {
    number = number.toString();
  }else{
    return false;
  }
  //create two pointers
  let start = 0;
  let end = number.length-1;
  while (start<end) {
    if (number[start]!=number[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true
}

// console.log(palindromeCheck(0));

//Given a sorted array, find a pair of numbers that adds up to a specific target sum.
function findPair(arr, target) {
  if (arr.length <1) {
    return [];
  }
  //create two pointers 
  let start =0;
  let end = arr.length-1;
  while (start< end) {
    sum = arr[start] + arr[end];
    if (sum == target) {
      return [arr[start],arr[end]]
    }else if(sum > target){
      end--;
    }else{
      start++;
    }
  }
  return [];
  
}

let arrTesting = [1,2,3,4,5,6,7,8,9];
// console.log(findPair(arrTesting,16));

