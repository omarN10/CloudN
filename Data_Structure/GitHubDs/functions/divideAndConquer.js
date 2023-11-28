/* 
    Divide-and-Conquer
    The divide-and-conquer pattern is a common algorithmic technique used to solve problems by
    dividing them into smaller subproblems, solving those subproblems, 
    and then combining the solutions to the subproblems to solve the original problem.
*/

//Implement a function search that takes in a sorted array of integers sortedArr and
//a value value and returns the index of value in the array, or -1 if it is not present.

function searchTest(arr,k) {
    if (arr.length <=1) {
        return arr;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]==k) {
            return i;
        }
        
    }
    return -1;
}

let testArr = [1,2,3,4,5,6,7,8,9];
console.log(searchTest(testArr,8));