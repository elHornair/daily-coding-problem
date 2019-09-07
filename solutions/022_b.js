// complexity: O(n^2)
function findWords(dict, str) {
  let starts = {0: ''};
  let resWords = [];
  let wordIndex = str.length;

  outerLoop:
  for (let i = 0; i <= str.length; i++) {
    let newStarts = {};

    for (const [key, val] of Object.entries(starts)) {
      let substringAtHand = str.substring(key, i);

      if (dict[substringAtHand]) {
        newStarts[i] = substringAtHand;
        Object.assign(starts, newStarts);

        // this is just a little extra optimisation (in case we have more than
        // one paths leading up to i, it doesn't matter which one we take, so while
        // just take the first one we discover and continue from here)
        continue outerLoop;
      }
    }
  }

  if (starts[str.length] === undefined) {
    return null;
  }

  while (wordIndex !== 0) {
    resWords.push(starts[wordIndex]);
    wordIndex -= starts[wordIndex].length;
  }

  return resWords.reverse();
}


console.log(
  JSON.stringify(findWords(
    {'the': true, 'quick': true, 'brown': true, 'fox': true},
    'thequickbrownfox'
  )) === JSON.stringify(['the', 'quick', 'brown', 'fox'])
);

console.log(
  JSON.stringify(findWords(
    {'the': true, 'quick': true, 'brown': true, 'fox': true},
    'thequickbrownfox2'
  )) === JSON.stringify(null)
);

console.log(
  JSON.stringify(findWords(
    {'t': true, 'h': true, 'e': true, 'lala': true},
    'the'
  )) === JSON.stringify(['t', 'h', 'e'])
);

console.log(
  JSON.stringify(findWords(
    {'t': true, 'h': true, 'e': true, 'lala': true},
    ''
  )) === JSON.stringify([])
);

console.log(
  JSON.stringify(findWords(
    {'t': true, 'h': true, 'e': true, 'the': true, 'quick': true, 'brown': true, 'fox': true},
    'thequickbrownfox'
  )) === JSON.stringify(['t', 'h', 'e', 'quick', 'brown', 'fox']) ||
  JSON.stringify(findWords(
    {'t': true, 'h': true, 'e': true, 'the': true, 'quick': true, 'brown': true, 'fox': true},
    'thequickbrownfox'
  )) === JSON.stringify(['the', 'quick', 'brown', 'fox'])
);

console.log(
  JSON.stringify(findWords(
    {'bed': true, 'bath': true, 'bedbath': true, 'and': true, 'beyond': true},
    'bedbathandbeyond'
  )) === JSON.stringify(['bed', 'bath', 'and', 'beyond']) ||
  JSON.stringify(findWords(
    {'bed': true, 'bath': true, 'bedbath': true, 'and': true, 'beyond': true},
    'bedbathandbeyond'
  )) === JSON.stringify(['bedbath', 'and', 'beyond'])
);

console.log(
  JSON.stringify(findWords(
    {'the': true, 'quick': true, 'brown': true, 'fox': true, 'th': true, 'equic': true, 'kbro': true, 'wnfo': true},
    'thequickbrownfox'
  )) === JSON.stringify(['the', 'quick', 'brown', 'fox'])
);

console.log(
  JSON.stringify(findWords(
    {'the': true, 'quick': true, 'brown': true, 'fox': true, 't': true, 'h': true, 'th': true, 'equic': true, 'kbro': true, 'wnfo': true},
    'thequickbrownfox'
  )) === JSON.stringify(['the', 'quick', 'brown', 'fox'])
);


// Feedback:
// * Correct. Proposed solution + a little hack to make it even faster (see comment)
