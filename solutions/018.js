// complexity: O(n + k) -> Nope, actually it's O(n*k)
class Queue {
  constructor(k) {
    this.k = k;
    this.buffer = new Array(k);
    this.first = 0;
    this.last = 0;
  }

  enqueue(a) {
    this.buffer[this.last] = a;
    this.last = (this.last+1)%this.k;
  }

  dequeue() {
    let res = this.buffer[this.first];
    this.first = (this.first+1)%this.k;
    return res;
  }

  getElements() {
    return this.buffer;
  }
}

function findMaxValues(a, k) {
  let queue = new Queue(k);
  let res = [];

  if (k <= 0 || a.length < k) {
    throw Error('Invalid parameters');
  }

  for (let i = 0; i < k; i++) {
    queue.enqueue(a[i]);
  }

  for (let i = k-1; i < a.length; i++) {
    res.push(Math.max(...queue.getElements()));
    queue.dequeue();
    queue.enqueue(a[i+1]);
  }

  return res;
}


// expected cases
console.log(JSON.stringify(findMaxValues([2, 4, 6], 1)) === JSON.stringify([2, 4, 6]));
console.log(JSON.stringify(findMaxValues([2, 4, 6], 2)) === JSON.stringify([4, 6]));
console.log(JSON.stringify(findMaxValues([10, 5, 2, 7, 8, 7], 3)) === JSON.stringify([10, 7, 8, 8]));
console.log(JSON.stringify(findMaxValues([2, 4, 6], 3)) === JSON.stringify([6]));

// error cases
try {
  findMaxValues([2], 3);
} catch (e) {
  console.log(e.message === 'Invalid parameters');
}

try {
  findMaxValues([2, 4, 6], 0);
} catch (e) {
  console.log(e.message === 'Invalid parameters');
}


// Feedback:
// * Correct but inefficient. The runtime complexity is actually O(n*k), because
//   Math.max is not "free" (it takes k comparisions)
// * => Better solution: only keep possible max candidates in the buffer
//   (buffer is ordered). A new element will replace all elements in the buffer
//   that are smaller than itself. The elements need to get out of the buffer,
//   once their index in the original array is too far away from the current index
