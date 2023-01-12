// A positive integer is considered uniform if all of its digits are equal. For example, 222 is 
// uniform, while 223 is not.
// Given two positive integers A and B, determine the number of uniform integers between A and B, 
// inclusive.

// Please take care to write a solution which runs within the time limit.
// Constraints
// 1 ≤ A ≤ B ≤ 10^12

// Sample test case #1
// A = 75
// B = 300
// Expected Return Value = 5

// Sample test case #2
// A = 1
// B = 9
// Expected Return Value = 9

// Sample test case #3
// A = 999999999999
// B = 999999999999
// Expected Return Value = 1

// Sample Explanation
// In the first case, the uniform integers between 75 and 300 are 77, 88, 99, 111, and 222.
// In the second case, all 9 single-digit integers between 1 and 9 (inclusive) are uniform.
// In the third case, the single integer under consideration (999,999,999,999) is uniform.

/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
 function getUniformIntegerCountInInterval(A, B) {
  let count = 0;
  for (let size = 1; size <= 12; size++) {
    for(let digit = 1; digit <= 9; digit++) {
      const candidate = parseInt(new Array(size).fill(digit).join(""));
      if (candidate >= A && candidate <=B) count++;
    }
  }
  
  return count;
}
