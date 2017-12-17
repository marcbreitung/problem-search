let assert = require('chai').assert;

import {NullSearch} from './../../../../lib/Search/Strategy/NullSearch';

suite('NullSearch', function () {

    suite('#search(problem)', function () {
        test('should set attribute problem', function () {
            let nullSearch = new NullSearch();
            nullSearch.search({'problem': 'test'});
            assert.deepEqual(nullSearch.problem, {'problem': 'test'});
        });
    });

});