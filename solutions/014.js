// complexity: O(1) (irrelevant)
function roundToThreeDecimalPoints(a) {
  return Math.round(1000*a)/1000;
}

function estimatePI() {
  let sampleSize = 10000000;
  let r = 1;
  let x;
  let y;
  let circleHitCounter = 0;

  // monte carlo method for finding the relationship between the areas of the
  // circle and the square
  for (let i = 0; i < sampleSize; i++) {
    x = Math.random();
    y = Math.random();

    if (Math.sqrt(x*x + y*y) <= r) {
      circleHitCounter++;
    }
  }

  // cA (area of the circle) = r^2*PI
  // sA (area of the square) = 4r^2
  // => cA / sA = r^2*PI / 4r^2 = PI / 4 => PI = 4 * (cA / sA )
  return roundToThreeDecimalPoints(4*circleHitCounter/sampleSize);
}

let estimatedPI = estimatePI();
let realPI = roundToThreeDecimalPoints(Math.PI);

console.log('Estimated PI: ' + estimatedPI);
console.log('Real PI: ' + realPI);
console.log('Diff: ' + Math.abs(realPI - estimatedPI));

console.log(Math.abs(realPI - estimatedPI) < 0.001);

// Feedback:
// * Correct.
