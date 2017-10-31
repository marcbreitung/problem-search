let assert = require('chai').assert;

import {Point} from './../../../lib/Graph/Point';

describe('Point', function () {

    describe('#constructor(x, y)', function () {
        it('should set x, y attributes', function () {
            let point = new Point(10, 20);
            assert.propertyVal(point, 'x', 10);
            assert.propertyVal(point, 'y', 20);
        });
    });

    describe('#distance(point)', function () {
        it('should return distance between to points', function () {
            let pointA = new Point(10, 20);
            let pointB = new Point(50, 40);
            assert.closeTo(pointA.distance(pointB), 44.72135955, 0.5);
        });
    });

});