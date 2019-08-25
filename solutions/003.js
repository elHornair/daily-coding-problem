// complexity: O(n) - I think? (n being the amount of nodes to serialize / deserialize)
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(node) {
  let serializedNode = '{';

  if (node.val) {
    serializedNode += `v"${node.val}"`;
  }

  if (node.left) {
      serializedNode += `l${serialize(node.left)}`;
  }

  if (node.right) {
      serializedNode += `r${serialize(node.right)}`;
  }

  return serializedNode + '}';
}

function deserialize(serializedNode) {
  let nodeInst = new Node();
  let parenthesisCounter;
  let i = 0;
  let j = 0;

  if (serializedNode[0] !== '{' || serializedNode[serializedNode.length - 1] !== '}') {
      throw new Error('malformed serialization!');
  }

  serializedNode = serializedNode.substring(1, serializedNode.length - 1);

  // deal with value
  if (serializedNode[i] === 'v') {
    if (serializedNode[i+1] !== '"') {
      throw new Error('malformed serialization!');
    }

    i += 2;
    j = i;

    while (serializedNode[i++] !== '"') {}

    nodeInst.val = serializedNode.substring(j, i-1);
  }

  // deal with child nodes
  if (serializedNode[i] === 'l' || serializedNode[i] === 'r') {
    if (serializedNode[i+1] !== '{') {
      throw new Error('malformed serialization!');
    }

    parenthesisCounter = 1;
    j = i + 2;

    while (parenthesisCounter > 0) {
      if (serializedNode[j] === "{") {
        parenthesisCounter++;
      } else if (serializedNode[j] === "}") {
        parenthesisCounter--;
      }

      j++;
    }

    if (serializedNode[i] === 'l') {
      nodeInst.left = deserialize(serializedNode.substring(i+1, j));
    } else if (serializedNode[i] === 'r') {
      nodeInst.right = deserialize(serializedNode.substring(i+1, j));
    }

    if (serializedNode[j] === 'l') {
      nodeInst.left = deserialize(serializedNode.substring(j+1));
    } else if (serializedNode[j] === 'r') {
      nodeInst.right = deserialize(serializedNode.substring(j+1));
    }
  }

  return nodeInst;
}

let tree = new Node(
  'root',
  new Node(
    'left',
    new Node('left.left'),
    new Node('left.right')
  ),
  new Node(
    'right',
    new Node('right.left'),
    new Node('right.right')
  )
);

console.log(tree);
console.log(serialize(tree));
console.log(deserialize(serialize(tree)));
console.log(deserialize(serialize(tree)).left.left.val === 'left.left');

// Feedback:
// * While it was a working solution, it could be simplified a lot (see implementation B)
