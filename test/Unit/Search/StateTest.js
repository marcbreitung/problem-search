let assert = require('chai').assert;

import {GraphNode} from "../../../lib/Graph/GraphNode";
import {Point} from "../../../lib/Graph/Point";
import {State} from './../../../lib/Search/State';

suite('State', function () {

    suite('#constructor(id)', function () {
        test('should set the property id and node', function () {
            let graphNode = new GraphNode('A', new Point(2, 2), new Point(20, 20));
            let state = new State(graphNode);
            assert.propertyVal(state, 'id', 'A');
            assert.deepPropertyVal(state, 'node', graphNode);
        });
    });
    suite('#distance(state)', function () {
        test('should return the distance', function () {
            let stateA = new State(new GraphNode('A', new Point(2, 2), new Point(0, 0)));
            let stateB = new State(new GraphNode('B', new Point(2, 2), new Point(0, 20)));
            assert.equal(stateA.distance(stateB), 20);
        });
    });
});