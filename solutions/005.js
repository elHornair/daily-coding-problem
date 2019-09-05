// complexity: O(1) -> doesn't matter in this case
function cons(a, b) {
  // calling cons(a, b) will return a function that takes ANOTHER function as an
  // argument
  let pair = function(f) {
    return f(a, b)
  }

  return pair;
}

function car(pair) {
  return pair((a, b) => a);
}

function cdr(pair) {
  return pair((a, b) => b);
}

console.log(car(cons(3, 4)) === 3);
console.log(cdr(cons(3, 4)) === 4);

// Feedback:
// * Correct. The goal of this exercise was apparently to test if the candidate
//   got closures (which might be less natural to Python / Java / C++ devs)
