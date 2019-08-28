// complexity: O(n)
// Space is however not constant as asked in the interview question
// I could make it in constant space, by sorting in place and finding the first gap
// Sorting is however not possible to do quicker than O(n*log(n)) so I don't know :)
function findGap(numbers) {
  let hashMap = [];
  let j = 1;

  for (let i=0; i < numbers.length; i++) {
    if (numbers[i] >= 1) {
      hashMap[numbers[i]] = true;
    }
  }

  while (j < hashMap.length && hashMap[j]) {
    j++;
  }

  return j;
}

console.log(findGap([3, 4, -1, 1]) === 2);
console.log(findGap([1, 2, 0]) === 3);
console.log(findGap([1, 3, 3]) === 2);
console.log(findGap([145796]) === 1);
console.log(findGap([-1, -1000, 2]) === 1);
console.log(findGap([]) === 1);

// Feedback:
// * Good thinking, but as I said, the space is not constant. What I missed, was
//   that the number we search can't be bigger than numbers.length (because if
//   it were bigger, that would mean that there would be a gap in the array, which
//   would mean that the gap IS the number, which it can't be, because that
//   contradicts what we just said) -> Solution: Drop negative numbers (as I did)
//   but ALSO numbers that are bigger than numbers.length. Then use the numbers
//   array itself as the hashMap.
