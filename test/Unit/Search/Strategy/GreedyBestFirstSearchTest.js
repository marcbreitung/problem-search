let assert = require('chai').assert;

import {GreedyBestFirstSearch} from "../../../../lib/Search/Strategy/GreedyBestFirstSearch";

import {Node} from './../../../../lib/Search/Node';
import {State} from './../../../../lib/Search/State';
import {Action} from './../../../../lib/Search/Action';
import {Problem} from "../../../../lib/Search/Problem";
import {NoSolutionException} from "../../../../lib/Exceptions/NoSolutionException";

import {TestGraph} from "./../../../fixtures/TestGraph";
import {TestGraphNodes} from "./../../../fixtures/TestGraph";

suite('GreedyBestFirstSearch', function () {

    let graph;

    beforeEach(function () {
        graph = TestGraph;
    });

    suite('#sortFrontier()', function () {
        test('should return frontier array sorted by distance to the goal', function () {
            let nodeA = new Node(new State(TestGraphNodes.graphNodeA));
            let nodeB = new Node(new State(TestGraphNodes.graphNodeB));
            let nodeD = new Node(new State(TestGraphNodes.graphNodeD));
            let nodeE = new Node(new State(TestGraphNodes.graphNodeE));

            let nodeC = new State(TestGraphNodes.graphNodeC);

            let greedyBestFirstSearch = new GreedyBestFirstSearch();

            greedyBestFirstSearch.frontier = [nodeE, nodeD, nodeB, nodeA];
            greedyBestFirstSearch.sortFrontier(nodeC);

            assert.sameDeepOrderedMembers(greedyBestFirstSearch.frontier, [nodeD, nodeB, nodeA, nodeE]);
        });
    });

    suite('#updateNodeWithLowerDistanceToGoal(node, goal)', function () {
        test('should substitute node with lower distance to goal', function () {
            let nodeA = new Node(new State(TestGraphNodes.substGraphNodeA));
            let nodeB = new Node(new State(TestGraphNodes.graphNodeB));
            let nodeD = new Node(new State(TestGraphNodes.graphNodeD));
            let nodeE = new Node(new State(TestGraphNodes.graphNodeE));

            let substituteNodeA = new Node(new State(TestGraphNodes.graphNodeA));

            let nodeC = new State(TestGraphNodes.graphNodeC);

            let greedyBestFirstSearch = new GreedyBestFirstSearch();

            greedyBestFirstSearch.frontier = [nodeE, nodeD, nodeB, nodeA];
            greedyBestFirstSearch.updateNodeWithLowerDistanceToGoal(substituteNodeA, nodeC);

            assert.sameDeepOrderedMembers(greedyBestFirstSearch.frontier, [nodeD, nodeB, substituteNodeA, nodeE]);
        });
    });

    suite('#extend(problem, node)', function () {
        test('should add extended nodes to frontier', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);
            let goal = new State(TestGraphNodes.graphNodeC);
            let problem = new Problem(graph, initialState, goal);

            let greedyBestFirstSearch = new GreedyBestFirstSearch();

            greedyBestFirstSearch.extend(problem, new Node(new State(TestGraphNodes.graphNodeA)));

            let nodeB = new State(TestGraphNodes.graphNodeB);
            let nodeD = new State(TestGraphNodes.graphNodeD);
            let nodeE = new State(TestGraphNodes.graphNodeE);

            assert.sameDeepOrderedMembers(greedyBestFirstSearch.frontier.map(n => n.state), [nodeB, nodeD, nodeE]);
        });
    });

    suite('#search(problem)', function () {
        test('should direct return path from initialStet to goal if initial state is goal', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);
            let goal = new State(TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);

            let greedyBestFirstSearch = new GreedyBestFirstSearch();

            let nodeA = new Node(initialState);

            assert.sameDeepMembers(greedyBestFirstSearch.search(problem).solution(), [nodeA]);
        });
        test('should return path from initial state to goal', function () {
            let initialState = new State(TestGraphNodes.graphNodeA);
            let goal = new State(TestGraphNodes.graphNodeD);
            let problem = new Problem(graph, initialState, goal);

            let greedyBestFirstSearch = new GreedyBestFirstSearch();

            let nodeA = new Node(initialState);
            let nodeC = Node.make(problem, nodeA, new Action('D'));

            assert.sameDeepMembers(greedyBestFirstSearch.search(problem).solution(), [nodeA, nodeC]);
        });
        test('should throw NoSolutionException if no solution was found', function () {
            let initialState = new State(TestGraphNodes.graphNodeF);
            let goal = new State(TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);greedyBestFirstSearch
            let greedyBestFirstSearch = new GreedyBestFirstSearch();

            assert.throws(() => greedyBestFirstSearch.search(problem), NoSolutionException);
        });
    });

});