// complexity: O(n)
function findLongestFilePath(dirStr) {
  let distancesToRoot = [];
  let maxFilePathLength = 0;

  let calculateDistanceToRoot = (startI, level = undefined) => {
    let i = startI;
    let charCounter = 0;
    let tabCounter = 0;

    if (distancesToRoot[startI] !== undefined) {
      // we've been here before (cache hit)
      return distancesToRoot[startI];
    }

    while (dirStr[i] !== '\t' && i > 0) {
      i--;
      charCounter++;
    }

    if (i === 0) {
      // root folder
      distancesToRoot[startI] = charCounter+1;
      return distancesToRoot[startI];
    }

    while (dirStr[i] !== '\n') {
      i--;
      tabCounter++;
    }

    if (level === undefined || tabCounter === level) {
      // on our way to the root (either on file level or intermediate folder level)
      distancesToRoot[startI] = charCounter + calculateDistanceToRoot(i-1, tabCounter-1) + 1;// (1 is for the "/")
      return distancesToRoot[startI];
    }

    // parallel folder (skipping it)
    return calculateDistanceToRoot(i-1, level);
  }

  for (let i = dirStr.length - 1; i >= 0; i--) {
    if (dirStr[i] === '.') {
      let j = i;

      while (!(j + 1 >= dirStr.length || dirStr[j+1] === '\n')) {
        j++;
      }

      maxFilePathLength = Math.max(maxFilePathLength, calculateDistanceToRoot(j));
    }
  }

  return maxFilePathLength;
}


console.log(findLongestFilePath('') === 0);
console.log(findLongestFilePath('path\n\twith\n\t\tno\n\t\t\tfile') === 0);
console.log(findLongestFilePath('file.ext') === 8);
console.log(findLongestFilePath('dir\n\tfile.ext') === 12);
console.log(findLongestFilePath('dir\n\tfile.ext\n\tlongfile.ext') === 16);
console.log(findLongestFilePath('dir\n\tsubdir1\n\t\tfile1.ext') === 21);
console.log(findLongestFilePath('dir\n\tsubdir1\n\t\tlongfile1.ext\n\tsubdir2\n\t\tfile1.ext') === 25);
console.log(findLongestFilePath('dir\n\tsubdir1\n\t\tlongfile1.ext\n\t\tlongerfile1.ext\n\tsubdir2\n\t\tfile1.ext') === 27);
console.log(findLongestFilePath('dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext') === 32);
console.log(findLongestFilePath('dir\n\tfile1111.ext\n\tfile111.ext\n\tfile11.ext\n\tfile1.ext') === 16);


// Feedback:
// * Correct, but different than the solution proposed dailycodingproblem.
// * Their solution builds a tree first, then creates flat path strings by
//   recursively going through the tree. At the end, it picks the longest path
//   with a file (.) in it
// * I thought of that first, but then opted for the dynamic programming solution
//   because it uses a bit less space and doesn't needlessly build the tree.
//   However the performance is probably the same, while my solution is harder
//   to read / understand.
// * Learning: keep it simple & explain what you're thinking (and what you're
//   consciously not going to implement and why)
