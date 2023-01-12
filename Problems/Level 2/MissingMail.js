/**
 * You are the manager of a mail room which is frequently subject to theft. A period of NN days is 
 * about to occur, such that on the iith day, the following sequence of events will occur in order:
 * A package with a value of V[i] dollars will get delivered to the mail room (unless V[i] = 0, in 
 * which case no package will get delivered).
 * 
 * You can choose to pay C dollars to enter the mail room and collect all of the packages there 
 * (removing them from the room), and then leave the room
 * With probability S, all packages currently in the mail room will get stolen (and therefore 
 * removed from the room).
 * 
 * Note that you're aware of the delivery schedule V[1..N], but can only observe the state of the 
 * mail room when you choose to enter it, meaning that you won't immediately be aware of whether or 
 * not packages were stolen at the end of any given day.
 * 
 * Your profit after the NNth day will be equal to the total value of all packages which you 
 * collected up to that point, minus the total amount of money you spent on entering the mail room.
 * 
 * Please determine the maximum expected profit you can achieve (in dollars).
 * 
 * Note: Your return value must have an absolute or relative error of at most 10^−6 to be considered
 * correct.
 * 
 * Constraints
 * 1 ≤ N ≤ 4000
 * 0 ≤ V[i] ≤ 1000
 * 1 ≤ C ≤ 1000
 * 0.0 ≤ S ≤ 1.0
 * 
 * Sample test case #1
 * N = 5
 * V = [10, 2, 8, 6, 4]
 * C = 5
 * S = 0.0
 * Expected Return Value = 25.00000000
 * 
 * 
 * Sample test case #2
 * N = 5
 * V = [10, 2, 8, 6, 4]
 * C = 5
 * S = 1.0
 * Expected Return Value = 9.00000000
 * 
 * Sample test case #3
 * N = 5
 * V = [10, 2, 8, 6, 4]
 * C = 3
 * S = 0.5
 * Expected Return Value = 17.00000000
 * 
 * Sample test case #4
 * N = 5
 * V = [10, 2, 8, 6, 4]
 * C = 3
 * S = 0.15
 * Expected Return Value = 20.10825000
 * 
 * Sample Explanation
 * In the first case, packages will never be stolen. You should therefore enter the mail room just 
 * once, on the final day, at which point there are sure to be 5 packages there with a total value 
 * of 10 + 2 + 8 + 6 + 4 = 3010+2+8+6+4=30 dollars. Subtracting the 5-dollar fee for entering the 
 * mail room, your profit is guaranteed to be 30 - 5 = 2530−5=25 dollars.
 * 
 * In the second case, each package is sure to be stolen at the end of the day on which its 
 * delivered. You should enter the mail room on days 1, 3, and 4, each time collecting just the 
 * package delivered on that day. 
 * This yields a guaranteed profit of 10 + 8 + 6 - (3 * 5) = 910+8+6−(3∗5)=9 dollars.
 * 
 * In the third case, on each day, there's a 50% chance that all packages in the mail room will be
 * stolen. You should enter the mail room on days 1, 3, 4, and 5. Note that, when you enter on 
 * day 3, there will be a 50% chance of the room having 2 packages (with values of 2 and 8 dollars),
 * and a 50% chance of the room having just 1 package (worth 8 dollars).
 * 
 * In the fourth case, you should only enter the mail room on days 1 and 5.
*/

/**
 * @param {number} N
 * @param {number[]} V
 * @param {number} C
 * @param {number} S
 * @return {number}
 */
 function getMaxExpectedProfit(N, V, C, S) {
  
  // keep tracking of the best trajectory, each one is composed by a tuple (representing, the next and the current day's pickup profit)
  let bestTraj = [ [0, 0] ]
  
  V.forEach(currentPrice => {
    
    console.log(currentPrice, bestTraj);
    bestTraj.unshift([0, 0]); // inserts new trajectory at the begining of the bestTraj array
    
    bestTraj = bestTraj.map(([presentValue, futureValue]) => [presentValue * (1 - S), futureValue]); // updates the values based on the robbery's chance
    
    // P #1 : pickup
    // if the choice is to pickup, adds the optimum profit 
    // (we are trying to calculate the maximum possible value) to the actual price (from the package of the day) and subtracts 
    // the entrance cost
    const todaysMaxProfit = Math.max(...bestTraj.map(([presentValue, futureValue]) => presentValue + futureValue)) + currentPrice - C; 
    
    bestTraj[0] = [0, todaysMaxProfit] // updates the new trajectory with the calculated value for picking it up today
    
    // P #2 : don't pickup
    for(let i = 1; i < bestTraj.length; i++) { // in case of skipping, we need to update the prices from the second one to the end
      const [presentValue, futureValue] = bestTraj[i];
      bestTraj[i] = [presentValue + currentPrice, futureValue]  // just adds the price for the next day's total amount.
    }
    
    console.log(bestTraj);
    console.log("===========")
    
  });
  
  return Math.max(...bestTraj.map(([,f]) => f))
  
}
