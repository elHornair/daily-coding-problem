// complexity: O(n * k) time, O(1) space
function findMinimumCost(data) {
  let minVal = 0;
  let minVal2 = 0;
  let minValIndex = undefined;
  let path = 'x'

  for (let i = 0; i < data.length; i++) {
    let newMinVal = Infinity;
    let newMinVal2 = Infinity;
    let newMinValIndex = undefined;
    let currentVal;

    for (let j = 0; j < data[0].length; j++) {
      currentVal = data[i][j] + (minValIndex !== j ? minVal : minVal2);

      if (currentVal < newMinVal) {
        newMinVal2 = newMinVal;
        newMinVal = currentVal;
        newMinValIndex = j;
      } else if (currentVal < newMinVal2) {
        newMinVal2 = currentVal;
      }
    }

    minVal = newMinVal;
    minVal2 = newMinVal2;
    minValIndex = newMinValIndex;
    path += ` -> ${i}.${minValIndex}`;
  }

  return {
    'dist': minVal,
    'path': path + ' -> y'
  };
}

// rows: house nr. n
// cols: house of color k
// value: price for building the n-th house with color k
let data1 = [
  [1, 2, 3, 4],// 1st house (0.0 - 0.3)
  [2, 3, 4, 1],// 2nd house (1.0 - 1.3)
  [9, 3, 4, 1],// 3rd house (2.0 - 2.3)
  [8, 1, 2, 1] // 4th house (3.0 - 3.3)
];

let minimumCost1 = findMinimumCost(data1);
console.log(minimumCost1.dist === 6);
console.log(minimumCost1.path);

let data2 = [
  [1, 9, 9, 9],
  [9, 9, 9, 1],
  [1, 9, 9, 9],
  [9, 9, 9, 1],
  [1, 9, 9, 9],
  [9, 9, 9, 1],
  [1, 9, 9, 9],
  [9, 9, 9, 1],
  [1, 9, 9, 9],
  [9, 9, 9, 1]
];

let minimumCost2 = findMinimumCost(data2);
console.log(minimumCost2.dist === 10);
console.log(minimumCost2.path);

// Feedback:
// * Correct (it's the solution proposed by dailycodingproblem)
