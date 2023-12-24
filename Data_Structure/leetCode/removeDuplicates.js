//testing converting array to set
/* 
let arr = [0,0,1,1,1,2,2,3,3,4];
let set1 = new Set(arr);
let k = set1.size
console.log(k) */
var removeDuplicates = function(nums) {
    let set= new Set(nums);
    let k = set.size
    let newArr =Array.from(set);
    for (let i = 0; i < nums.length; i++) {
        nums[i]= newArr[i]
    }
    return k;
};

var removeDuplicatesTesting = function(nums) {
    let count = 0;
    // Loop for all the elements in the array
    for (let i = 0; i < nums.length; i++) {
        // If the current element is equal to the next element, we skip
        if (i < nums.length - 1 && nums[i] == nums[i + 1]) {
            continue;
        }
        // We will update the array in place
        nums[count] = nums[i];
        count++;
    }
    return count;
};
var removeDuplicates2 = function(nums) {
    if (nums.length === 0) {
        return 0;
    }
    let set = new Set(nums)
    let uniques = [...set]
    for (let i = 0; i < nums.length; i++) {
        nums[i] = uniques[i]
    }
    let k = set.size
    return k
};
console.log(removeDuplicates([1,1,2]))
console.log(removeDuplicatesTesting([1,1,2]))