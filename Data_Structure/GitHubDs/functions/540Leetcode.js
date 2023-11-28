//You are given a sorted array consisting of only integers where every element appears exactly twice,
// except for one element which appears exactly once.

//Return the single element that appears only once.

//Your solution must run in O(log n) time and O(1) space.
var singleNonDuplicate = function (nums) {
    if (nums<=1) {
        return nums;
    }
  //declare two pointers
  let left = 0;
  let right = nums.length - 1;

  while (left<right) {
    let mid = left+ (right-left)/2;
    let isEven  = (right-mid) %2==0;
    if (nums[mid]==nums[mid-1]) {
        if (isEven) {
            right= mid-2;
        } else {
            left = mid+1;
        }
    }else if (nums[mid] == nums[mid+1]) {
        if (isEven) {
            left = mid+2;
        } else {
            right = mid-1;
        }
    }else{
        return nums[mid];
    }
  }
  return nums[left];
};
