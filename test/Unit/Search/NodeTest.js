let assert = require('chai').assert;

import {Node} from './../../../lib/Search/Node';

import {Point} from '../../../lib/Graph/Point';
import {State} from './../../../lib/Search/State';
import {Action} from './../../../lib/Search/Action';
import {Problem} from './../../../lib/Search/Problem';
import {Graph} from './../../../lib/Graph/Graph';
import {GraphNode} from './../../../lib/Graph/GraphNode';

suite('Node', function () {

    let graph;
    let graphNodeA;
    let graphNodeB;
    let graphNodeC;
    let graphNodeD;
    let graphNodeE;

    beforeEach(function () {

        graphNodeA = new GraphNode('A', new Point(2, 2), new Point(20, 20));
        graphNodeB = new GraphNode('B', new Point(1, 1), new Point(10, 10));
        graphNodeC = new GraphNode('C', new Point(2, 1), new Point(20, 10));
        graphNodeD = new GraphNode('D', new Point(3, 1), new Point(30, 10));
        graphNodeE = new GraphNode('E', new Point(3, 2), new Point(30, 20));

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
    });

    suite('#constructor(state)', function () {
        test('should set the property state', function () {
            let graphNode = new GraphNode('State', new Point(2, 2), new Point(20, 20));
            let state = new State(graphNode);
            let node = new Node(state);
            assert.propertyVal(node, 'state', state);
        });
        test('should initialize properties parent, action and pathCost', function () {
            let graphNode = new GraphNode('State', new Point(2, 2), new Point(20, 20));
            let state = new State(graphNode);
            let node = new Node(state);
            assert.propertyVal(node, 'parent', null);
            assert.propertyVal(node, 'action', null);
            assert.propertyVal(node, 'pathCost', 0);
        });
    });

    suite('#make(problem, parent, action)', function () {
        test('should make a new node', function () {

            let initialState = new State(graphNodeA);
            let goal = new State(graphNodeE);
            let problem = new Problem(graph, initialState, goal);
            let parentNode = new Node(initialState);
            let action = new Action('B');

            let node = Node.make(problem, parentNode, action);

            assert.propertyVal(node, 'parent', parentNode);
            assert.propertyVal(node, 'action', action);
            assert.propertyVal(node, 'action', action);
            assert.deepPropertyVal(node, 'state', new State(graphNodeB));
            assert.closeTo(node.pathCost, 14.1421, 0.2);

        });
    });

    suite('#solution()', function () {
        test('should return the back path', function () {

            let initialState = new State(graphNodeA);
            let goal = new State(graphNodeE);
            let problem = new Problem(graph, initialState, goal);
            let parentNode = new Node(initialState);

            let nodeB = Node.make(problem, parentNode, new Action('B'));
            let nodeC = Node.make(problem, nodeB, new Action('C'));
            let nodeD = Node.make(problem, nodeC, new Action('D'));

            assert.sameDeepMembers(nodeD.solution(), [parentNode, nodeB, nodeC, nodeD]);

        });
    });

    suite('#solutionGraph()', function () {
        test('should return the back path', function () {

            let initialState = new State(graphNodeA);
            let goal = new State(graphNodeE);
            let problem = new Problem(graph, initialState, goal);
            let parentNode = new Node(initialState);

            let nodeB = Node.make(problem, parentNode, new Action('B'));
            let nodeC = Node.make(problem, nodeB, new Action('C'));
            let nodeD = Node.make(problem, nodeC, new Action('D'));

            assert.sameDeepMembers(nodeD.solutionGraph(), [graphNodeA, graphNodeB, graphNodeC, graphNodeD]);

        });
    });

});