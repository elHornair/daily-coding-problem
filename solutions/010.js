// complexity: O(1) (irrelevant)
function schedule(f, ms, ...args) {
  setTimeout(() => {
    f(...args);
  }, ms);
}

schedule((message) => console.log(message), 1000, 'first job');
schedule(() => console.log('second job'), 3000);
schedule((a, b, c) => console.log(`${a} ${b} ${c}`), 500, 'before', 'first', 'job');

// Feedback:
// * Correct, I guess? This is a lot easier in JS than in some other languages
//   because JS is async by default (imagine not having 'setTimeout', but just
//   a 'sleep' function - You'd implement some blocking code that checks a list
//   with the functions to call every couple of ms)
// * Extra credit for the possibility to pass arbitrary arguments :)
