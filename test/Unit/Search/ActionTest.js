let assert = require('chai').assert;

import {Action} from './../../../lib/Search/Action';

suite('Action', function () {

    suite('#constructor(id)', function () {
        test('should set the property id', function () {
            let action = new Action('Action ID');
            assert.propertyVal(action, 'id', 'Action ID');
        });
    });

});