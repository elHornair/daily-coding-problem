// complexity: O(n*log(n)) because of the sorting -> the rest is O(n) where n is
//             the amount of lectures
function howManyRooms(lectures) {
  let starts = [];
  let ends = [];
  let i;
  let j;
  let currentOverlaps = 0;
  let maxOverlaps = 0;

  for (i = 0; i < lectures.length; i++) {
    starts.push(lectures[i][0]);
    ends.push(lectures[i][1]);
  }

  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);

  i = 0;
  j = 0;

  while (i < starts.length && j < ends.length) {
    if (starts[i] <= ends[j]) {
      currentOverlaps++;
      i++;
      maxOverlaps = Math.max(maxOverlaps, currentOverlaps);
    } else {
      currentOverlaps--;
      j++;
    }
  }

  return maxOverlaps;
}


console.log(howManyRooms([[30, 75], [0, 50], [60, 150]]) === 2);
console.log(howManyRooms([[10, 20], [11, 21], [12, 22]]) === 3);
console.log(howManyRooms([[10, 20]]) === 1);
console.log(howManyRooms([[10, 20], [30, 40]]) === 1);
console.log(howManyRooms([[10, 100], [10, 20], [30, 40], [55, 65], [50, 60]]) === 3);
console.log(howManyRooms([[10, 9]]) === 0);
console.log(howManyRooms([[10, 20], [20, 30]]) === 2);
console.log(howManyRooms([[10, 20], [21, 30]]) === 1);


// Feedback:
// * Correct (proposed solution)
