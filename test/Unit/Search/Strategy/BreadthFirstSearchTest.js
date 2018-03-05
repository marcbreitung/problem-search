let assert = require('chai').assert;

import {BreadthFirstSearch} from './../../../../lib/Search/Strategy/BreadthFirstSearch';

import {Node} from './../../../../lib/Search/Node';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';
import {Action} from "../../../../lib/Search/Action";
import {NoSolutionException} from "../../../../lib/Exceptions/NoSolutionException";

import {TestGraph} from "./../../../fixtures/TestGraph";
import {TestGraphNodes} from "../../../fixtures/TestGraph";

suite('BreadthFirstSearch', function () {

    let graph;

    beforeEach(function () {
        graph = TestGraph;
    });

    suite('#getCurrentNode()', function () {
        test('should remove and return first element from frontier', function () {
            let breadthFirstSearch = new BreadthFirstSearch();

            breadthFirstSearch.frontier = [
                new Node(new State('A', TestGraphNodes.graphNodeA)),
                new Node(new State('B', TestGraphNodes.graphNodeB)),
                new Node(new State('C', TestGraphNodes.graphNodeC))
            ];

            assert.deepEqual(breadthFirstSearch.getCurrentNode(), new Node(new State('A', TestGraphNodes.graphNodeA)));
        });
    });

    suite('#extend(problem, node)', function () {
        test('should add extended nodes to frontier', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('C', TestGraphNodes.graphNodeC);
            let problem = new Problem(graph, initialState, goal);

            let breadthFirstSearch = new BreadthFirstSearch();

            breadthFirstSearch.extend(problem, new Node(new State('A', TestGraphNodes.graphNodeA)));

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeD = Node.make(problem, nodeA, new Action('D'));
            let nodeE = Node.make(problem, nodeA, new Action('E'));

            assert.sameDeepMembers(breadthFirstSearch.frontier, [nodeB, nodeD, nodeE]);
        });
        test('should not add extended nodes to frontier if the node already exists', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('C', TestGraphNodes.graphNodeC);
            let problem = new Problem(graph, initialState, goal);

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeD = Node.make(problem, nodeA, new Action('D'));
            let nodeE = Node.make(problem, nodeA, new Action('E'));

            let breadthFirstSearch = new BreadthFirstSearch();
            breadthFirstSearch.frontier = [nodeB, nodeD, nodeE];
            breadthFirstSearch.explored = [nodeB, nodeD, nodeE];

            breadthFirstSearch.extend(problem, new Node(new State('A', TestGraphNodes.graphNodeA)));

            assert.sameDeepMembers(breadthFirstSearch.frontier, [nodeB, nodeD, nodeE]);
        });
    });

    suite('#search(problem)', function () {
        test('should direct return path from initialStet to goal if initial state is goal', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('A', TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);

            let breadthFirstSearch = new BreadthFirstSearch();

            let nodeA = new Node(initialState);

            assert.sameDeepMembers(breadthFirstSearch.search(problem).solution(), [nodeA]);
        });
        test('should return path from initial state to goal', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('C', TestGraphNodes.graphNodeC);
            let problem = new Problem(graph, initialState, goal);

            let breadthFirstSearch = new BreadthFirstSearch();

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeC = Node.make(problem, nodeB, new Action('C'));

            assert.sameDeepMembers(breadthFirstSearch.search(problem).solution(), [nodeA, nodeB, nodeC]);
        });
        test('should throw NoSolutionException if no solution was found', function () {
            let initialState = new State('F', TestGraphNodes.graphNodeF);
            let goal = new State('A', TestGraphNodes.graphNodeA);
            let problem = new Problem(graph, initialState, goal);
            let breadthFirstSearch = new BreadthFirstSearch();

            assert.throws(() => breadthFirstSearch.search(problem), NoSolutionException);
        });
    });

});