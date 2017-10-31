let assert = require('chai').assert;

import {Action} from './../../../lib/Search/Action';

describe('Action', function () {

    describe('#constructor(id)', function () {
        it('should set the property id', function () {
            let action = new Action('Action ID');
            assert.propertyVal(action, 'id', 'Action ID');
        });
    });

});