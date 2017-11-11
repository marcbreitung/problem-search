let assert = require('chai').assert;

import {GraphNode} from './../../../lib/Graph/GraphNode';

import {Point} from './../../../lib/Graph/Point';

suite('GraphNode', function () {

    suite('#constructor(id)', function () {
        test('should initialize empty childs array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            assert.sameMembers(graphNode.childs, []);
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

    suite('#addChildNode(child)', function () {
        test('should add the given child to the childs array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let child = new GraphNode('child', null, null);
            graphNode.addChildNode(child);
            assert.sameMembers(graphNode.childs, [child]);
        });
        test('should add the given child to the childs array if the array does not has the given child', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let child = new GraphNode('child', null, null);
            graphNode.addChildNode(child);
            assert.sameMembers(graphNode.childs, [child]);
            graphNode.addChildNode(child);
            assert.sameMembers(graphNode.childs, [child]);
        });
        test('should add the given childs to the childs array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let childA = new GraphNode('child A', null, null);
            let childB = new GraphNode('child B', null, null);
            graphNode.addChildNodes([childA, childB]);
            assert.sameMembers(graphNode.childs, [childA, childB]);
        });
    });

    suite('#removeChildNode(child)', function () {
        test('should remove the given child to the childs array', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let child = new GraphNode('child', null, null);
            graphNode.addChildNode(child);
            assert.sameMembers(graphNode.childs, [child]);

            graphNode.removeChildNode(child);
            assert.sameMembers(graphNode.childs, []);
        });
        test('should does not remove child if does not exists', function () {
            let graphNode = new GraphNode('Graph Node ID', null, null);
            let childA = new GraphNode('child A', null, null);
            let childB = new GraphNode('child B', null, null);

            graphNode.addChildNode(childA);
            assert.sameMembers(graphNode.childs, [childA]);

            graphNode.removeChildNode(childB);
            assert.sameMembers(graphNode.childs, [childA]);
        });
    });

});