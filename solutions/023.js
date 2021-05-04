/**
 * Complexity:
 * - For every field we visit, there are 4 subPaths to explore
 * - There are m*n fields
 * => O(m*n*4) => O(n^2)
 */
function findShortestPath(map, start, end) {
	/**
	 * Idea: backtracking
	 * - Goal: find the shortest possible path with recursion
	 * - End of the recursion (abort):
	 *   - Dead end: field is a wall or off the map => null
	 *   - Loop: we're on a field we already visited => null
	 *   - Arrived at end => possible path
	 * - Recursion / Start: explore all 4 directions from where we currently are
	 * - Implemented improvement:
	 *   - Cache: if we end up at a coordinate that we already visited, there is no need to explore the subPaths again
	 *     -> Return result that was found last time instead
	 * - Further improvements:
	 *   - Abort if path gets longer than the best known solution so far
	 *   - Theoretically shortest possible path: |x1-x2| + |y1-y2| => if we found a path of that length, we can abort
	 *     because we won't find a better path
	 */

	const minX = 0;
	const minY = 0;
	const maxX = map.length-1;
	const maxY = map[0].length-1;
	const cache = {};

	function isWalkable(map, x, y) {
		return x >= minX && x <= maxX && y >= minY && y <= maxY && !map[x][y];
	}

	function isInHistory(pathHistory, x, y) {
		return pathHistory.findIndex((coords) => coords.x === x && coords.y === y) !== -1;
	}

	function isEnd(x, y, endX, endY) {
		return x === endX && y === endY;
	}

	function getCacheKey(x, y) {
		return JSON.stringify([x, y]);
	}

	function findShortestSubPath(map, startX, startY, endX, endY, pathHistory) {

		// console.log('---');
		// console.log(`Gonna check ${startX}, ${startY}`);

		// abort criteria
		if (cache[getCacheKey(startX, startY)] !== undefined) {
			// console.log('Aborting because subPath is in cache');
			return cache[getCacheKey(startX, startY)];
		}

		if (!isWalkable(map, startX, startY)) {
			// console.log('Aborting because its not walkable');
			return null;
		}

		if (isInHistory(pathHistory, startX, startY)) {
			// console.log('Aborting because its in history');
			return null;
		}

		if (isEnd(startX, startY, endX, endY)) {
			// console.log('Aborting because its the end');
			return [{x: startX, y: startY}];
		}

		// recursion
		const shortestSubPath = [
			// explore all 4 possible paths from here
			findShortestSubPath(map, startX + 1, startY, endX, endY, [...pathHistory, {x: startX, y: startY}]),
			findShortestSubPath(map, startX - 1, startY, endX, endY, [...pathHistory, {x: startX, y: startY}]),
			findShortestSubPath(map, startX, startY + 1, endX, endY, [...pathHistory, {x: startX, y: startY}]),
			findShortestSubPath(map, startX, startY - 1, endX, endY, [...pathHistory, {x: startX, y: startY}])
		].filter(path => {
			// filter out invalid paths
			return path !== null
		}).reduce((prev, curr) => {
			// find the shortest of the valid paths
			return (prev === null || prev.length > curr.length) ? curr : prev;
		}, null);

		cache[getCacheKey(startX, startY)] = shortestSubPath === null ? null : [{x: startX, y: startY}, ...shortestSubPath];

		return cache[getCacheKey(startX, startY)];
	}

	// initialisation / result
	const shortestPath = findShortestSubPath(map, start[0], start[1], end[0], end[1], []);

	return shortestPath === null ? null: shortestPath.length - 1;
}


// Tests
function checkIfCorrect (map, start, end, expectedResult) {
	console.log('- - -')
	console.log('Running test:')

	const res = findShortestPath(map, start, end);

	console.log(`Expected: ${expectedResult}`);
	console.log(`Received: ${res}`);

	console.log(`Result is ${res === expectedResult ? 'correct' : 'incorrect'}`);
}

checkIfCorrect(
	[
		[0, 1],
		[0, 0]
	],
	[1, 1],
	[0, 0],
	2
);

checkIfCorrect(
	[
		[0, 0, 0, 0],
		[1, 1, 0, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	],
	[3, 0],
	[0, 0],
	7
);

checkIfCorrect(
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	],
	[3, 0],
	[0, 0],
	null
);

checkIfCorrect(
	[
		[0, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0]
	],
	[0, 0],
	[2, 0],
	10
);


// Feedback:
// * This is DFS (depth first search) whereas the proposed solution used BFS (breadth first search), but it shouldn't
//   matter, because the complexity is the same
// * The proposed solution avoids recursion by using a collection of all paths that are to be explored and while-ing
//   over it
