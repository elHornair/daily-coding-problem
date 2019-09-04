// complexity: O(n) time; O(1) space
class randomNumberGenerator {
 constructor() {
    this.counter = 0;
    this.currentRandomValue = undefined;
  }

  feed(a) {
    this.counter++;

    if (Math.random() <= 1/this.counter) {
      this.currentRandomValue = a;
    }
  }

  getRandom() {
    if (this.counter <= 0) {
      throw new Error('Feed me first!');
    }

    return this.currentRandomValue;
  }
}

let g = new randomNumberGenerator();

// error case
try {
  g.getRandom();
} catch (e) {
  console.log(e.message === 'Feed me first!');
}

// trivial case
g.feed(3);
console.log(g.getRandom() === 3);

// more complex case
let resultMap = [];
let streamLength = 10;
let sampleSize = 100000;

for (let i = 0; i < streamLength; i++) {
  resultMap[i] = 0;
}

for (let i = 0; i < sampleSize; i++) {
  let g = new randomNumberGenerator();

  for (let j = 0; j < streamLength; j++) {
    g.feed(j);
  }

  resultMap[g.getRandom()]++;
}

let lowerBound = 0.95 * sampleSize/streamLength;
let upperBound = 1.05 * sampleSize/streamLength;

for (let i = 0; i < streamLength; i++) {
  console.log(resultMap[i] > lowerBound && resultMap[i] < upperBound);
}

// Feedback:
// * Correct
