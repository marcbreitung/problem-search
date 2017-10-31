let assert = require('chai').assert;

import {Graph} from './../../../lib/Graph/Graph';

import {GraphNode} from './../../../lib/Graph/GraphNode';

describe('Graph', function () {

    describe('#constructor()', function () {
        it('should initialize empty node array', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);
        });
    });

    describe('#addNode(node)', function () {
        it('should add the given node to the nodes array', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);

            let graphNode = new GraphNode('Id 1', null, null);
            graph.addNode(graphNode);
            assert.sameMembers(graph.nodes, [graphNode]);
        });
        it('should not add the given node to the nodes array if node already exists', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);

            let graphNode = new GraphNode('Id 1', null, null);
            graph.addNode(graphNode);
            graph.addNode(graphNode);
            assert.sameMembers(graph.nodes, [graphNode]);
        });
    });

    describe('#removeNode(node)', function () {
        it('should remove the given node from the nodes array', function () {
            let graph = new Graph();
            assert.sameMembers(graph.nodes, []);

            let graphNode = new GraphNode('Id 1', null, null);
            graph.addNode(graphNode);
            assert.sameMembers(graph.nodes, [graphNode]);

            graph.removeNode(graphNode);
            assert.sameMembers(graph.nodes, []);
        });
        it('should remove the given node from the nodes array if node does not exists', function () {
            let graph = new Graph();
            let graphNodeA = new GraphNode('Id A', null, null);
            let graphNodeB = new GraphNode('Id B', null, null);
            graph.addNode(graphNodeA);
            graph.removeNode(graphNodeB);
            assert.sameMembers(graph.nodes, [graphNodeA]);
        });
    });

    describe('#findByNode(node)', function () {
        it('should return the given node if the nodes is in the array', function () {
            let graph = new Graph();
            let graphNode = new GraphNode('Id 1', null, null);
            graph.addNode(graphNode);
            assert.equal(graph.findByNode(graphNode), graphNode);
        });
        it('should return undefined if the nodes is not in the array', function () {
            let graph = new Graph();
            let graphNode = new GraphNode('Id 1', null, null);
            assert.equal(graph.findByNode(graphNode), undefined);
        });
    });

});