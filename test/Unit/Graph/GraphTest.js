let assert = require('chai').assert;

import {Graph} from './../../../lib/Graph/Graph';

import {GraphNode} from './../../../lib/Graph/GraphNode';

suite('Graph', function () {

    suite('#constructor()', function () {
        test('should initialize empty node array', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);
        });
    });

    suite('#addNode(node)', function () {
        test('should add the given node to the nodes array', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);

            let graphNode = new GraphNode('Id 1', null, null);
            graph.addNode(graphNode);
            assert.sameMembers(graph.nodes, [graphNode]);
        });
        test('should not add the given node to the nodes array if node already exists', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);

            let graphNode = new GraphNode('Id 1', null, null);
            graph.addNode(graphNode);
            graph.addNode(graphNode);
            assert.sameMembers(graph.nodes, [graphNode]);
        });
    });

    suite('#addNodes(nodes)', function () {
        test('should add the given nodes to the nodes array', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);

            let graphNodeA = new GraphNode('Id A', null, null);
            let graphNodeB = new GraphNode('Id B', null, null);
            let graphNodeC = new GraphNode('Id C', null, null);
            graph.addNodes([graphNodeA, graphNodeB, graphNodeC]);

            assert.sameMembers(graph.nodes, [graphNodeA, graphNodeB, graphNodeC]);
        });
        test('should not add the given nodes to the nodes array if node already exists', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);

            let graphNodeA = new GraphNode('Id A', null, null);
            let graphNodeB = new GraphNode('Id B', null, null);
            let graphNodeC = new GraphNode('Id C', null, null);
            graph.addNodes([graphNodeA, graphNodeB, graphNodeC]);
            graph.addNodes([graphNodeA, graphNodeB, graphNodeC]);

            assert.sameMembers(graph.nodes, [graphNodeA, graphNodeB, graphNodeC]);
        });
    });

    suite('#removeNode(node)', function () {
        test('should remove the given node from the nodes array', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);

            let graphNode = new GraphNode('Id 1', null, null);
            graph.addNode(graphNode);
            assert.sameMembers(graph.nodes, [graphNode]);

            graph.removeNode(graphNode);
            assert.sameMembers(graph.nodes, []);
        });
        test('should remove the given node from the nodes array if node does not exists', function () {
            let graph = new Graph();
            let graphNodeA = new GraphNode('Id A', null, null);
            let graphNodeB = new GraphNode('Id B', null, null);
            graph.addNode(graphNodeA);
            graph.removeNode(graphNodeB);
            assert.sameMembers(graph.nodes, [graphNodeA]);
        });
    });

    suite('#findByNode(node)', function () {
        test('should return the given node if the nodes is in the array', function () {
            let graph = new Graph();
            let graphNode = new GraphNode('Id 1', null, null);
            graph.addNode(graphNode);
            assert.equal(graph.findByNode(graphNode), graphNode);
        });
        test('should return undefined if the nodes is not in the array', function () {
            let graph = new Graph();
            let graphNode = new GraphNode('Id 1', null, null);
            assert.equal(graph.findByNode(graphNode), undefined);
        });
    });

});