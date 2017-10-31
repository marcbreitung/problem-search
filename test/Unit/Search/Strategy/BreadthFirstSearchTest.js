let assert = require('chai').assert;

import {BreadthFirstSearch} from './../../../../lib/Search/Strategy/BreadthFirstSearch';

import {Node} from './../../../../lib/Search/Node';
import {Point} from '../../../../lib/Graph/Point';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';
import {Graph} from './../../../../lib/Graph/Graph';
import {GraphNode} from './../../../../lib/Graph/GraphNode';
import {Action} from "../../../../lib/Search/Action";

describe('BreadthFirstSearch', function () {

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

    describe('#getCurrentNode()', function () {
        it('should remove and return first element from frontier', function () {
            let breadthFirstSearch = new BreadthFirstSearch();
            breadthFirstSearch.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.deepEqual(breadthFirstSearch.getCurrentNode(), new Node(new State('A')));
        });
    });

    describe('#extend(problem, node)', function () {
        it('should add extended nodes to frontier', function () {
            let initialState = new State('A');
            let goal = new State('C');
            let problem = new Problem(graph, initialState, goal);

            let breadthFirstSearch = new BreadthFirstSearch();

            breadthFirstSearch.extend(problem, new Node(new State('A')));

            let nodeA = new Node(initialState);
            let nodeB = Node.make(problem, nodeA, new Action('B'));
            let nodeD = Node.make(problem, nodeA, new Action('D'));
            let nodeE = Node.make(problem, nodeA, new Action('E'));

            console.log(breadthFirstSearch.frontier);

            assert.sameDeepMembers(breadthFirstSearch.frontier, [nodeB, nodeD, nodeE]);

        });
    });

});