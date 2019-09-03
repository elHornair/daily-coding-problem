// complexity: O(n) (or actually O(n*m) if m is the amount of allowedSteps)
function countClimbingPossibilities(n, allowedSteps = [1, 2]) {
  let cache = [];

  cache[n] = 0;

  // prepare trivial steps
  for (let i = 0; i < allowedSteps.length; i++) {
    if (allowedSteps[i] <= 0) {
      throw new Error('steps must be positive!');
    }

    cache[n-allowedSteps[i]] = 1;
  }

  // calculate complex steps
  for (let i = n - 1; i >= 0; i--) {
    let currentSum = 0;

    for (let j = 0; j < allowedSteps.length; j++) {
      if (i+allowedSteps[j] <= n) {
        currentSum += cache[i+allowedSteps[j]];
      }
    }

    if (cache[i] === undefined) {
      cache[i]= 0;
    }

    cache[i] += currentSum;
  }

  return cache[0];
}

console.log(countClimbingPossibilities(3) === 3);
console.log(countClimbingPossibilities(4) === 5);
console.log(countClimbingPossibilities(3, [1, 2, 3]) === 4);
console.log(countClimbingPossibilities(4, [1, 2, 3]) === 7);
console.log(countClimbingPossibilities(4, [1, 2, 3, 4]) === 8);
console.log(countClimbingPossibilities(1, [1]) === 1);
console.log(countClimbingPossibilities(2, [1]) === 1);
console.log(countClimbingPossibilities(999, [1]) === 1);
console.log(countClimbingPossibilities(2, [2]) === 1);
console.log(countClimbingPossibilities(3, [2]) === 0);
console.log(countClimbingPossibilities(0, [1]) === 0);

try {
  console.log(countClimbingPossibilities(3, [-1]));
} catch (e) {
  console.log(e.message === 'steps must be positive!');
}

// Feedback:
// * Nothing to add :)
