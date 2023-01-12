function DuplicatedNumber(arr) {
// the values of the array is like a pointer
// pointing to indices of the array, witch is like the nodes in our case
// because each number is from 1 to n, then each value have to point a valid index
// and since there is a duplicate number, then there will be a cycle 

  let tortoise = arr[0];
  let hare = arr[0];

  while (true) { // we will break out of the loop when we find the cycle, there is a certainty that we will find it
    tortoise = arr[tortoise]; // move tortoise by 1 step
    hare = arr[arr[hare]]; // move hare by 2 steps

    if (hare === tortoise) break; // if they meet, then we found the cycle
  }

  hare = arr[0]; // reset hare to the beginning of the array

  while (hare !== tortoise) {   // move hare and tortoise by 1 step until they meet
    hare = arr[hare];   // move hare by 1 step
    tortoise = arr[tortoise];   // move tortoise by 1 step
  }

  return hare;

}

console.log(DuplicatedNumber([1, 2, 3, 4, 5, 1, 7, 8, 9, 2, 10]));