// complexity: O(log(n)) for autocompleting; O(n*log(n)) for building the tree
class Autocompleter {
  constructor(words) {
    this.endMarker = 'end'
    this.wordTree = [];

    for (let i = 0; i < words.length; i++) {
      this.addWord(this.wordTree, words[i]);
    }
  }

  addWord(tree, word) {
    if (word.length <= 0) {
      return;
    }

    if (!tree[word[0]]) {
      tree[word[0]] = [];
    }

    if (word.length === 1) {
      tree[word[0]][this.endMarker] = true;
      return;
    }

    this.addWord(tree[word[0]], word.substring(1));
  }

  flatten(t, str) {
    let res = [];

    for (const [k, v] of Object.entries(t)) {
      if (k === this.endMarker) {
        res.push(str);
      } else {
        res = res.concat(this.flatten(v, str + k));
      }
    }

    return res;
  }

  complete(q) {
    let reducedTree = this.wordTree;

    for (let i = 0; i < q.length; i++) {
      if (reducedTree[q[i]]) {
        reducedTree = reducedTree[q[i]];
      } else {
        return [];
      }
    }

    return this.flatten(reducedTree, q);
  }
}

let ac = new Autocompleter(['dog', 'deer', 'deal', 'cow', 'crow', 'end', 'kend']);

console.log(ac.complete('d'));// expected output: ['dog', 'deer', 'deal']
console.log(ac.complete('de'));// expected output: ['deer', 'deal']
console.log(ac.complete('co'));// expected output: ['cow']
console.log(ac.complete('test'));// expected output: []
console.log(ac.complete(''));// expected output: ['dog', 'deer', 'deal', 'cow', 'crow', 'end', 'kend']
console.log(ac.complete('end'));// expected output: ['end']
console.log(ac.complete('kend'));// expected output: ['kend']
console.log(ac.complete('bend'));// expected output: []

// Feedback:
// * Correct. Note though, that the time complexity for searching will still be
//   O(n) if all the words are very similar (sharing a very long common prefix)
// * The structure used here is called a trie (a tree of string prefixes)
