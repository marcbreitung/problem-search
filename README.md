# Problem Search

## Problem
```javascript
    var graph = 'e.g ProblemMapGenerator.Map()';
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