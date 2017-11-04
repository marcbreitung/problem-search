let assert = require('chai').assert;

import {BaseSearch} from './../../../../lib/Search/Strategy/BaseSearch';

import {Node} from './../../../../lib/Search/Node';
import {Point} from '../../../../lib/Graph/Point';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';
import {Graph} from './../../../../lib/Graph/Graph';
import {GraphNode} from './../../../../lib/Graph/GraphNode';

suite('BaseSearch', function () {

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

    suite('#constructor()', function () {
        test('should initialize frontier and explored', function () {
            let baseSearch = new BaseSearch();
            assert.deepPropertyVal(baseSearch, 'frontier', []);
            assert.deepPropertyVal(baseSearch, 'explored', []);
        });
    });

    suite('#initSearch()', function () {
        test('should initialize frontier and explored', function () {
            let baseSearch = new BaseSearch();
            assert.deepPropertyVal(baseSearch, 'frontier', []);
            assert.deepPropertyVal(baseSearch, 'explored', []);
        });
    });

    suite('#addInitial(problem)', function () {
        test('should return true if initialNode is goal', function () {

            let initialState = new State('A');
            let goal = new State('A');
            let problem = new Problem(graph, initialState, goal);

            let baseSearch = new BaseSearch();

            assert.deepInclude(baseSearch.addInitial(problem), new Node(new State('A')));
        });
        test('should add initialNode to frontier if initialNode is not the goal', function () {

            let initialState = new State('A');
            let goal = new State('B');
            let problem = new Problem(graph, initialState, goal);

            let baseSearch = new BaseSearch();
            baseSearch.addInitial(problem);

            assert.deepPropertyVal(baseSearch, 'frontier', [new Node(new State('A'))]);
        });
    });

    suite('#addFrontier(node)', function () {
        test('should add the node frontier does not contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseSearch.addFrontier(new Node(new State('D')));
            assert.sameDeepMembers(baseSearch.frontier, [new Node(new State('A')), new Node(new State('B')), new Node(new State('C')), new Node(new State('D'))]);
        });
        test('should not add the node frontier does not contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseSearch.addFrontier(new Node(new State('A')));
            assert.sameDeepMembers(baseSearch.frontier, [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))]);
        });
    });

    suite('#addExplored(node)', function () {
        test('should add the node explored does not contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseSearch.addExplored(new Node(new State('D')));
            assert.sameDeepMembers(baseSearch.explored, [new Node(new State('A')), new Node(new State('B')), new Node(new State('C')), new Node(new State('D'))]);
        });
        test('should not add the node explored does not contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseSearch.addExplored(new Node(new State('A')));
            assert.sameDeepMembers(baseSearch.explored, [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))]);
        });
    });

    suite('#nodeExistsInFrontier(node)', function () {
        test('should return true if frontier contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.isTrue(baseSearch.nodeExistsInFrontier(new Node(new State('B'))));
        });
        test('should return false if frontier does not contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.frontier = [new Node(new State('B')), new Node(new State('B')), new Node(new State('C'))];
            assert.isFalse(baseSearch.nodeExistsInFrontier(new Node(new State('X'))));
        });
    });

    suite('#nodeExistsInExplored(node)', function () {
        test('should return true if explored contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.isTrue(baseSearch.nodeExistsInExplored(new Node(new State('B'))));
        });
        test('should return false if explored does not contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.explored = [new Node(new State('B')), new Node(new State('B')), new Node(new State('C'))];
            assert.isFalse(baseSearch.nodeExistsInExplored(new Node(new State('X'))));
        });
    });

    suite('#nodeExists(node)', function () {
        test('should return true if explored and frontier contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseSearch.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.isTrue(baseSearch.nodeExists(new Node(new State('B'))));
        });
        test('should return false if explored and frontier does not contains node', function () {
            let baseSearch = new BaseSearch();
            baseSearch.frontier = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            baseSearch.explored = [new Node(new State('A')), new Node(new State('B')), new Node(new State('C'))];
            assert.isFalse(baseSearch.nodeExists(new Node(new State('X'))));
        });
    });

});