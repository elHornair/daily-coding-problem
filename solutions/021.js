// complexity: O(n*m) where n is the amount of intervals and m is the average length per interval
function howManyRooms(lectures) {
  let heatMap = [];

  for (let i = 0; i < lectures.length; i++) {
    for (let j = lectures[i][0]; j <= lectures[i][1]; j++) {
      heatMap[j] = (heatMap[j] === undefined ? 1 : heatMap[j]+1);
    }
  }

  let max = Math.max(...heatMap.filter(n => n !== undefined))
  return Math.max(0, max);
}

console.log(howManyRooms([[30, 75], [0, 50], [60, 150]]) === 2);
console.log(howManyRooms([[10, 20], [11, 21], [12, 22]]) === 3);
console.log(howManyRooms([[10, 20]]) === 1);
console.log(howManyRooms([[10, 20], [30, 40]]) === 1);
console.log(howManyRooms([[10, 100], [10, 20], [30, 40], [55, 65], [50, 60]]) === 3);
console.log(howManyRooms([[10, 9]]) === 0);

// Feedback:
// * Correct, but this can take a long time (and use a lot of space) if the
//   intervals are big. Better approach: sort start and end date in two lists
//   and loop through them to count the overlaps
