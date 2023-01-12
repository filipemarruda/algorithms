// Hi Mark, there is the solution! I had a time today to implement it! =) (juuuuuust three stacks!! owrlllllll! rs)

// Implement a function to merge 3 sorted integer arrays. 
// The output should be another sorted integer array consisting of all integers from the 3 input arrays. 
// The input arrays may have duplicates, but the output array shouldn't have any duplicate.

// input 3 sorted arrays
// output 1 sorted array containing the number from three input arrays
// [1,2,8] [2,3,4,5,7,10] [3,3,5,6,7]

// A     B     C
function mergeThreeArrays(one, two, three) {
  
  const result = [];
  const hashTable = {};

  do {

    const [ nextDonator ] = [one, two, three]
      .filter(arr => arr.length > 0) // discard empty's
      .sort((a, b) => a[0] - b[0]); // order by the lowest (looking for the first's)

    const nextItem = nextDonator.shift(); // pops from the 'donator' (the stack that has the lowest one)

    if (!hashTable[nextItem]) { // unique inserts for each element
      result.push(nextItem);
      hashTable[nextItem] = true;
    }

  } while (one.length > 0 || two.length > 0 || three.length > 0);

  return result;
}

console.log(mergeThreeArrays([1,2,8], [2,3,4,5,7,10], [3,3,5,6,7]));