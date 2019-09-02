// complexity:
//   * O(n) for splitIntoIndependentSequences
//   * O(2^n) for findMaxSumHelper
//   * total: O(2^n) => potentially much better if there are some numbers that
//     are < 1 (because they will split the sequence into smaller sequences)
function findMaxSum(a) {
  let splitIntoIndependentSequences = a => {
    let seqs = [];
    let currentSeq = [];

    for (let i = 0; i < a.length; i++) {
      if (a[i] > 0) {
        currentSeq.push(a[i]);
      } else {
        if (currentSeq.length > 0) {
          seqs.push(currentSeq);
        }

        currentSeq = [];
      }
    }

    if (currentSeq.length > 0) {
      seqs.push(currentSeq);
    }

    return seqs;
  }

  let findMaxSumHelper = a => {
    // this function assumes that none of the values in a are < 1

    if (a.length === 0) {
      return 0;
    }

    if (a.length === 1) {
      return a[0];
    }

    if (a.length === 2) {
      return Math.max(a[0], a[1]);
    }

    return Math.max(
      findMaxSumHelper(a.slice(1)),
      a[0] + findMaxSumHelper(a.slice(2))
    );
  }

  let seqs = splitIntoIndependentSequences(a);
  let sum = 0;

  for (let i = 0; i < seqs.length; i++) {
    sum += findMaxSumHelper(seqs[i]);
  }

  return sum;
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
// * Correct, but slow: runtime is indeed O(2^n)
// * The proposed solution by TheDailyCodingProblem doesn't do the splitting
//   into subsequences (presumably because it only helps in certain cases)
// * Better solution: use dynamic programming to avoid the recursive calls!
