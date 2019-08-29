// complexity: O(n) time, O(n) space
function findGap(numbers) {
  let i = 0;
  let tmp;

  while (i < numbers.length) {
    if (numbers[i] >= 1 && numbers[i] <= numbers.length) {
      // this number is already at the right place
      if (numbers[i] === i) {
        i++;
        continue;
      }

      // swap the numbers (but don't increase i because we probably swapped with
      // an element that doesn't belong at position i)
      if (numbers[numbers[i]] !== numbers[i]) {
        tmp = numbers[numbers[i]];
        numbers[numbers[i]] = numbers[i];
        numbers[i] = tmp;
        continue;
      }
    }

    // arriving here means that the element was one of the following:
    // A) too big
    // B) not positive
    // C) a duplicate
    numbers[i] = null;
    i++;
  }

  i = 1;

  // now we just loop through the numbers until we find the first gap
  while (i < numbers.length && numbers[i] !== null) {
    i++;
  }

  return i;
}

console.log(findGap([3, 4, -1, 1]) === 2);
console.log(findGap([1, 2, 0]) === 3);
console.log(findGap([1, 3, 3]) === 2);
console.log(findGap([145796]) === 1);
console.log(findGap([-1, -1000, 2]) === 1);
console.log(findGap([]) === 1);


// Feedback:
// * Correct (of course, as it's the suggested solution :D)
