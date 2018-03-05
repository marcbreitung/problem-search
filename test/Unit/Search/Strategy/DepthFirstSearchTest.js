let assert = require('chai').assert;

import {DepthFirstSearch} from './../../../../lib/Search/Strategy/DepthFirstSearch';

import {Node} from './../../../../lib/Search/Node';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';
import {Action} from "../../../../lib/Search/Action";
import {NoSolutionException} from "../../../../lib/Exceptions/NoSolutionException";

import {TestGraph} from "./../../../fixtures/TestGraph";
import {TestGraphNodes} from "../../../fixtures/TestGraph";

suite('DepthFirstSearch', function () {

    let graph;

    beforeEach(function () {
        graph = TestGraph;
    });

    suite('#recursiveSearch(node, problem)', function () {
        test('should add the node to explored', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);
            let problem = new Problem(graph, initialState, goal);
            let nodeA = new Node(initialState);

            let depthFirstSearch = new DepthFirstSearch();
            depthFirstSearch.recursiveSearch(nodeA, problem);

            assert.sameDeepMembers(depthFirstSearch.explored, [nodeA]);
        });
        test('should return the node if given node is the goal', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('C', TestGraphNodes.graphNodeC);
            let problem = new Problem(graph, initialState, goal);

            let depthFirstSearch = new DepthFirstSearch();

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeC = Node.make(problem, nodeB, new Action('C'));

            assert.sameDeepMembers(depthFirstSearch.search(problem).solution(), [nodeA, nodeB, nodeC]);
        });
    });

    suite('#search(problem)', function () {
        test('should initialize frontier and explored', function () {
            let depthFirstSearch = new DepthFirstSearch();

            assert.deepPropertyVal(depthFirstSearch, 'frontier', []);
            assert.deepPropertyVal(depthFirstSearch, 'explored', []);
        });
        test('should return path from initial state to goal', function () {

            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('D', TestGraphNodes.graphNodeD);
            let problem = new Problem(graph, initialState, goal);

            let depthFirstSearch = new DepthFirstSearch();

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeC = Node.make(problem, nodeB, new Action('C'));
            let nodeD = Node.make(problem, nodeC, new Action('D'));

            assert.sameDeepMembers(depthFirstSearch.search(problem).solution(), [nodeA, nodeB, nodeC, nodeD]);

        });
        test('should throw NoSolutionException if no solution was found', function () {
            let initialState = new State('F', TestGraphNodes.graphNodeF);
            let goal = new State('A', TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);
            let depthFirstSearch = new DepthFirstSearch();

            assert.throws(() => depthFirstSearch.search(problem), NoSolutionException);
        });
    });

});