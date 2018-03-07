# Problem Search

[![Build Status](https://travis-ci.org/marcbreitung/problem-search.svg?branch=master)](https://travis-ci.org/marcbreitung/problem-search) [![Coverage Status](https://coveralls.io/repos/github/marcbreitung/problem-search/badge.svg?branch=master)](https://coveralls.io/github/marcbreitung/problem-search?branch=master)

## Problem graph

### Build graph manually
```javascript
var graphNodeA = new ProblemSearch.GraphNode('2-2', new ProblemSearch.Point(2, 2), new ProblemSearch.Point(20, 20));
var graphNodeB = new ProblemSearch.GraphNode('1-1', new ProblemSearch.Point(1, 1), new ProblemSearch.Point(10, 10));
var graphNodeC = new ProblemSearch.GraphNode('2-1', new ProblemSearch.Point(2, 1), new ProblemSearch.Point(20, 10));
var graphNodeD = new ProblemSearch.GraphNode('3-1', new ProblemSearch.Point(3, 1), new ProblemSearch.Point(30, 10));
var graphNodeE = new ProblemSearch.GraphNode('3-2', new ProblemSearch.Point(3, 2), new ProblemSearch.Point(30, 20));

graphNodeA.addChildNodes([graphNodeB, graphNodeD, graphNodeE]);
graphNodeB.addChildNodes([graphNodeA, graphNodeC]);
graphNodeC.addChildNodes([graphNodeB, graphNodeD]);
graphNodeD.addChildNodes([graphNodeA, graphNodeE, graphNodeC]);
graphNodeE.addChildNodes([graphNodeA, graphNodeD]);

var graph = new ProblemSearch.Graph();
graph.addNodes([graphNodeA, graphNodeB, graphNodeC, graphNodeD, graphNodeE]);
```

### Build graph with [problem-map-generator](https://github.com/marcbreitung/problem-map-generator)
```javascript
var map = new ProblemMapGenerator.Map({'cols': 10, 'rows': 10, 'width': 1000, 'height': 1000});
map.injectRandom(ProblemMapGenerator.Random);

var graphNodes = map.getNodes();

var graph = new ProblemSearch.Graph();
graph.addNodes(graphNodes);
```
## Problem

Build problem with graph, initial state and goal

```javascript
var graphNodeA = new ProblemSearch.GraphNode('2-2', new ProblemSearch.Point(2, 2), new ProblemSearch.Point(20, 20));
var graphNodeE = new ProblemSearch.GraphNode('3-2', new ProblemSearch.Point(3, 2), new ProblemSearch.Point(30, 20));

var initialState = new ProblemSearch.State(graphNodeA);
var goal = new ProblemSearch.State(graphNodeE);

var problem = new ProblemSearch.Problem(graph, initialState, goal);
```

## Search Strategies

### Solution

The method ``solution()`` returns the solution as ``ProblemSearch.Node`` list.

```javascript
result.solution();
```

The method ``solutionGraph()`` returns the solution as ``ProblemSearch.GraphNode`` list.

```javascript
result.solutionGraph();
```

#### Errors

You can add a try/catch to check for errors:

```javascript
try {
    var result = breadthFirstSearch.search(problem);
    result.solutionGraph();
} catch (error) {
    if (error.name === 'NoSolutionException') {
        console.log('No solution found');
    }
}
```

| Error | Description |
| --- | --- |
| `NoSolutionException` | No solution found |
| `LimitException` | Maximum depth limit reached (Depth Limited Search) |

### Breadth First Search
```javascript
var breadthFirstSearch = new ProblemSearch.BreadthFirstSearch();
var result = breadthFirstSearch.search(problem);
result.solution();
```
### Uniform Cost Search
```javascript
var uniformCostSearch = new ProblemSearch.UniformCostSearch();
var result = uniformCostSearch.search(problem);
result.solution();
```

### Depth First Search
```javascript
var depthFirstSearch = new ProblemSearch.DepthFirstSearch();
var result = depthFirstSearch.search(problem);
result.solution();
```

### Depth Limited Search
```javascript
var options = {'limit': 5};
var depthLimitedSearch = new ProblemSearch.DepthLimitedSearch(options);
var result = depthLimitedSearch.search(problem);
result.solution();
```

### Greedy Best First Search
```javascript
var greedyBestFirstSearch = new ProblemSearch.GreedyBestFirstSearch(options);
var result = greedyBestFirstSearch.search(problem);
result.solution();
```

## Search Strategy Factory
```javascript
var strategyFactory = new ProblemSearch.StrategyFactory();
strategyFactory.registerStrategy('breadthFirstSearch', ProblemSearch.BreadthFirstSearch);
strategyFactory.getStrategy('breadthFirstSearch');
```
Get strategies with options
```javascript
var strategyFactory = new ProblemSearch.StrategyFactory();
strategyFactory.registerStrategy('depthLimitedSearch', ProblemSearch.DepthLimitedSearch);
strategyFactory.getStrategy('depthLimitedSearch', options);
```