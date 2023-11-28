//create algorithm for selection sort
//two functions
//one gets the smallest index
//other returns new arr by adding the smallest index and removing it from the old array

function getSmallest(arr) {
    if (arr.length<1) {
        return arr;
    }
    //initialize pointers
    let smallest = arr[0];
    let smallest_index = 0;

    for (let i = 0; i <= arr.length; i++) {
        if (smallest>arr[i]) {
            smallest = arr[i];
            smallest_index = i;
        }
    }
    return smallest_index;
}

function selectionSort(arr) {
    //create new arr to add smallest values
    let newArr = [];
    let smallest = 0;
    /* for (let i = 0; i < arr.length; i++) {
        smallest = getSmallest(arr);
        // console.log(`smallest is ${smallest}`);
        newArr.push(arr.splice(smallest,1))
    } */
    while (arr.length>0) {
        smallest=getSmallest(arr);
        newArr.push(arr.splice(smallest,1).toString());
    }
    for (let i = 0; i < newArr.length; i++) {
        newArr[i] = parseInt( newArr[i]);
        
    }
    return newArr;
}
let arrTest = [2,4,3,6,1,5]
console.log(selectionSort(arrTest));

/* let newArrTest = [];
newArrTest.push(arrTest.pop(3))
console.log(newArrTest); */

//testing the remove element with splice

// console.log(arrTest.splice(1,1));
