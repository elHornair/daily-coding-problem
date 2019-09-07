// complexity: O(n^2)? -> I'm really not sure, because I think the recursion
//             the cache somehow cancel each other out, but how exactly? :)
function findWords(dict, str) {
  let deadEndIndizes = {};
  let findWordsHelper = (dict, str) => {
    let substringUnderTest;
    let partialRes;

    if (deadEndIndizes[str.length - 1]) {
      return null;
    }

    if (str.length === 0) {
      return [];
    }

    if (str.length === 1) {
      return dict[str] ? [str] : null;
    }

    for (let i = 0; i < str.length; i++) {
      substringUnderTest = str.substr(0, i+1);

      if (dict[substringUnderTest]) {
        partialRes = findWordsHelper(dict, str.substr(i+1));

        if (partialRes !== null) {
          return [substringUnderTest].concat(partialRes);
        } else {
          deadEndIndizes[str.substr(i+1).length - 1] = true;
        }
      }
    }

    return null;
  }

  return findWordsHelper(dict, str);
}


console.log(
  JSON.stringify(findWords(
    {'the': true, 'quick': true, 'brown': true, 'fox': true},
    'thequickbrownfox'
  )) ===
  JSON.stringify(['the', 'quick', 'brown', 'fox'])
);

console.log(
  JSON.stringify(findWords(
    {'the': true, 'quick': true, 'brown': true, 'fox': true},
    'thequickbrownfox2'
  )) ===
  JSON.stringify(null)
);

console.log(
  JSON.stringify(findWords(
    {'t': true, 'h': true, 'e': true, 'lala': true},
    'the'
  )) ===
  JSON.stringify(['t', 'h', 'e'])
);

console.log(
  JSON.stringify(findWords(
    {'t': true, 'h': true, 'e': true, 'lala': true},
    ''
  )) ===
  JSON.stringify([])
);

console.log(
  JSON.stringify(findWords(
    {'t': true, 'h': true, 'e': true, 'the': true, 'quick': true, 'brown': true, 'fox': true},
    'thequickbrownfox'
  )) ===
  JSON.stringify(['t', 'h', 'e', 'quick', 'brown', 'fox'])
);

console.log(
  JSON.stringify(findWords(
    {'bed': true, 'bath': true, 'bedbath': true, 'and': true, 'beyond': true},
    'bedbathandbeyond'
  )) ===
  JSON.stringify(['bed', 'bath', 'and', 'beyond'])
);

console.log(
  JSON.stringify(findWords(
    {'the': true, 'quick': true, 'brown': true, 'fox': true, 'th': true, 'equic': true, 'kbro': true, 'wnfo': true},
    'thequickbrownfox'
  )) ===
  JSON.stringify(['the', 'quick', 'brown', 'fox'])
);

console.log(
  JSON.stringify(findWords(
    {'the': true, 'quick': true, 'brown': true, 'fox': true, 't': true, 'h': true, 'th': true, 'equic': true, 'kbro': true, 'wnfo': true},
    'thequickbrownfox'
  )) ===
  JSON.stringify(['the', 'quick', 'brown', 'fox'])
);


// Feedback:
// * Correct. The solution is very similar to the one proposed to by
//   thedailycodingproblem, and the performance is the same (I think). I didn't
//   get rid of the recursion however so the proposed solution is certainly
//   easier to wrap your head around. TODO: implement without recursion!
