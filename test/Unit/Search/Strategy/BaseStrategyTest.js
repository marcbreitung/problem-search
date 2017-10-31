let assert = require('chai').assert;

import {BaseStrategy} from './../../../../lib/Search/Strategy/BaseStrategy';

import {Node} from './../../../../lib/Search/Node';
import {Point} from '../../../../lib/Graph/Point';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';
import {Graph} from './../../../../lib/Graph/Graph';
import {GraphNode} from './../../../../lib/Graph/GraphNode';

describe('BaseStrategy', function () {

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

    describe('#constructor()', function () {
        it('should initialize frontier and explored', function () {
            let baseStrategy = new BaseStrategy();
            assert.deepPropertyVal(baseStrategy, 'frontier', []);
            assert.deepPropertyVal(baseStrategy, 'explored', []);
        });
    });

    describe('#initSearch()', function () {
        it('should initialize frontier and explored', function () {
            let baseStrategy = new BaseStrategy();
            assert.deepPropertyVal(baseStrategy, 'frontier', []);
            assert.deepPropertyVal(baseStrategy, 'explored', []);
        });
    });

    describe('#addInitial(problem)', function () {
        it('should return true if initialNode is goal', function () {

            let initialState = new State('A');
            let goal = new State('A');
            let problem = new Problem(graph, initialState, goal);

            let baseStrategy = new BaseStrategy();

            assert.deepInclude(baseStrategy.addInitial(problem), new Node(new State('A')));
        });
        it('should add initialNode to frontier if initialNode is not the goal', function () {

            let initialState = new State('A');
            let goal = new State('B');
            let problem = new Problem(graph, initialState, goal);

            let baseStrategy = new BaseStrategy();
            baseStrategy.addInitial(problem);

            assert.deepPropertyVal(baseStrategy, 'frontier', [new Node(new State('A'))]);
        });
    });

    describe('#addFrontier(node)', function () {
        it('should add the node frontier does not contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseStrategy.addFrontier(new Node(new State('D')));
            assert.sameDeepMembers(baseStrategy.frontier, [new Node(new State('A')), new Node(new State('B')), new Node(new State('C')), new Node(new State('D'))]);
        });
        it('should not add the node frontier does not contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseStrategy.addFrontier(new Node(new State('A')));
            assert.sameDeepMembers(baseStrategy.frontier, [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))]);
        });
    });

    describe('#addExploded(node)', function () {
        it('should add the node explored does not contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseStrategy.addExploded(new Node(new State('D')));
            assert.sameDeepMembers(baseStrategy.explored, [new Node(new State('A')), new Node(new State('B')), new Node(new State('C')), new Node(new State('D'))]);
        });
        it('should not add the node explored does not contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseStrategy.addExploded(new Node(new State('A')));
            assert.sameDeepMembers(baseStrategy.explored, [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))]);
        });
    });

    describe('#nodeExistsInFrontier(node)', function () {
        it('should return true if frontier contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.isTrue(baseStrategy.nodeExistsInFrontier(new Node(new State('B'))));
        });
        it('should return false if frontier does not contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.frontier = [new Node(new State('B')), new Node(new State('B')), new Node(new State('C'))];
            assert.isFalse(baseStrategy.nodeExistsInFrontier(new Node(new State('X'))));
        });
    });

    describe('#nodeExistsInExplored(node)', function () {
        it('should return true if explored contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.isTrue(baseStrategy.nodeExistsInExplored(new Node(new State('B'))));
        });
        it('should return false if explored does not contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.explored = [new Node(new State('B')), new Node(new State('B')), new Node(new State('C'))];
            assert.isFalse(baseStrategy.nodeExistsInExplored(new Node(new State('X'))));
        });
    });

    describe('#nodeExists(node)', function () {
        it('should return true if explored and frontier contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseStrategy.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.isTrue(baseStrategy.nodeExists(new Node(new State('B'))));
        });
        it('should return false if explored and frontier does not contains node', function () {
            let baseStrategy = new BaseStrategy();
            baseStrategy.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseStrategy.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.isFalse(baseStrategy.nodeExists(new Node(new State('X'))));
        });
    });

});