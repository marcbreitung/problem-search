let assert = require('chai').assert;

import {State} from './../../../lib/Search/State';

suite('State', function () {

    suite('#constructor(id)', function () {
        test('should set the property id', function () {
            let state = new State('State ID');
            assert.propertyVal(state, 'id', 'State ID');
        });
    });

});