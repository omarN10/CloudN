
// Write a function same that takes in two arrays of numbers arrOne and arrTwo. The function should return
//a boolean indicating whether or not the elements in arrOne are the squares of the elements in arrTwo.
//with frequency counter
function frequencyCounterFun(arrOne, arrTwo) {
    if (arrOne.length != arrTwo.length) {
      return false;
    }
  
    // Initialize empty frequency counter objects for arr1 and arr2
    const frequencyCounter1 = {};
    const frequencyCounter2 = {};
  
    for (const val of arrOne) {
      frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
    }
    for (const val of arrTwo) {
      frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
    }
  
    for (const key in frequencyCounter1) {
      const sqrtKey = parseInt(key, 10) ** 2;
      if (
        !(sqrtKey in frequencyCounter2) ||
        frequencyCounter2[sqrtKey] !== frequencyCounter1[key]
      ) {
        return false;
      }
    }
    return true;
  }






  function validAnagram(str1, str2) {
    if (str1.length != str2.length) {
        return false;
    }

    //create two frequency objects of the strings
    let freqObject1 = {}
    let freqObject2 = {}

    //loop to insert all characters of strings into objects with counter
    for (const val of str1) {
        freqObject1[val] = (freqObject1[val] ||0)+1;
    }
    for (const val of str2) {
        freqObject2[val]= (freqObject2[val] || 0) +1;
    }

    for (const key in freqObject1) {
        if (freqObject1[key] !== freqObject2[key]) {
            return false;
        }
    }
    return true;
}

console.log(validAnagram);




