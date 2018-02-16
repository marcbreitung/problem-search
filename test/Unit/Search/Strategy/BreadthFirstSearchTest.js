let assert = require('chai').assert;

import {BreadthFirstSearch} from './../../../../lib/Search/Strategy/BreadthFirstSearch';

import {Node} from './../../../../lib/Search/Node';
import {Point} from '../../../../lib/Graph/Point';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';
import {Graph} from './../../../../lib/Graph/Graph';
import {GraphNode} from './../../../../lib/Graph/GraphNode';
import {Action} from "../../../../lib/Search/Action";
import {NoSolutionException} from "../../../../lib/Exceptions/NoSolutionException";

suite('BreadthFirstSearch', function () {

    let graph;

    beforeEach(function () {
        let graphNodeA = new GraphNode('A', new Point(2, 2), new Point(20, 20));
        let graphNodeB = new GraphNode('B', new Point(1, 1), new Point(10, 10));
        let graphNodeC = new GraphNode('C', new Point(2, 1), new Point(20, 10));
        let graphNodeD = new GraphNode('D', new Point(3, 1), new Point(30, 10));
        let graphNodeE = new GraphNode('E', new Point(3, 2), new Point(30, 20));
        let graphNodeF = new GraphNode('F', new Point(4, 4), new Point(35, 25));

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
        graph.addNode(graphNodeF);
    });

    suite('#getCurrentNode()', function () {
        test('should remove and return first element from frontier', function () {
            let breadthFirstSearch = new BreadthFirstSearch();
            breadthFirstSearch.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.deepEqual(breadthFirstSearch.getCurrentNode(), new Node(new State('A')));
        });
    });

    suite('#extend(problem, node)', function () {
        test('should add extended nodes to frontier', function () {

            let initialState = new State('A');
            let goal = new State('C');
            let problem = new Problem(graph, initialState, goal);

            let breadthFirstSearch = new BreadthFirstSearch();

            breadthFirstSearch.extend(problem, new Node(new State('A')));

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeD = Node.make(problem, nodeA, new Action('D'));
            let nodeE = Node.make(problem, nodeA, new Action('E'));

            assert.sameDeepMembers(breadthFirstSearch.frontier, [nodeB, nodeD, nodeE]);
        });
        test('should not add extended nodes to frontier if the node already exists', function () {

            let initialState = new State('A');
            let goal = new State('C');
            let problem = new Problem(graph, initialState, goal);

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeD = Node.make(problem, nodeA, new Action('D'));
            let nodeE = Node.make(problem, nodeA, new Action('E'));

            let breadthFirstSearch = new BreadthFirstSearch();
            breadthFirstSearch.frontier = [nodeB, nodeD, nodeE];
            breadthFirstSearch.explored = [nodeB, nodeD, nodeE];

            breadthFirstSearch.extend(problem, new Node(new State('A')));

            assert.sameDeepMembers(breadthFirstSearch.frontier, [nodeB, nodeD, nodeE]);
        });
    });

    suite('#search(problem)', function () {
        test('should direct return path from initialStet to goal if initial state is goal', function () {
            let initialState = new State('A');
            let goal = new State('A');
            let problem = new Problem(graph, initialState, goal);

            let breadthFirstSearch = new BreadthFirstSearch();

            let nodeA = new Node(initialState);

            assert.sameDeepMembers(breadthFirstSearch.search(problem).solution(), [nodeA]);
        });
        test('should return path from initial state to goal', function () {
            let initialState = new State('A');
            let goal = new State('C');
            let problem = new Problem(graph, initialState, goal);

            let breadthFirstSearch = new BreadthFirstSearch();

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeC = Node.make(problem, nodeB, new Action('C'));

            assert.sameDeepMembers(breadthFirstSearch.search(problem).solution(), [nodeA, nodeB, nodeC]);
        });
        test('should throw NoSolutionException if no solution was found', function () {
            let initialState = new State('F');
            let goal = new State('A');
            let problem = new Problem(graph, initialState, goal);
            let breadthFirstSearch = new BreadthFirstSearch();
            assert.throws(() => breadthFirstSearch.search(problem), NoSolutionException);
        });
    });

});