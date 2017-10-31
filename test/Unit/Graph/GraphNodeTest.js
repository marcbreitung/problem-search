let assert = require('chai').assert;

import {GraphNode} from './../../../lib/Graph/GraphNode';

import {Point} from './../../../lib/Graph/Point';

describe('GraphNode', function () {

    describe('#constructor(id)', function () {
        it('should initialize empty connections array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            assert.sameMembers(graphNode.connections, []);
        });
        it('should set property id', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            assert.propertyVal(graphNode, 'id', 'Graph Node ID');
        });
        it('should set property point', function () {
            let point = new Point(1, 2);
            let graphNode = new GraphNode('Graph Node ID', point, null);
            assert.propertyVal(graphNode, 'point', point);
        });
        it('should set property position', function () {
            let position = new Point(1, 2);
            let graphNode = new GraphNode('Graph Node ID', null, position);
            assert.propertyVal(graphNode, 'position', position);
        });
    });

    describe('#addConnection(connection)', function () {
        it('should add the given connection to the connections array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let connection = new GraphNode('Connection', null, null);
            graphNode.addConnection(connection);
            assert.sameMembers(graphNode.connections, [connection]);
        });
        it('should add the given connection to the connections array if the array does not has the given connection', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let connection = new GraphNode('Connection', null, null);
            graphNode.addConnection(connection);
            assert.sameMembers(graphNode.connections, [connection]);
            graphNode.addConnection(connection);
            assert.sameMembers(graphNode.connections, [connection]);
        });
        it('should add the given connections to the connections array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let connectionA = new GraphNode('Connection A', null, null);
            let connectionB = new GraphNode('Connection B', null, null);
            graphNode.addConnections([connectionA, connectionB]);
            assert.sameMembers(graphNode.connections, [connectionA, connectionB]);
        });
    });

    describe('#removeConnection(connection)', function () {
        it('should remove the given connection to the connections array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let connection = new GraphNode('Connection', null, null);
            graphNode.addConnection(connection);
            assert.sameMembers(graphNode.connections, [connection]);

            graphNode.removeConnection(connection);
            assert.sameMembers(graphNode.connections, []);
        });
        it('should does not remove connection if does not exists', function () {
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