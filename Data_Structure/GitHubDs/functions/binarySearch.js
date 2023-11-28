//create function that return the index that equals to target

function binarySearchTest(arr, target) {
    if (arr.length <=1) {
        return 0; 
    }

    let left = 0;
    let right = arr.length-1;
    while (left <= right) {
        let mid = Math.floor(left + (right -left)/2);
        if (arr[mid] == target) {
            // return `the index of target: ${mid}`
            return mid;
        }
        else if (arr[mid]<target) {
            left = mid+1;
        }else{
            right = mid -1;
        }
    }
    return -1;
}

let arr1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
console.log(binarySearchTest(arr1,6));