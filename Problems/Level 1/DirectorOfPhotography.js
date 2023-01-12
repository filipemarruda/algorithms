// 
/**
 * A photography set consists of N cells in a row, numbered from 1 to N in order, and can be 
 * represented by a string C of length N. Each cell i is one of the following types (indicated by 
 * C[i], the ith character of C):
 * If C[i] = “P”, it is allowed to contain a photographer
 * If C[i] = “A”, it is allowed to contain an actor
 * If C[i] = “B”, it is allowed to contain a backdrop
 * If C[i] = “.”, it must be left empty
 * 
 * A photograph consists of a photographer, an actor, and a backdrop, such that each of them is 
 * placed in a valid cell, and such that the actor is between the photographer and the backdrop. 
 * Such a photograph is considered artistic if the distance between the photographer and the actor 
 * is between X and Y cells (inclusive), and the distance between the actor and the backdrop is 
 * also between X and Y cells (inclusive). The distance between cells i and j is |i - j| 
 * (the absolute value of the difference between their indices).
 * 
 * Determine the number of different artistic photographs which could potentially be taken at the 
 * set. Two photographs are considered different if they involve a different photographer cell, 
 * actor cell, and/or backdrop cell.
 * 
 * Constraints
 * - 1 <= N <= 200
 * - 1 <= X <= Y <= N
 * 
 * Sample test case #1
 *  N = 5
 *  C = APABA
 *  X = 1
 *  Y = 2
 *  Expected Return Value = 1
 * 
 * Sample test case #2
 *  N = 5
 *  C = APABA
 *  X = 2
 *  Y = 3
 *  Expected Return Value = 0
 * 
 * Sample test case #3
 *  N = 8
 *  C = .PBAAP.B
 *  X = 1
 *  Y = 3
 *  Expected Return Value = 3
 * 
 * Sample Explanation
 * In the first case, the absolute distances between photographer/actor and actor/backdrop must be between 1 and 2. The only possible photograph that can be taken is with the 3 middle cells, and it happens to be artistic.
 * In the second case, the only possible photograph is again taken with the 3 middle cells. However, as the distance requirement is between 2 and 3, it is not possible to take an artistic photograph.
 * In the third case, there are 44 possible photographs, illustrated as follows:
 * .P.A...B
 * .P..A..B
 * ..BA.P..
 * ..B.AP..
 * All are artistic except the first, where the artist and backdrop exceed the maximum distance of 3.
 * 
 */

/**
 * @param {number} N
 * @param {string} C
 * @param {number} X
 * @param {number} Y
 * @return {number}
 */
 function getArtisticPhotographCount(N, C, X, Y) {
  /**
  .PBAAP.B
  
  {
    P: [1, 5]
    A: [3, 4]
    B: [2, 7]
  }
  
  132 = X
  137 => 2, 4 => X
  142 => X
  147 => 3, 3 => O
  532 => -2, -1 => O
  537 => X
  542 => -1, -2 => O
  547 => X
  
  */
  if (C.length < 3) return 0;
  
  const photographsTable = C.split('').reduce((prev, curr, i) => {
    if(!prev[curr]) prev[curr] = [];
    prev[curr].push(i);
    return prev;
  },{});
  
  if(Object.keys(photographsTable).length < 3) return 0;
  
  const photographs = [];
  
  for(let pIndex = 0; pIndex < photographsTable['P'].length; pIndex++) {
    for(let aIndex = 0; aIndex < photographsTable['A'].length; aIndex++) {
      for(let bIndex = 0; bIndex < photographsTable['B'].length; bIndex++) {
        photographs.push([
          photographsTable['P'][pIndex], 
          photographsTable['A'][aIndex],
          photographsTable['B'][bIndex]
        ]);
      }
    }
  }
  
  return photographs.reduce((prev, photograph) => {
    console.log(photograph);
    const [p, a, b] = photograph;
    
    const diffPA = Math.abs(p - a);
    const diffAB = Math.abs(a - b);
    
    if (((p < a && a < b) || (b < a && a < p)) &&
      (diffPA >= X && diffPA <= Y) && (diffAB >= X && diffAB <= Y)) return prev + 1;
    return prev;
  }, 0);
}
