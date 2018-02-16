let assert = require('chai').assert;

import {UniformCostSearch} from './../../../../lib/Search/Strategy/UniformCostSearch';

import {Node} from './../../../../lib/Search/Node';
import {Point} from '../../../../lib/Graph/Point';
import {State} from './../../../../lib/Search/State';
import {Action} from './../../../../lib/Search/Action';
import {Graph} from './../../../../lib/Graph/Graph';
import {GraphNode} from './../../../../lib/Graph/GraphNode';
import {Problem} from "../../../../lib/Search/Problem";
import {NoSolutionException} from "../../../../lib/Exceptions/NoSolutionException";

suite('BreadthFirstSearch', function () {

    let graph;

    beforeEach(function () {
        let graphNodeA = new GraphNode('A', new Point(2, 2), new Point(20, 20));
        let graphNodeB = new GraphNode('B', new Point(1, 1), new Point(10, 10));
        let graphNodeC = new GraphNode('C', new Point(2, 1), new Point(20, 10));
        let graphNodeD = new GraphNode('D', new Point(3, 1), new Point(30, 10));
        let graphNodeE = new GraphNode('E', new Point(3, 2), new Point(30, 20));

        graphNodeA.addChildNodes([graphNodeB, graphNodeD, graphNodeE]);
        graphNodeB.addChildNodes([graphNodeA, graphNodeC]);
        graphNodeC.addChildNodes([graphNodeB, graphNodeD]);
        graphNodeD.addChildNodes([graphNodeA, graphNodeE, graphNodeC]);
        graphNodeE.addChildNodes([graphNodeA, graphNodeD]);

        graph = new Graph();
        graph.addNode(graphNodeA);
        graph.addNode(graphNodeB);
        graph.addNode(graphNodeC);
        graph.addNode(graphNodeD);
        graph.addNode(graphNodeE);
    });

    suite('#sortFrontier()', function () {
        test('should return frontier array sorted by path cost', function () {

            let initialState = new State('A');

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

            let initialState = new State('A');

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

            let initialState = new State('A');

            let nodeA = new Node(initialState);
            nodeA.pathCost = 8;
            nodeA.state = new State('A');

            let nodeB = new Node(initialState);
            nodeB.pathCost = 65;
            nodeB.state = new State('B');

            let nodeC = new Node(initialState);
            nodeC.pathCost = 3;
            nodeC.state = new State('C');

            let nodeD = new Node(initialState);
            nodeD.pathCost = 42;
            nodeD.state = new State('D');

            let uniformCostSearch = new UniformCostSearch();

            uniformCostSearch.frontier = [nodeA, nodeB, nodeC, nodeD];

            assert.sameDeepOrderedMembers(uniformCostSearch.frontier, [nodeA, nodeB, nodeC, nodeD]);

            let nodeDReplace = new Node(initialState);
            nodeDReplace.pathCost = 1;
            nodeDReplace.state = new State('D');

            uniformCostSearch.updateNodeWithHigherPathCost(nodeDReplace);

            assert.sameDeepOrderedMembers(uniformCostSearch.frontier, [nodeDReplace, nodeC, nodeA, nodeB]);
        });
    });

    suite('#extend(problem, node)', function () {
        test('should add extended nodes to frontier', function () {

            let initialState = new State('A');
            let goal = new State('C');
            let problem = new Problem(graph, initialState, goal);

            let uniformCostSearch = new UniformCostSearch();

            uniformCostSearch.extend(problem, new Node(new State('A')));

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeD = Node.make(problem, nodeA, new Action('D'));
            let nodeE = Node.make(problem, nodeA, new Action('E'));

            assert.sameDeepOrderedMembers(uniformCostSearch.frontier, [nodeB, nodeD, nodeE]);

        });
    });

    suite('#search(problem)', function () {
        test('should direct return path from initialStet to goal if initial state is goal', function () {
            let initialState = new State('A');
            let goal = new State('A');
            let problem = new Problem(graph, initialState, goal);

            let uniformCostSearch = new UniformCostSearch();

            let nodeA = new Node(initialState);

            assert.sameDeepMembers(uniformCostSearch.search(problem).solution(), [nodeA]);
        });
        test('should return path from initial state to goal', function () {
            let initialState = new State('A');
            let goal = new State('C');
            let problem = new Problem(graph, initialState, goal);

            let uniformCostSearch = new UniformCostSearch();

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeC = Node.make(problem, nodeB, new Action('C'));

            assert.sameDeepMembers(uniformCostSearch.search(problem).solution(), [nodeA, nodeB, nodeC]);
        });
        test('should throw NoSolutionException if no solution was found', function () {
            let initialState = new State('F');
            let goal = new State('A');
            let problem = new Problem(graph, initialState, goal);
            let uniformCostSearch = new UniformCostSearch();
            assert.throws(() => uniformCostSearch.search(problem), NoSolutionException);
        });
    });

});