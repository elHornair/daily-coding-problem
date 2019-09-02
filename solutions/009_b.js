// complexity: O(n) time; O(1) space
function findMaxSum(a) {
  // base cases
  if (a.length <= 2) {
    return Math.max(0, ...a)
  }

  // general case
  let back2 = Math.max(0, a[0]);
  let back1 = Math.max(back2, a[1]);
  let current = back1;

  for (let i = 2; i < a.length; i++) {
    current = Math.max(back1, a[i] + back2);
    back2 = back1;
    back1 = current;
  }

  return current;
}

console.log(findMaxSum([2, 4, 6, 2, 5]) === 13);
console.log(findMaxSum([2, 4, 6, 0, -1, 5, 8]) === 16);
console.log(findMaxSum([5, 1, 1, 5]) === 10);
console.log(findMaxSum([-5, -1, 0, -1]) === 0);
console.log(findMaxSum([]) === 0);
console.log(findMaxSum([2]) === 2);
console.log(findMaxSum([2, 1]) === 2);
console.log(findMaxSum([3, 1, 2]) === 5);

// Feedback:
// * Correct, as it's the proposed solution
// * The constant space complexity was achieved by tracking only the latest two
//   values of the cache array (as older values are newer used again). Otherwise
//   the space complexity would have been linear too.
