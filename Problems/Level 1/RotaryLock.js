/* 
You're trying to open a lock. The lock comes with a wheel which has the integers from 1 to N 
arranged in a circle in order around it (with integers 1 and N adjacent to one another). The wheel
is initially pointing at 1.
For example, the following depicts the lock for N = 10 (as is presented in the second sample 
case).

It takes 1 second to rotate the wheel by 1 unit to an adjacent integer in either direction, and it
takes no time to select an integer once the wheel is pointing at it.
The lock will open if you enter a certain code. The code consists of a sequence of M integers, the 
ith of which is C[i] 

Determine the minimum number of seconds required to select all M of the code's integers in order.
Please take care to write a solution which runs within the time limit.

Constraints
  - 3 <= N <= 50,000,000
  - 1 <= M <= 1,000
  - 1 <= C[i] <= N

Sample test case #1
  N = 3
  M = 3
  C = [1, 2, 3]
  Expected Return Value = 2

Sample test case #2
  N = 10
  M = 4
  C = [9, 4, 4, 8]
  Expected Return Value = 11

Sample Explanation
  In the first case, there are 3 integers on the lock, and the sequence of integers to be selected
  is [1, 2, 3]. One optimal way to enter the code is: select 1 → rotate to 2 (1 second) → select 2 → 
  rotate to 3 (1 second) → select 3. The total time taken is 1 + 1 = 2 seconds.

  In the second case, the lock consists of the integers 1 through 1010, and the sequence to be 
  selected is [9, 4, 4, 8]. One optimal way to enter the code is: rotate from 1 backwards to 9 (2 
  seconds) → select 9 → rotate forwards to 4 (55 seconds) → 
  select 4 twice → rotate forwards to 8 (4 seconds) → select 8. The total time taken is 2 + 5 + 4 = 
  11 seconds.
 */


/**
 * @param {number} N
 * @param {number} M
 * @param {number[]} C
 * @return {number}
 */
 function getMinCodeEntryTime(N, M, C) {
  // 1. Calcular a diferença entre a posição atual e o proximo numero do código
  // 2. Decidir se é melhor ir num sentido ou em outro
  //   - Se a diferença for inferior a N/2, o caminho mais curso será em direção 
  //     ao proximo número [o numero de movimentos é a propria diferença]
  //   - Se a diferença for superiror a N/2, o caminho mais curto será na direção
  //     oposta ao proximo número [o número de movimentos é o menor acrescido
  //     da diferença entre N e o maior dentre os dois]
  // 3. Somar o número de movimentos
  // 4. Repetir isso para todo o array do código
  if (M == 1) return 0;
  
  let spendTime = 0; // seconds
  
  for(let i = 0; i < M; i++) {
    const lastCodeNumber = i == 0 ? 1 : C[i-1];
    const currCodeNumber = C[i];
    
    let difference = Math.abs(currCodeNumber - lastCodeNumber);
    
    if (difference <= (N / 2)) {
      spendTime += difference;
    } else {
      const [ lower, greater ] = [lastCodeNumber, currCodeNumber].sort((a,b) => a-b);
      spendTime += lower;
      spendTime += N - greater;
    }
  }
  
  return spendTime;
}
