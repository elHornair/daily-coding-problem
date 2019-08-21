// complexity: O(n) for receiving, O(1) for inserting
class Node {
  constructor(val, addr) {
    this.val = val;
    this.addr = addr;
    this.both = null;
  }

  setBoth(both) {
    this.both = both;
  }

  getBoth() {
    return this.both;
  }
}

// this is just a helper, helping to fake pointers in JS
class NodeFactory {
    constructor() {
      this.dict = [];
    }

    getNewNode(val, addr) {
      const node = new Node(val, addr);

      this.dict[addr] = node;
      return node;
    }

    getPointer(node) {
      return node.addr;
    }

    dereferencePointer(addr) {
      return this.dict[addr];
    }
}

class LinkedList {
  constructor(nodeFactory) {
    this.nodeFactory = nodeFactory;
    this.first = null;
    this.last = null;
  }

  XOR(addr1, addr2) {
    let res = (parseInt(addr1, 2) ^ parseInt(addr2, 2)).toString(2);

    // padding the result
    while (res.length < addr1.length) {
      res = '0' + res;
    }

    return res;
  }

  add(node) {
    // ----- SPECIAL CASE: EMPTY LIST
    if (this.first === null) {
      node.both = this.XOR(
        this.nodeFactory.getPointer(node),
        this.nodeFactory.getPointer(node)
      );

      this.first = node;
      this.last = node;

      return;
    }

    // ----- GENERAL CASE
    // update first node
    this.first.both = this.XOR(
      this.nodeFactory.getPointer(node),
      this.XOR(// this part gives the pointer to the 2nd node
        this.first.both,
        this.nodeFactory.getPointer(this.last)
      )
    );

    // update last node
    this.last.both = this.XOR(
      this.nodeFactory.getPointer(node),
      this.XOR(// this part gives the pointer to the 2nd to last node
        this.last.both,
        this.nodeFactory.getPointer(this.first)
      )
    );

    // the added node is the new last node
    node.both = this.XOR(
      this.nodeFactory.getPointer(this.first),
      this.nodeFactory.getPointer(this.last)
    );
    this.last = node;
  }

  get(i) {// this gets the element at the i-th index
    let j = 0;
    let prev = this.last;
    let current = this.first;
    let next;

    if (i < 0) {
      return null;
    }

    while (j < i) {
      next = this.nodeFactory.dereferencePointer(
        this.XOR(
          current.both,
          this.nodeFactory.getPointer(prev)
        )
      );

      prev = current;
      current = next;
      next = null;
      j++;

      if (current === this.first) {
        // arriving here means we did a whole loop through the list already
        // that means that the list doesn't contain (i-1) elements
        return null;
      }
    }

    return current;
  }
}

// Basic idea:
// * (A XOR B) XOR A === B
// * This can be used to get the address of a node from the "both" field, if the
//   other of the two nodes is known. Starting from the beginning of the list,
//   this can be used to loop through the list

let nodeFactory = new NodeFactory();
let theList = new LinkedList(nodeFactory);

theList.add(nodeFactory.getNewNode('alain', '1100'));
theList.add(nodeFactory.getNewNode('hornair', '0011'));
theList.add(nodeFactory.getNewNode('yeah', '0101'));
theList.add(nodeFactory.getNewNode('yeeeha', '1010'));

console.log(theList.get(0).val === 'alain');
console.log(theList.get(1).val === 'hornair');
console.log(theList.get(2).val === 'yeah');
console.log(theList.get(3).val === 'yeeeha');
console.log(theList.get(4) === null);
console.log(theList.get(999) === null);
console.log(theList.get(-1) === null);

// Feedback:
// * All good. The original solution doesn't link the last and first node for
//   some reason I don't understand but apart from this, it's exactly the same :)
