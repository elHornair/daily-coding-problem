// complexity: O(1) time; O(n) space.
class SuperLog {
  constructor(n) {
    this.n = n;
    this.logList = (new Array(this.n)).fill(null);
    this.latest = this.n - 1;
  }

  record(orderId) {
    this.latest = (this.latest+1)%(this.n);
    this.logList[this.latest] = orderId;
  }

  getLast(i = 1) {
    if (i > this.n || i <= 0) {
      throw Error('Invalid index!');
    }

    return this.logList[(this.latest + (this.n-i+1)) % this.n];
  }
}

let l = new SuperLog(3);

l.record(111);
l.record(222);
l.record(333);
l.record(444);

//error cases
try {
  l.getLast(0);
} catch (e) {
  console.log(e.message === 'Invalid index!');
}

try {
  l.getLast(4);
} catch (e) {
  console.log(e.message === 'Invalid index!');
}

// expected cases
console.log(l.getLast() === 444);
console.log(l.getLast(1) === 444);
console.log(l.getLast(2) === 333);
console.log(l.getLast(3) === 222);

// special cases (partially filled log)
let l2 = new SuperLog(100);
console.log(l2.getLast() === null);
console.log(l2.getLast(1) === null);
console.log(l2.getLast(2) === null);
l2.record(111);
console.log(l2.getLast() === 111);
console.log(l2.getLast(1) === 111);
console.log(l2.getLast(2) === null);


// Feedback:
// * Correct.
