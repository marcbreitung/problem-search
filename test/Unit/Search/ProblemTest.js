let assert = require('chai').assert;

import {Problem} from './../../../lib/Search/Problem';

import {Action} from "../../../lib/Search/Action";
import {Point} from "../../../lib/Graph/Point";
import {State} from './../../../lib/Search/State';
import {Graph} from './../../../lib/Graph/Graph';
import {GraphNode} from './../../../lib/Graph/GraphNode';

suite('Problem', function () {

    suite('#constructor(id)', function () {
        test('should set the properties graph, initialState and goal', function () {

            let graph = new Graph();
            let initialState = new State('A');
            let goal = new State('B');

            let problem = new Problem(graph, initialState, goal);

            assert.propertyVal(problem, 'graph', graph);
            assert.propertyVal(problem, 'initialState', initialState);
            assert.propertyVal(problem, 'goal', goal);
        });
    });

    suite('#actions(state)', function () {
        test('should return the possible actions for the given state', function () {
            let initialState = new State('A');
            let goal = new State('B');
            let graph = new Graph();
            let nodeA = new GraphNode('A', null, null);
            let nodeB = new GraphNode('B', null, null);
            let nodeC = new GraphNode('C', null, null);

            nodeA.addChildNodes([nodeB, nodeC]);
            graph.addNode(nodeA);

            let problem = new Problem(graph, initialState, goal);
            assert.sameDeepMembers(problem.actions(new State('A')), [new Action('B'), new Action('C')]);
        });
        test('should return undefined the given state does not exists', function () {

            let initialState = new State('A');
            let goal = new State('B');
            let graph = new Graph();

            let nodeA = new GraphNode('A', null, null);
            let nodeB = new GraphNode('B', null, null);
            let nodeC = new GraphNode('C', null, null);

            nodeA.addChildNodes([nodeB, nodeC]);

            graph.addNode(nodeA);

            let problem = new Problem(graph, initialState, goal);

            assert.sameMembers(problem.actions(new State('X')), []);

        });
    });

    suite('#stepCost(state, action)', function () {
        test('should return 0 if state and action are zero', function () {
            let graph = new Graph();
            let problem = new Problem(graph, null, null);

            assert.equal(problem.stepCost(null, null), 0);
        });
        test('should return the path costs', function () {
            let state = new State('State');
            let action = new Action('Action');

            let graph = new Graph();
            let nodeState = new GraphNode('State', null, new Point(0, 0));
            let nodeAction = new GraphNode('Action', null, new Point(0, 100));

            graph.addNode(nodeState);
            graph.addNode(nodeAction);

            let problem = new Problem(graph, null, null);
            assert.equal(problem.stepCost(state, action), 100);
        });
    });

    suite('#stateData(state, property)', function () {
        test('should return null if state and property are not defined', function () {
            let graph = new Graph();
            let problem = new Problem(graph, null, null);

            assert.isNull(problem.stateData(null, null));
        });
        test('should return the state property', function () {
            let state = new State('State');

            let graph = new Graph();
            let nodeState = new GraphNode('State', null, new Point(0, 0));

            graph.addNode(nodeState);

            let problem = new Problem(graph, null, null);
            assert.deepEqual(problem.stateData(state, 'position'), new Point(0, 0));
        });
        test('should return null if property not exists', function () {
            let state = new State('State');

            let graph = new Graph();
            let nodeState = new GraphNode('State', null, new Point(0, 0));

            graph.addNode(nodeState);

            let problem = new Problem(graph, null, null);
            assert.isNull(problem.stateData(state, 'velocity'));
        });
    });

    suite('#goalTest(state)', function () {
        test('should return true if given state is the goal', function () {
            let initialState = new State('A');
            let goal = new State('B');
            let graph = new Graph();
            let problem = new Problem(graph, initialState, goal);
            assert.isTrue(problem.goalTest(new State('B')));
        });

        test('should return false if given state is not the goal', function () {
            let initialState = new State('A');
            let goal = new State('B');
            let graph = new Graph();
            let problem = new Problem(graph, initialState, goal);
            assert.isFalse(problem.goalTest(new State('X')));
        });
    });

    suite('#result(state, action)', function () {
        test('should return the result for the given state and action ', function () {
            let initialState = new State('A');
            let goal = new State('B');
            let graph = new Graph();
            let nodeA = new GraphNode('A', null, null);
            let nodeB = new GraphNode('B', null, null);
            let nodeC = new GraphNode('C', null, null);

            nodeA.addChildNodes([nodeB, nodeC]);
            graph.addNode(nodeA);

            let problem = new Problem(graph, initialState, goal);

            assert.deepEqual(problem.result(new State('A'), new Action('B')), new State('B'));

        });
        test('should return undefined for the given state and action if the given state does not exists', function () {
            let initialState = new State('A');
            let goal = new State('B');
            let graph = new Graph();
            let nodeA = new GraphNode('A', null, null);
            let nodeB = new GraphNode('B', null, null);
            let nodeC = new GraphNode('C', null, null);

            nodeA.addChildNodes([nodeB, nodeC]);
            graph.addNode(nodeA);

            let problem = new Problem(graph, initialState, goal);

            assert.isUndefined(problem.result(new State('X'), new Action('B')));

        });
    });

    suite('#findGraphNodeByState(state)', function () {
        test('should returns a GraphNode searched by the given state', function () {
            let initialState = new State('A');
            let goal = new State('B');
            let graph = new Graph();
            let nodeA = new GraphNode('A', null, null);
            let nodeB = new GraphNode('B', null, null);
            let nodeC = new GraphNode('C', null, null);

            graph.addNode(nodeA);
            graph.addNode(nodeB);
            graph.addNode(nodeC);

            let problem = new Problem(graph, initialState, goal);

            assert.deepEqual(problem.findGraphNodeByState(new State('A')), nodeA);

        });
    });

});