/***
There are N dishes in a row on a kaiten belt, with the iith dish being of type D[i]. Some dishes may be of the same type as one another.
You're very hungry, but you'd also like to keep things interesting. The N dishes will arrive in 
front of you, one after another in order, and for each one you'll eat it as long as it isn't the 
same type as any of the previous K dishes you've eaten. You eat very fast, so you can consume a dish
before the next one gets to you. Any dishes you choose not to eat as they pass will be eaten by 
others.

Determine how many dishes you'll end up eating.
Please take care to write a solution which runs within the time limit.

Constraints
1 <= N <= 500000
1 <= K <= N
1 <= D[i] <= 1000000

Sample test case #1
N = 6
D = [1, 2, 3, 3, 2, 1]
K = 1
Expected Return Value = 5

Sample test case #2
N = 6
D = [1, 2, 3, 3, 2, 1]
K = 2
Expected Return Value = 4

Sample test case #3
N = 7
D = [1, 2, 1, 2, 1, 2, 1]
K = 2
Expected Return Value = 2

Sample Explanation
In the first case, the dishes have types of [1, 2, 3, 3, 2, 1][1,2,3,3,2,1], so you'll eat the first
33 dishes, skip the next one as it's another type-33 dish, and then eat the last 22.

In the second case, you won't eat a dish if it has the same type as either of the previous 22 dishes
you've eaten. After eating the first, second, and third dishes, you'll skip the fourth and fifth 
dishes as they're the same type as the last 22 dishes that you've eaten. You'll then eat the last 
dish, consuming 44 dishes total.

In the third case, once you eat the first two dishes you won't eat any of the remaining dishes.

*/

import java.util.*;

class Solution {
  
  public int getMaximumEatenDishCount(int N, int[] D, int K) {
    Map<Integer, Boolean> lastEatenMap = new HashMap<>();
    Queue<Integer> lasEatenQueue = new LinkedList<>();
    
    int eatenDishes = 0;
  
    for (int i = 0; i < D.length; i++) {
      int currDish = D[i];

      if(lastEatenMap.containsKey(currDish)) continue;

      lastEatenMap.put(currDish, true);
      lasEatenQueue.add(currDish);

      if(lasEatenQueue.size() > K){
        lastEatenMap.remove(lasEatenQueue.remove());
      }

      eatenDishes++;
    }
  return eatenDishes;
  }
  
}

// /**
//  * @param {number} N
//  * @param {number[]} D
//  * @param {number} K
//  * @return {number}
//  */
// function getMaximumEatenDishCount(N, D, K) {
//   const lastEatenDishes = {
//     map: {},
//     queue: []
//   };
  
//   let eatenDishes = 0;
  
//   for (let i = 0; i < D.length; i++) {
//     const currDish = D[i];
    
//     if(lastEatenDishes.map[currDish]) continue;
    
//     lastEatenDishes.map[currDish] = true;
//     lastEatenDishes.queue.push(currDish);
    
//     if(lastEatenDishes.queue.length > K)
//       delete lastEatenDishes.map[lastEatenDishes.queue.shift()];
    
//     eatenDishes++;
//   }
  
//   return eatenDishes;
// }
