// complexity: O(n * k^2) for generating the graph and O((n * k)^2) for dijkstra => So, pretty bad performance
function generateGraph(data) {
  let graph = [];

  graph['x'] = [];
  graph['y'] = [];

  for (let i = 0; i <= data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (i === data.length) {
        graph[(i-1)+'.'+j]['y'] = 0;
        continue;
      }

      graph[(i)+'.'+j] = [];

      if (i === 0) {
        graph['x'][i+'.'+j] = data[i][j];
        continue;
      }

      for (let k = 0; k < data[i].length; k++) {
        if (j != k) {
          graph[(i-1)+'.'+k][i+'.'+j] = data[i][j];
        }
      }
    }
  }

  return graph;
}

function dijkstra(graph, startVertex, endVertex) {
  let unvisitedVertices = [];
  let distances = [];
  let currentVertex = startVertex;

  for (let key of Object.keys(graph)) {
    unvisitedVertices.push(key);
    distances[key] = {
      'path': startVertex,
      'dist': Infinity
    }
  }

  distances[currentVertex].dist = 0;

  while (unvisitedVertices.length > 0) {
    for (let [key, val] of Object.entries(graph[currentVertex])) {
      if (distances[currentVertex].dist + val < distances[key].dist) {
        distances[key].dist = distances[currentVertex].dist + val;
        distances[key].path = distances[currentVertex].path + ' -> ' + key;
      }
    }

    unvisitedVertices = unvisitedVertices.filter(vertex => vertex !== currentVertex);
    currentVertex = unvisitedVertices[0];
    unvisitedVertices.map(vertex => {
      if (distances[vertex].dist < distances[currentVertex].dist) {
        currentVertex = vertex;
      }
    });
  }

  return distances[endVertex];
}

function findMinimumCost(data) {
  let graph = generateGraph(data);
  let shortestPath = dijkstra(graph, 'x', 'y');

  return shortestPath;
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
// * Correct but horribly slow :) -> No need to turn this into a graph problem.
//   dailycodingproblem solves it with dynamic programming: the elements in the
//   i-th row says "this the cheapest cost" up to the i-th house (per color)
