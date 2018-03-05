let assert = require('chai').assert;

import {UniformCostSearch} from './../../../../lib/Search/Strategy/UniformCostSearch';

import {Node} from './../../../../lib/Search/Node';
import {State} from './../../../../lib/Search/State';
import {Action} from './../../../../lib/Search/Action';
import {Problem} from "../../../../lib/Search/Problem";
import {NoSolutionException} from "../../../../lib/Exceptions/NoSolutionException";

import {TestGraph} from "./../../../fixtures/TestGraph";
import {TestGraphNodes} from "./../../../fixtures/TestGraph";

suite('UniformCostSearch', function () {

    let graph;

    beforeEach(function () {
        graph = TestGraph;
    });

    suite('#sortFrontier()', function () {
        test('should return frontier array sorted by path cost', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);

            let nodeA = new Node(initialState);
            nodeA.pathCost = 8;

            let nodeB = new Node(initialState);
            nodeB.pathCost = 65;

            let nodeC = new Node(initialState);
            nodeC.pathCost = 3;

            let nodeD = new Node(initialState);
            nodeD.pathCost = 42;

            let uniformCostSearch = new UniformCostSearch();

            uniformCostSearch.frontier = [nodeA, nodeB, nodeC, nodeD];
            assert.sameDeepOrderedMembers(uniformCostSearch.frontier, [nodeA, nodeB, nodeC, nodeD]);

            uniformCostSearch.sortFrontier();
            assert.sameDeepOrderedMembers(uniformCostSearch.frontier, [nodeC, nodeA, nodeD, nodeB]);
        });
    });

    suite('#getCurrentNode()', function () {
        test('should return frontier with lowest path cost', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);

            let nodeA = new Node(initialState);
            nodeA.pathCost = 8;

            let nodeB = new Node(initialState);
            nodeB.pathCost = 65;

            let nodeC = new Node(initialState);
            nodeC.pathCost = 3;

            let nodeD = new Node(initialState);
            nodeD.pathCost = 42;

            let uniformCostSearch = new UniformCostSearch();

            uniformCostSearch.frontier = [nodeA, nodeB, nodeC, nodeD];

            assert.deepEqual(uniformCostSearch.getCurrentNode(), nodeC);
        });
    });

    suite('#updateNodeWithHigherPathCost(node)', function () {
        test('should replace node with lower path cost', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);

            let nodeA = new Node(initialState);
            nodeA.pathCost = 8;
            nodeA.state = new State(TestGraphNodes.graphNodeA);

            let nodeB = new Node(initialState);
            nodeB.pathCost = 65;
            nodeB.state = new State(TestGraphNodes.graphNodeB);

            let nodeC = new Node(initialState);
            nodeC.pathCost = 3;
            nodeC.state = new State(TestGraphNodes.graphNodeC);

            let nodeD = new Node(initialState);
            nodeD.pathCost = 42;
            nodeD.state = new State(TestGraphNodes.graphNodeD);

            let uniformCostSearch = new UniformCostSearch();

            uniformCostSearch.frontier = [nodeA, nodeB, nodeC, nodeD];

            assert.sameDeepOrderedMembers(uniformCostSearch.frontier, [nodeA, nodeB, nodeC, nodeD]);

            let nodeDReplace = new Node(initialState);
            nodeDReplace.pathCost = 1;
            nodeDReplace.state = new State(TestGraphNodes.graphNodeD);

            uniformCostSearch.updateNodeWithHigherPathCost(nodeDReplace);

            assert.sameDeepOrderedMembers(uniformCostSearch.frontier, [nodeDReplace, nodeC, nodeA, nodeB]);
        });
    });

    suite('#extend(problem, node)', function () {
        test('should add extended nodes to frontier', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);
            let goal = new State(TestGraphNodes.graphNodeC);
            let problem = new Problem(graph, initialState, goal);

            let uniformCostSearch = new UniformCostSearch();

            uniformCostSearch.extend(problem, new Node(new State(TestGraphNodes.graphNodeA)));

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeD = Node.make(problem, nodeA, new Action('D'));
            let nodeE = Node.make(problem, nodeA, new Action('E'));

            assert.sameDeepOrderedMembers(uniformCostSearch.frontier, [nodeB, nodeD, nodeE]);
        });
    });

    suite('#search(problem)', function () {
        test('should direct return path from initialStet to goal if initial state is goal', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);
            let goal = new State(TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);

            let uniformCostSearch = new UniformCostSearch();

            let nodeA = new Node(initialState);

            assert.sameDeepMembers(uniformCostSearch.search(problem).solution(), [nodeA]);
        });
        test('should return path from initial state to goal', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);
            let goal = new State(TestGraphNodes.graphNodeD);
            let problem = new Problem(graph, initialState, goal);

            let uniformCostSearch = new UniformCostSearch();

            let nodeA = new Node(initialState);
            let nodeC = Node.make(problem, nodeA, new Action('D'));

            assert.sameDeepMembers(uniformCostSearch.search(problem).solution(), [nodeA, nodeC]);
        });
        test('should throw NoSolutionException if no solution was found', function () {
            let initialState = new State(TestGraphNodes.graphNodeF);
            let goal = new State(TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);
            let uniformCostSearch = new UniformCostSearch();

            assert.throws(() => uniformCostSearch.search(problem), NoSolutionException);
        });
    });

});