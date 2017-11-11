# Problem Search

[![Build Status](https://travis-ci.org/marcbreitung/problem-search.svg?branch=master)](https://travis-ci.org/marcbreitung/problem-search)

## Problem

### Building graph manually
```javascript
var graphNodeA = new ProblemSearch.GraphNode('A', new ProblemSearch.Point(2, 2), new ProblemSearch.Point(20, 20));
var graphNodeB = new ProblemSearch.GraphNode('B', new ProblemSearch.Point(1, 1), new ProblemSearch.Point(10, 10));
var graphNodeC = new ProblemSearch.GraphNode('C', new ProblemSearch.Point(2, 1), new ProblemSearch.Point(20, 10));
var graphNodeD = new ProblemSearch.GraphNode('D', new ProblemSearch.Point(3, 1), new ProblemSearch.Point(30, 10));
var graphNodeE = new ProblemSearch.GraphNode('E', new ProblemSearch.Point(3, 2), new ProblemSearch.Point(30, 20));

graphNodeA.addChildNodes([graphNodeB, graphNodeD, graphNodeE]);
graphNodeB.addChildNodes([graphNodeA, graphNodeC]);
graphNodeC.addChildNodes([graphNodeB, graphNodeD]);
graphNodeD.addChildNodes([graphNodeA, graphNodeE, graphNodeC]);
graphNodeE.addChildNodes([graphNodeA, graphNodeD]);

var graph = new ProblemSearch.Graph();
graph.addNodes([graphNodeA, graphNodeB, graphNodeC, graphNodeD, graphNodeE]);
```

### Building graph with [problem-map-generator](https://github.com/marcbreitung/problem-map-generator)
```javascript
var map = new ProblemMapGenerator.Map({'cols': 10, 'rows': 10, 'width': 1000, 'height': 1000});
map.injectRandom(ProblemMapGenerator.Random);

var graphNodes = map.getNodes();

var graph = new ProblemSearch.Graph();
graph.addNodes(graphNodes);
```

```javascript
var initialState = new ProblemSearch.State('A');
var goal = new ProblemSearch.State('B');

var problem = new ProblemSearch.Problem(graph, initialState, goal);
```
## Search Strategies

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

### Depth Limited First Search
```javascript
var depthLimitedFirstSearch = new ProblemSearch.DepthLimitedFirstSearch();
var result = depthLimitedFirstSearch.search(problem);
result.solution();
```