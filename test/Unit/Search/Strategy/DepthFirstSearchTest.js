let assert = require('chai').assert;

import {DepthFirstSearch} from './../../../../lib/Search/Strategy/DepthFirstSearch';

import {Node} from './../../../../lib/Search/Node';
import {Point} from '../../../../lib/Graph/Point';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';
import {Graph} from './../../../../lib/Graph/Graph';
import {GraphNode} from './../../../../lib/Graph/GraphNode';
import {Action} from "../../../../lib/Search/Action";
import {NoSolutionException} from "../../../../lib/Exceptions/NoSolutionException";

suite('DepthFirstSearch', function () {

    let graph;

    beforeEach(function () {
        let graphNodeA = new GraphNode('A', new Point(2, 2), new Point(20, 20));
        let graphNodeB = new GraphNode('B', new Point(1, 1), new Point(10, 10));
        let graphNodeC = new GraphNode('C', new Point(2, 1), new Point(20, 10));
        let graphNodeD = new GraphNode('D', new Point(3, 1), new Point(30, 10));
        let graphNodeE = new GraphNode('E', new Point(3, 2), new Point(30, 20));

        let graphNodeX = new GraphNode('X', new Point(5, 5), new Point(50, 50));
        let graphNodeY = new GraphNode('Y', new Point(6, 6), new Point(60, 60));

        graphNodeA.addChildNodes([graphNodeB, graphNodeD, graphNodeE]);
        graphNodeB.addChildNodes([graphNodeA, graphNodeC]);
        graphNodeC.addChildNodes([graphNodeB, graphNodeD]);
        graphNodeD.addChildNodes([graphNodeA, graphNodeE, graphNodeC]);
        graphNodeE.addChildNodes([graphNodeA, graphNodeD]);
        graphNodeX.addChildNodes([graphNodeY]);

        graph = new Graph();
        graph.addNode(graphNodeA);
        graph.addNode(graphNodeB);
        graph.addNode(graphNodeC);
        graph.addNode(graphNodeD);
        graph.addNode(graphNodeE);
        graph.addNode(graphNodeX);
        graph.addNode(graphNodeY);
    });

    suite('#recursiveSearch(node, problem)', function () {
        test('should add the node to explored', function () {
            let initialState = new State('A');
            let goal = new State('B');
            let problem = new Problem(graph, initialState, goal);
            let nodeA = new Node(initialState);

            let depthFirstSearch = new DepthFirstSearch();
            depthFirstSearch.recursiveSearch(nodeA, problem);

            assert.sameDeepMembers(depthFirstSearch.explored, [nodeA]);
        });
        test('should return the node if given node is the goal', function () {
            let initialState = new State('A');
            let goal = new State('C');
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

            let initialState = new State('A');
            let goal = new State('C');
            let problem = new Problem(graph, initialState, goal);

            let depthFirstSearch = new DepthFirstSearch();
            depthFirstSearch.search(problem);

        });
    });

});