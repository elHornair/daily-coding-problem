// complexity: O(m*n) time and O(1) space
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
  let list = listA;
  let tmpList = null;
  let lengthA = 0;
  let lengthB = 0;

  while (list !== null) {
    list = list.getNext();
    lengthA++;
  }

  list = listB;

  while (list !== null) {
    list = list.getNext();
    lengthB++;
  }

  if (lengthA < lengthB) {
    tmpList = listB;
    listB = listA;
    listA = tmpList;
  }

  for (let i = 0; i < Math.abs(lengthA - lengthB); i++) {
    listA = listA.getNext();
  }

  while (listA !== null && listB !== null) {
    if (listA.getVal() === listB.getVal()) {
      return listA;
    }

    listA = listA.getNext();
    listB = listB.getNext();
  }

  return null;
}


// tests
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

currentNode.setNext(startNode1);


console.log(findOverlappingNode(startNode1, startNode2).getVal() === 0);
console.log(findOverlappingNode(startNode2, startNode1).getVal() === 0);
console.log(findOverlappingNode(startNode1, new ListNode(70)).getVal() === 70);
console.log(findOverlappingNode(startNode1, new ListNode(2)) === null);
console.log(findOverlappingNode(startNode1, null) === null);
console.log(findOverlappingNode(null, null) === null);


// Feedback:
// * Correct (proposed solution by dailycodingproblem)
