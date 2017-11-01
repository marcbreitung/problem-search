let assert = require('chai').assert;

import {DepthFirstSearch} from './../../../../lib/Search/Strategy/DepthFirstSearch';

import {Node} from './../../../../lib/Search/Node';
import {Point} from '../../../../lib/Graph/Point';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';
import {Graph} from './../../../../lib/Graph/Graph';
import {GraphNode} from './../../../../lib/Graph/GraphNode';
import {Action} from "../../../../lib/Search/Action";

describe('DepthFirstSearch', function () {

    let graph;

    beforeEach(function () {
        let graphNodeA = new GraphNode('A', new Point(2, 2), new Point(20, 20));
        let graphNodeB = new GraphNode('B', new Point(1, 1), new Point(10, 10));
        let graphNodeC = new GraphNode('C', new Point(2, 1), new Point(20, 10));
        let graphNodeD = new GraphNode('D', new Point(3, 1), new Point(30, 10));
        let graphNodeE = new GraphNode('E', new Point(3, 2), new Point(30, 20));

        graphNodeA.addConnections([graphNodeB, graphNodeD, graphNodeE]);
        graphNodeB.addConnections([graphNodeA, graphNodeC]);
        graphNodeC.addConnections([graphNodeB, graphNodeD]);
        graphNodeD.addConnections([graphNodeA, graphNodeE, graphNodeC]);
        graphNodeE.addConnections([graphNodeA, graphNodeD]);

        graph = new Graph();
        graph.addNode(graphNodeA);
        graph.addNode(graphNodeB);
        graph.addNode(graphNodeC);
        graph.addNode(graphNodeD);
        graph.addNode(graphNodeE);
    });

    describe('#recursiveSearch(node, problem)', function () {
        it('should add the node to explored', function () {
            let initialState = new State('A');
            let goal = new State('B');
            let problem = new Problem(graph, initialState, goal);
            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));

            let depthFirstSearch = new DepthFirstSearch();
            depthFirstSearch.recursiveSearch(nodeA, problem);

            assert.sameDeepMembers(depthFirstSearch.explored, [nodeA]);
        });
        it('should return the node if given node is the goal', function () {
            let initialState = new State('A');
            let goal = new State('A');
            let problem = new Problem(graph, initialState, goal);
            let nodeA = new Node(initialState);

            let depthFirstSearch = new DepthFirstSearch();

            assert.sameDeepMembers(depthFirstSearch.search(problem).solution(), [nodeA]);
        });
    });

    describe('#search(problem)', function () {
        it('should initialize frontier and explored', function () {
            let depthFirstSearch = new DepthFirstSearch();
            assert.deepPropertyVal(depthFirstSearch, 'frontier', []);
            assert.deepPropertyVal(depthFirstSearch, 'explored', []);
        });
        it('should return path from initial state to goal', function () {

            let initialState = new State('A');
            let goal = new State('C');
            let problem = new Problem(graph, initialState, goal);

            let depthFirstSearch = new DepthFirstSearch();
            depthFirstSearch.search(problem);

        });
    });

});