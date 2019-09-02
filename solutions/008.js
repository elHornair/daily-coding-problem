// complexity: O(n) (where n is the amount of nodes in the tree)
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function countSubtrees(t) {
  let innerAnalyser = (t) => {
    if (t === null) {
      return {
        isUniversal: true,
        universalSubtreeCount: 0
      }
    }

    let leftInfo = innerAnalyser(t.left);
    let rightInfo = innerAnalyser(t.right);

    let amIUniversal = (
      leftInfo.isUniversal &&
      rightInfo.isUniversal &&
      (t.left === null || t.val === t.left.val) &&
      (t.right === null || t.val === t.right.val)
    );

    return {
      isUniversal: amIUniversal,
      universalSubtreeCount: leftInfo.universalSubtreeCount + rightInfo.universalSubtreeCount + (amIUniversal ? 1 : 0)
    }
  }

  return innerAnalyser(t).universalSubtreeCount;
}

let dummyTree = new Node (
  0,
  new Node(
    1
  ),
  new Node(
    0,
    new Node(
      1,
      new Node(
        1
      ),
      new Node(
        1
      ),
    ),
    new Node(
      0
    ),
  ),
);

console.log(countSubtrees(dummyTree) === 5);
console.log(countSubtrees(new Node(1)) === 1);
console.log(countSubtrees(new Node(1, new Node(1), new Node(1))) === 3);
console.log(countSubtrees(new Node(1, new Node(0), new Node(0))) === 2);
console.log(countSubtrees(new Node(1, new Node(0), null)) === 1);
console.log(countSubtrees(new Node(1, null, new Node(0))) === 1);

// Feedback:
// * Exactly as the proposed solution. Nothing to add.
