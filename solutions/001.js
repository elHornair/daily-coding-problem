// complexity: O(n)
function getTwoNumbersForSum(originalNumbers, k) {
  let visitedNumbers = [];

  for (let i = 0; i < originalNumbers.length; i++) {
    if (visitedNumbers[k-originalNumbers[i]] === true) {
      return [
        originalNumbers[i],
        (k-originalNumbers[i])
      ];
    }

    visitedNumbers[originalNumbers[i]] = true;
  }

  return [];
}

let numbers = [10, 15, 3, 7, 0, -2];

console.log(getTwoNumbersForSum(numbers, 17));// 7 and 10
console.log(getTwoNumbersForSum(numbers, 10));// 7 and 3
console.log(getTwoNumbersForSum(numbers, 2));// empty set
console.log(getTwoNumbersForSum(numbers, 3));// 3 and 0
console.log(getTwoNumbersForSum(numbers, 5));// -2 and 7

// Feedback:
// * Correct and efficient
// * But actually the exercise didn't ask for the two numbers, just if it's
//   actually possible to do it or not => Read carefully
