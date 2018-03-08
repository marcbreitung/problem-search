import {GreedyBestFirstSearch} from "../../../../lib/Search/Strategy/GreedyBestFirstSearch";

let assert = require('chai').assert;

import {AStarSearch} from "../../../../lib/Search/Strategy/AStarSearch";

import {Node} from './../../../../lib/Search/Node';
import {State} from './../../../../lib/Search/State';
import {Action} from './../../../../lib/Search/Action';
import {Problem} from "../../../../lib/Search/Problem";
import {NoSolutionException} from "../../../../lib/Exceptions/NoSolutionException";

import {TestGraph} from "./../../../fixtures/TestGraph";
import {TestGraphNodes} from "./../../../fixtures/TestGraph";
import {GraphNode} from "../../../../lib/Graph/GraphNode";
import {Point} from "../../../../lib/Graph/Point";

suite('AStarSearch', function () {

    let graph;

    beforeEach(function () {
        graph = TestGraph;
    });

    suite('#sortFrontier()', function () {
        test('should return frontier array sorted by the path cost plus distance to the goal', function () {

            let initial = new Node(new State(new GraphNode('I', new Point(0, 0), new Point(0, 0))));

            let nodeA = new Node(new State(new GraphNode('A', new Point(1, 1), new Point(10, 10))));
            nodeA.pathCost = initial.state.distance(nodeA.state);

            let nodeB = new Node(new State(new GraphNode('B', new Point(3, 3), new Point(30, 30))));
            nodeB.pathCost = initial.state.distance(nodeB.state);

            let nodeC = new Node(new State(new GraphNode('C', new Point(1, 2), new Point(10, 20))));
            nodeC.pathCost = initial.state.distance(nodeC.state);

            let goal = new State(new GraphNode('D', new Point(2, 3), new Point(20, 30)));

            let aStarSearch = new AStarSearch();
            aStarSearch.frontier = [nodeA, nodeB, nodeC];
            aStarSearch.sortFrontier(goal);

            assert.sameDeepOrderedMembers(aStarSearch.frontier, [nodeC, nodeB, nodeA]);
        });
    });

    suite('#updateFrontier()', function () {
        test('should substitute node with lower path cost plus distance to the goal', function () {

            let initial = new Node(new State(new GraphNode('I', new Point(0, 0), new Point(0, 0))));

            let nodeA = new Node(new State(new GraphNode('A', new Point(1, 1), new Point(10, 10))));
            nodeA.pathCost = initial.state.distance(nodeA.state);

            let nodeB = new Node(new State(new GraphNode('B', new Point(3, 3), new Point(30, 30))));
            nodeB.pathCost = initial.state.distance(nodeB.state);

            let nodeC = new Node(new State(new GraphNode('C', new Point(1, 2), new Point(10, 20))));
            nodeC.pathCost = initial.state.distance(nodeC.state);

            let nodeCSubstitution = new Node(new State(new GraphNode('C', new Point(1, 2), new Point(10, 20))));
            nodeCSubstitution.pathCost = initial.state.distance(nodeC.state) - 2; // simulate shorter path cost

            let goal = new State(new GraphNode('D', new Point(2, 3), new Point(20, 30)));

            let aStarSearch = new AStarSearch();
            aStarSearch.frontier = [nodeA, nodeB, nodeC];
            aStarSearch.updateFrontier(nodeCSubstitution, goal);

            assert.sameDeepOrderedMembers(aStarSearch.frontier, [nodeCSubstitution, nodeB, nodeA]);
        });
    });

    suite('#extend(problem, node)', function () {
        test('should add extended nodes to frontier', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);
            let goal = new State(TestGraphNodes.graphNodeC);
            let problem = new Problem(graph, initialState, goal);

            let aStarSearch = new AStarSearch();

            aStarSearch.extend(problem, new Node(new State(TestGraphNodes.graphNodeA)));

            let nodeB = new State(TestGraphNodes.graphNodeB);
            let nodeD = new State(TestGraphNodes.graphNodeD);
            let nodeE = new State(TestGraphNodes.graphNodeE);

            assert.sameDeepOrderedMembers(aStarSearch.frontier.map(n => n.state), [nodeB, nodeD, nodeE]);
        });
    });

    suite('#search(problem)', function () {
        test('should direct return path from initialStet to goal if initial state is goal', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);
            let goal = new State(TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);

            let aStarSearch = new AStarSearch();

            let nodeA = new Node(initialState);

            assert.sameDeepMembers(aStarSearch.search(problem).solution(), [nodeA]);
        });
        test('should return path from initial state to goal', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);
            let goal = new State(TestGraphNodes.graphNodeD);
            let problem = new Problem(graph, initialState, goal);

            let aStarSearch = new AStarSearch();

            let nodeA = new Node(initialState);
            let nodeC = Node.make(problem, nodeA, new Action('D'));

            assert.sameDeepMembers(aStarSearch.search(problem).solution(), [nodeA, nodeC]);
        });
        test('should throw NoSolutionException if no solution was found', function () {
            let initialState = new State(TestGraphNodes.graphNodeF);
            let goal = new State(TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);
            let aStarSearch = new AStarSearch();

            assert.throws(() => aStarSearch.search(problem), NoSolutionException);
        });
    });
});