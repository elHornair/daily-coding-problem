// complexity: O(n*log(n))
function countPossibleDecodings(str) {
  if (str.length <= 1) {
    return 1;
  }

  if (parseInt(str[0], 10) === 1 || (parseInt(str[0], 10) === 2) && parseInt(str[1], 10) <= 6) {
    return countPossibleDecodings(str.substring(1)) + countPossibleDecodings(str.substring(2));
  }

  return countPossibleDecodings(str.substring(1));
}

console.log(countPossibleDecodings('666') === 1);
console.log(countPossibleDecodings('111') === 3);
console.log(countPossibleDecodings('8684735867392') === 1);
console.log(countPossibleDecodings('26') === 2);
console.log(countPossibleDecodings('27') === 1);
console.log(countPossibleDecodings('') === 1);
console.log(countPossibleDecodings('1') === 1);
console.log(countPossibleDecodings('11126') === 8);

// Feedback:
// * Basically correct
// * Fooled by invalid encodings (e.g. starting with '0' or something impossible
//   like "601")
// * Runtime is pretty bad => O(n^2), not O(n*log(n))
// * Suggested improvement: start from the end and build up a cache with the
//   results so far, so you can always look up the result for (i+1) and (i+2)
