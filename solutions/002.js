// complexity: O(n)
function getProductArray(ori) {
  let left = [];
  let right = [];
  let res = [];
  const maxIndex = ori.length-2;

  left[0] = ori[0];
  right[maxIndex] = ori[maxIndex+1];

  for (let i = 1; i <= maxIndex; i++) {
    left[i] = left[i-1] * ori[i];
    right[maxIndex-i] = right[maxIndex-i+1] * ori[maxIndex-i+1];
  }

  for (let i = 0; i < ori.length; i++) {
    res[i] = (i > 0 ? left[i-1] : 1) * (i < ori.length - 1 ? right[i] : 1);
  }

  return res;
}

console.log(getProductArray([3, 5, 6, 8]));// expected output: [240, 144, 120, 90]
console.log(getProductArray([3, 2, 1]));// expected output: [2, 3, 6]
console.log(getProductArray([1, 2, 3, 4, 5]));// expected output: [120, 60, 40, 30, 24]
console.log(getProductArray([1, 2, 0]));// expected output: [0, 0, 2]
console.log(getProductArray([1, 2, -1]));// expected output: [-2, -1, 2]

// Feedback:
// * Correct. The proposed solution even used 3 loops (they didn't
//   combine the creation of "left" and "right" into one loop)
