// complexity: O(n)
function findLongestSubstring(s, k) {
  let letterMap = [];
  let currentStart = 0;
  let currentEnd = 0;
  let maxStart = 0;
  let maxEnd = 0;
  let distinctLetterCounter = 0;

  if (k === 0) {
    return '';
  }

  for (let i = 0; i < s.length; i++) {
    if (letterMap[s[i]] === undefined || letterMap[s[i]] === 0) {
      distinctLetterCounter++;
      letterMap[s[i]] = 0;

      if (distinctLetterCounter > k) {
        if ((maxEnd - maxStart) < (currentEnd - currentStart)) {
          maxStart = currentStart;
          maxEnd = currentEnd;
        }

        while (distinctLetterCounter > k) {
          letterMap[s[currentStart]]--;

          if (letterMap[s[currentStart]] === 0) {
            distinctLetterCounter--;
          }

          currentStart++;
        }
      }
    }

    letterMap[s[i]]++;
    currentEnd = i;
  }

  // in case the search string ends with the substring in search
  if ((maxEnd - maxStart) < (currentEnd - currentStart)) {
    maxStart = currentStart;
    maxEnd = currentEnd;
  }

  return s.substring(maxStart, maxEnd + 1);
}


console.log(findLongestSubstring('abcba', 2) === 'bcb');
console.log(findLongestSubstring('abcba', 3) === 'abcba');
console.log(findLongestSubstring('abcba', 4) === 'abcba');
console.log(findLongestSubstring('aabc', 2) === 'aab');
console.log(findLongestSubstring('abcc', 2) === 'bcc');
console.log(findLongestSubstring('abcc', 1) === 'cc');
console.log(findLongestSubstring('abaaaccc', 2) === 'aaaccc');
console.log(findLongestSubstring('', 2) === '');
console.log(findLongestSubstring('a', 2) === 'a');
console.log(findLongestSubstring('abcba', 0) === '');


// Feedback:
// * Good. Pretty much the solution proposed by thedailycodingproblem. However,
//   their hashmap doesn't count all the occurences of letter x, but instead
//   saves the index of the last occurrence of letter x. Like this, they can
//   jump to the minimum value in the hashmap once the substring gets too big.
//   This could possibly save time when dealing with very long strings.
