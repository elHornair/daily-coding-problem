// complexity: O(n) - This is the solution based on the official solution based on LISP S-expressions
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(node) {
  let values = [];

  values.push(node.val ? node.val : '#');
  values.push(node.left ? serialize(node.left) : '#');
  values.push(node.right ? serialize(node.right) : '#');

  return values.join('$');
}

function deserialize(serializedNodes) {
  let valuesIterator = serializedNodes.split('$').values();
  let buildTree = () => {
    let node = new Node();
    let val = valuesIterator.next();

    if (val.done || val.value === '#') {
      return null;
    }

    node.val = val.value;
    node.left = buildTree();
    node.right = buildTree();

    return node;
  }

  return buildTree();
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
