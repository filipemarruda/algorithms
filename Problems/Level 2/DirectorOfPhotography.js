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
 * - 1 <= N <= 300,000
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
  
  const firstAfterNoActorCandidate = 2 * X;
  
  if (N < firstAfterNoActorCandidate + 1) return 0;
  
  let countArtisticPhotograph = 0;
  
  const summaryBefore = { P: 0, B: 0 , A: 0, '.': 0}
  const summaryAfter = { P: 0, B: 0 , A: 0, '.': 0}
  
  const artisticDistance = Y - X;
  
  for (let i = firstAfterNoActorCandidate; i < N && i < firstAfterNoActorCandidate + artisticDistance; i++) {
    summaryAfter[C[i]]++;
  }
  
  for (let i = X; i < N - X; i++) {
    summaryBefore[C[i - X]]++;
    
    if (i - Y > 0) 
      summaryBefore[C[i - Y - 1]]--;
    
    if (i + Y < N)
      summaryAfter[C[i + Y]]++;
    
    if (i != X)
      summaryAfter[C[i + X - 1]]--;
    
    if (C[i] === 'A')
      countArtisticPhotograph += summaryBefore.P * summaryAfter.B + summaryBefore.B * summaryAfter.P; 
  }
  
  return countArtisticPhotograph;
  
}
