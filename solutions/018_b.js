// complexity: O(n)
class Queue {
  constructor(k) {
    this.k = k;
    this.buffer = new Array(k);
    this.first = 0;
    this.last = 0;
    this.counter = 0;
  }

  append(a) {
    if (this.counter >= this.k) {
      throw Error('Buffer overflow!');
    }

    this.buffer[this.last] = a;
    this.counter++;
    this.last = (this.last + 1) % this.k;
  }

  appendLeft(a) {
      if (this.counter >= this.k) {
        throw Error('Buffer overflow!');
      }

      this.first = (this.first - 1 + this.k) % this.k
      this.counter++;
      this.buffer[this.first] = a;
  }

  pop() {
    if (this.isEmpty()) {
      throw Error('No elements in Queue!');
    }

    this.last = (this.last - 1 + this.k) % this.k;
    this.counter--;
    return this.buffer[this.last];
  }

  popLeft() {
    if (this.isEmpty()) {
      throw Error('No elements in Queue!');
    }

    let res = this.buffer[this.first];
    this.first = (this.first + 1) % this.k;
    this.counter--;
    return res;
  }

  peek() {
    return this.buffer[(this.last - 1 + this.k) % this.k];
  }

  empty() {
    this.first = 0;
    this.last = 0;
    this.counter = 0;
  }

  isEmpty() {
    return this.counter === 0;
  }
}

function findMaxValues(a, k) {
  let queue = new Queue(k);
  let res = [];
  let addIndexToQueue = (q, a, i) => {
      if (q.isEmpty() || a[i] > a[q.peek()]) {
        q.empty();
        q.append(i);
      } else {
        let smallestI = q.popLeft();

        while (a[i] >= a[smallestI]) {
          smallestI = q.popLeft();
        };

        q.appendLeft(smallestI);
        q.appendLeft(i);
      }

      return q;
  }

  if (k <= 0 || a.length < k) {
    throw Error('Invalid parameters');
  }

  for (let i = 0; i < k-1; i++) {
    addIndexToQueue(queue, a, i);
  }

  for (let i = k-1; i < a.length; i++) {
    addIndexToQueue(queue, a, i);
    res.push(a[queue.peek()]);

    if (queue.peek() <= i-k+1) {
      queue.pop();
    }
  }

  return res;
}


// expected cases
console.log(JSON.stringify(findMaxValues([2, 4, 6], 1)) === JSON.stringify([2, 4, 6]));
console.log(JSON.stringify(findMaxValues([2, 4, 6], 2)) === JSON.stringify([4, 6]));
console.log(JSON.stringify(findMaxValues([2, 4, 6], 3)) === JSON.stringify([6]));
console.log(JSON.stringify(findMaxValues([6, 4, 2], 3)) === JSON.stringify([6]));
console.log(JSON.stringify(findMaxValues([10, 5, 2, 7, 8, 7], 3)) === JSON.stringify([10, 7, 8, 8]));
console.log(JSON.stringify(findMaxValues([2, 4, 6], 3)) === JSON.stringify([6]));
console.log(JSON.stringify(findMaxValues([2, 8, 2, 5, 16, 2, 1, 0, 4, 0, 2, 0, 1, 17], 3)) === JSON.stringify([8, 8, 16, 16, 16, 2, 4, 4, 4, 2, 2, 17]));


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
// * Correct (solution proposed by dailycodingproblem)
