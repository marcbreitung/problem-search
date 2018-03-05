let assert = require('chai').assert;

import {DepthLimitedSearch} from "../../../../lib/Search/Strategy/DepthLimitedSearch";

import {Node} from './../../../../lib/Search/Node';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';
import {Action} from "../../../../lib/Search/Action";
import {NoSolutionException} from "../../../../lib/Exceptions/NoSolutionException";
import {LimitException} from "../../../../lib/Exceptions/LimitException";

import {TestGraph} from "./../../../fixtures/TestGraph";
import {TestGraphNodes} from "../../../fixtures/TestGraph";

suite('DepthLimitedSearch', function () {

    let graph;

    beforeEach(function () {
        graph = TestGraph;
    });

    suite('#recursiveSearch(node, problem)', function () {
        test('should add the node to explored', function () {
            let searchLimit = 10;

            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);
            let problem = new Problem(graph, initialState, goal);

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));

            let depthLimitedSearch = new DepthLimitedSearch({limit: searchLimit});

            depthLimitedSearch.recursiveSearch(nodeA, problem, searchLimit);

            assert.sameDeepMembers(depthLimitedSearch.explored, [nodeA, nodeB]);
        });
        test('should return the node if given node is the goal', function () {
            let searchLimit = 10;

            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('C', TestGraphNodes.graphNodeC);
            let problem = new Problem(graph, initialState, goal);

            let depthLimitedSearch = new DepthLimitedSearch({limit: searchLimit});

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeC = Node.make(problem, nodeB, new Action('C'));

            assert.sameDeepMembers(depthLimitedSearch.search(problem).solution(), [nodeA, nodeB, nodeC]);
        });
    });

    suite('#search(problem)', function () {
        test('should initialize frontier and explored', function () {
            let searchLimit = 10;
            let depthLimitedSearch = new DepthLimitedSearch({limit: searchLimit});

            assert.deepPropertyVal(depthLimitedSearch, 'frontier', []);
            assert.deepPropertyVal(depthLimitedSearch, 'explored', []);
        });
        test('should throw LimitException if limit is 0', function () {
            let searchLimit = 1;
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('C', TestGraphNodes.graphNodeC);
            let problem = new Problem(graph, initialState, goal);
            let depthLimitedSearch = new DepthLimitedSearch({limit: searchLimit});

            assert.throws(() => depthLimitedSearch.search(problem), LimitException);
        });
        test('should throw NoSolutionException if no solution was found', function () {
            let searchLimit = 10;
            let initialState = new State('F', TestGraphNodes.graphNodeF);
            let goal = new State('A', TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);
            let depthLimitedSearch = new DepthLimitedSearch({limit: searchLimit});

            assert.throws(() => depthLimitedSearch.search(problem), NoSolutionException);
        });
        test('should return path from initial state to goal', function () {
            let searchLimit = 10;
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('D', TestGraphNodes.graphNodeD);
            let problem = new Problem(graph, initialState, goal);

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeC = Node.make(problem, nodeB, new Action('C'));
            let nodeD = Node.make(problem, nodeC, new Action('D'));

            let depthLimitedSearch = new DepthLimitedSearch({limit: searchLimit});

            assert.sameDeepMembers(depthLimitedSearch.search(problem).solution(), [nodeA, nodeB, nodeC, nodeD]);
        });
    });
});