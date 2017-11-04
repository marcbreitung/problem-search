let assert = require('chai').assert;

import {GraphNode} from './../../../lib/Graph/GraphNode';

import {Point} from './../../../lib/Graph/Point';

suite('GraphNode', function () {

    suite('#constructor(id)', function () {
        test('should initialize empty connections array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            assert.sameMembers(graphNode.connections, []);
        });
        test('should set property id', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            assert.propertyVal(graphNode, 'id', 'Graph Node ID');
        });
        test('should set property point', function () {
            let point = new Point(1, 2);
            let graphNode = new GraphNode('Graph Node ID', point, null);
            assert.propertyVal(graphNode, 'point', point);
        });
        test('should set property position', function () {
            let position = new Point(1, 2);
            let graphNode = new GraphNode('Graph Node ID', null, position);
            assert.propertyVal(graphNode, 'position', position);
        });
    });

    suite('#addConnection(connection)', function () {
        test('should add the given connection to the connections array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let connection = new GraphNode('Connection', null, null);
            graphNode.addConnection(connection);
            assert.sameMembers(graphNode.connections, [connection]);
        });
        test('should add the given connection to the connections array if the array does not has the given connection', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let connection = new GraphNode('Connection', null, null);
            graphNode.addConnection(connection);
            assert.sameMembers(graphNode.connections, [connection]);
            graphNode.addConnection(connection);
            assert.sameMembers(graphNode.connections, [connection]);
        });
        test('should add the given connections to the connections array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let connectionA = new GraphNode('Connection A', null, null);
            let connectionB = new GraphNode('Connection B', null, null);
            graphNode.addConnections([connectionA, connectionB]);
            assert.sameMembers(graphNode.connections, [connectionA, connectionB]);
        });
    });

    suite('#removeConnection(connection)', function () {
        test('should remove the given connection to the connections array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let connection = new GraphNode('Connection', null, null);
            graphNode.addConnection(connection);
            assert.sameMembers(graphNode.connections, [connection]);

            graphNode.removeConnection(connection);
            assert.sameMembers(graphNode.connections, []);
        });
        test('should does not remove connection if does not exists', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let connectionA = new GraphNode('Connection A', null, null);
            let connectionB = new GraphNode('Connection B', null, null);

            graphNode.addConnection(connectionA);
            assert.sameMembers(graphNode.connections, [connectionA]);

            graphNode.removeConnection(connectionB);
            assert.sameMembers(graphNode.connections, [connectionA]);
        });
    });

});