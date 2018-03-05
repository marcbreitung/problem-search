let assert = require('chai').assert;

import {BaseSearch} from './../../../../lib/Search/Strategy/BaseSearch';

import {Node} from './../../../../lib/Search/Node';
import {State} from './../../../../lib/Search/State';
import {Problem} from './../../../../lib/Search/Problem';

import {TestGraph} from "./../../../fixtures/TestGraph";

suite('BaseSearch', function () {

    let graph;

    beforeEach(function () {
        graph = TestGraph;
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