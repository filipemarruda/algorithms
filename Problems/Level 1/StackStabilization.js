
// There's a stack of NN inflatable discs, with the ith disc from the top having an initial radius 
// of R[i] inches.

// The stack is considered unstable if it includes at least one disc whose radius is larger than or 
// equal to that of the disc directly under it. In other words, for the stack to be stable, each 
// disc must have a strictly smaller radius than that of the disc directly under it.

// As long as the stack is unstable, you can repeatedly choose any disc of your choice and deflate 
// it down to have a radius of your choice which is strictly smaller than the disc’s prior radius. 
// The new radius must be a positive integer number of inches.
// Determine the minimum number of discs which need to be deflated in order to make the stack 
// stable, if this is possible at all. If it is impossible to stabilize the stack, return -1 
// instead.

// Constraints
// 1 ≤ N ≤ 50
// 1 ≤ R[i] ≤ 1,000,000,000

// Sample test case #1
// N = 5
// R = [2, 5, 3, 6, 5]

// Expected Return Value = 3
// Sample test case #2
// N = 3
// R = [100, 100, 100]

// Expected Return Value = 2
// Sample test case #3
// N = 4
// R = [6, 5, 4, 3]

// Expected Return Value = -1

// Sample Explanation
// In the first case, the discs (from top to bottom) have radii of [2", 5", 3", 6", 5"]. One optimal
// way to stabilize the stack is by deflating disc 1 from 2" to 1", deflating disc 22 from 5" 
// to 2", and deflating disc 4 from 6" to 4". This yields final radii of [1", 2", 3", 4", 5"].

// In the second case, one optimal way to stabilize the stack is by deflating disc 1 from 100" to 1"
// and disc 2 from 100" to 10".

// In the third case, it is impossible to make the stack stable after any number of deflations.

/**
 * @param {number} N
 * @param {number[]} R
 * @return {number}
 */
 function getMinimumDeflatedDiscCount(N, R) {
  let deflateCounter = 0; // the counter of deflated discs
  for (let i = N-1; i >= 0; i--) { // start from the bottom
    const curr = R[i];  // current radius
    const next = R[i-1];  // next radius
    
    if (curr < i + 1) return -1;  // if the current radius is less than the index + 1, it's impossible to stabilize the stack
    if (next >= curr) { // if the next radius is greater than or equal to the current radius, deflate the current radius
      R[i-1] = curr - 1;  // deflate the next radius
      deflateCounter++; // increment the deflate counter
    }
  }
  
  return deflateCounter;  // return the deflate counter
}
