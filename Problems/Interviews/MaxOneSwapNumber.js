/*
Given an array like [1,1,2,3,4,5] which represents decimal number 12345, find the most valuable swap to produce the maximum number with at most 1 swap. 
For [1,2,3,4,5], the correct answer should be swapping 1 with 5, which produces [5,2,3,4,1] or 52341 in decimal value
*/
function maxOneSwapNumber(array) {
  const sorted = [ ...array].sort((prev, curr) => prev <= curr ? 0 : -1);

  let swapIndexFrom = -1;
  while(array[swapIndexFrom] === sorted[swapIndexFrom]) swapIndexFrom++;
  if(swapIndexFrom === -1) return array;

  const tempValue = sorted[swapIndexFrom];
  const swapIndexTo = array.indexOf(tempValue);
  [array[swapIndexTo], array[swapIndexFrom]] = [array[swapIndexFrom], array[swapIndexTo]];
  return array;
}



console.log(maxOneSwapNumber([1,5,2,3,4]))