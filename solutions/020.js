// complexity: O(m*n)
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }

  setNext(next) {
    this.next = next;
  }

  getNext() {
    return this.next;
  }

  getVal() {
    return this.val;
  }
}

function findOverlappingNode(listA, listB) {
  let dict = [];
  let list = listA;

  while (list !== null) {
    dict[list.getVal()] = true;
    list = list.getNext();
  }

  list = listB;

  while (list !== null) {
    if (dict[list.getVal()] === true) {
      return list;
    }

    list = list.getNext();
  }

  return null;
}

let startNode1 = new ListNode(0);
let currentNode = startNode1;

for (let i = 7; i <= 70; i=i+7) {
  let newNode = new ListNode(i);
  currentNode.setNext(newNode);
  currentNode = newNode;
}

let startNode2 = new ListNode(1);
currentNode = startNode2;

for (let i = 9; i <= 81; i=i+8) {
  let newNode = new ListNode(i);
  currentNode.setNext(newNode);
  currentNode = newNode;
}


console.log(findOverlappingNode(startNode1, startNode2).getVal() === 49);
console.log(findOverlappingNode(startNode1, new ListNode(7)).getVal() === 7);
console.log(findOverlappingNode(startNode1, new ListNode(2)) === null);
console.log(findOverlappingNode(startNode1, null) === null);
console.log(findOverlappingNode(null, null) === null);


// Feedback:
// * This is ok as a "naive" solution, but it doesn't take constant space
//   (which is a requirement!). Notice though, that the "same" node will have
//   the same next node (otherwise it wouldn't be the same node).
