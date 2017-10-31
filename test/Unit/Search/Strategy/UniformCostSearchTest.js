let assert = require('chai').assert;

import {UniformCostSearch} from './../../../../lib/Search/Strategy/UniformCostSearch';

import {Node} from './../../../../lib/Search/Node';
import {Point} from '../../../../lib/Graph/Point';
import {State} from './../../../../lib/Search/State';
import {Graph} from './../../../../lib/Graph/Graph';
import {GraphNode} from './../../../../lib/Graph/GraphNode';

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

    describe('#sortFrontier()', function () {
        it('should return frontier array sorted by path cost', function () {

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

    describe('#getCurrentNode()', function () {
        it('should return frontier with lowest path cost', function () {

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

    describe('#updateNodeWithHigherPathCost(node)', function () {
        it('should return frontier with lowest path cost', function () {

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

    describe('#extend(problem, node)', function () {
        it('should return frontier with lowest path cost', function () {

        });
    });

});