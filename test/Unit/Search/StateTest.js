let assert = require('chai').assert;

import {State} from './../../../lib/Search/State';

describe('State', function () {

    describe('#constructor(id)', function () {
        it('should set the property id', function () {
            let state = new State('State ID');
            assert.propertyVal(state, 'id', 'State ID');
        });
    });

});