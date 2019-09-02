// complexity: O(n)
function countPossibleDecodings(str) {
  let cache = [];
  cache[str.length] = 1;// the empty string is a valid encoding (1 possibility)

  for (let i = str.length-1; i >= 0; i--) {
    cache[i] = 0;

    if (str[i] === '0') {
      continue;
    }

    if (i === str.length-1) {
      cache[i] = 1;
      continue;
    }

    if (parseInt(str.substring(i, i+2), 10) <= 26) {
      cache[i] += cache[i+2];
    }

    cache[i] += cache[i+1];
  }

  return cache[0];
}

console.log(countPossibleDecodings('001') === 0);
console.log(countPossibleDecodings('601') === 0);
console.log(countPossibleDecodings('101') === 1);
console.log(countPossibleDecodings('666') === 1);
console.log(countPossibleDecodings('111') === 3);
console.log(countPossibleDecodings('8684735867392') === 1);
console.log(countPossibleDecodings('26') === 2);
console.log(countPossibleDecodings('27') === 1);
console.log(countPossibleDecodings('') === 1);
console.log(countPossibleDecodings('1') === 1);
console.log(countPossibleDecodings('11126') === 8);

// Feedback:
// * Correct (it's the proposed solution)
