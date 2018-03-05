let assert = require('chai').assert;

import {Problem} from './../../../lib/Search/Problem';

import {Action} from "../../../lib/Search/Action";
import {Point} from "../../../lib/Graph/Point";
import {State} from './../../../lib/Search/State';
import {Graph} from './../../../lib/Graph/Graph';
import {GraphNode} from './../../../lib/Graph/GraphNode';

import {TestGraphNodes} from "./../../fixtures/TestGraph";
import {TestGraph} from "../../fixtures/TestGraph";

suite('Problem', function () {

    let graph;

    beforeEach(function () {
        graph = TestGraph;
    });

    suite('#constructor(id)', function () {
        test('should set the properties graph, initialState and goal', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);

            let problem = new Problem(graph, initialState, goal);

            assert.propertyVal(problem, 'graph', graph);
            assert.propertyVal(problem, 'initialState', initialState);
            assert.propertyVal(problem, 'goal', goal);
        });
    });

    suite('#actions(state)', function () {
        test('should return the possible actions for the given state', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);
            let problem = new Problem(graph, initialState, goal);

            assert.sameDeepMembers(problem.actions(new State('A', TestGraphNodes.graphNodeA)), [new Action('B'), new Action('D'), new Action('E')]);
        });
        test('should return undefined the given state does not exists', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);
            let problem = new Problem(graph, initialState, goal);

            assert.sameMembers(problem.actions(new State('Q', TestGraphNodes.graphNodeQ)), []);
        });
    });

    suite('#stepCost(state, action)', function () {
        test('should return 0 if state and action are zero', function () {
            let graph = new Graph();
            let problem = new Problem(graph, null, null);

            assert.equal(problem.stepCost(null, null), 0);
        });
        test('should return the path costs', function () {
            let state = new State('A', TestGraphNodes.graphNodeA);
            let action = new Action('B');
            let problem = new Problem(graph, null, null);

            assert.closeTo(problem.stepCost(state, action), 14.1, 0.5);
        });
    });

    suite('#goalTest(state)', function () {
        test('should return true if given state is the goal', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);
            let graph = new Graph();
            let problem = new Problem(graph, initialState, goal);

            assert.isTrue(problem.goalTest(new State('B', TestGraphNodes.graphNodeB)));
        });
        test('should return false if given state is not the goal', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);
            let graph = new Graph();
            let problem = new Problem(graph, initialState, goal);

            assert.isFalse(problem.goalTest(new State('X', TestGraphNodes.graphNodeX)));
        });
    });

    suite('#result(state, action)', function () {
        test('should return the result for the given state and action ', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);
            let problem = new Problem(graph, initialState, goal);

            assert.deepEqual(problem.result(new State('A', TestGraphNodes.graphNodeA), new Action('B')), new State('B', TestGraphNodes.graphNodeB));
        });
        test('should return undefined for the given state and action if the given state does not exists', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);
            let problem = new Problem(graph, initialState, goal);

            assert.isUndefined(problem.result(new State('Q', TestGraphNodes.graphNodeQ), new Action('B')));
        });
    });

    suite('#findGraphNodeByState(state)', function () {
        test('should returns a GraphNode searched by the given state', function () {
            let initialState = new State('A', TestGraphNodes.graphNodeA);
            let goal = new State('B', TestGraphNodes.graphNodeB);
            let problem = new Problem(graph, initialState, goal);

            assert.deepEqual(problem.findGraphNodeByState(new State('A', TestGraphNodes.graphNodeA)), TestGraphNodes.graphNodeA);
        });
    });
});