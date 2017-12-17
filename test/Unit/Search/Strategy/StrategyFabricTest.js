let assert = require('chai').assert;

import {StrategyFabric} from './../../../../lib/Search/Strategy/StrategyFabric';
import {BreadthFirstSearch} from './../../../../lib/Search/Strategy/BreadthFirstSearch';
import {NullSearch} from './../../../../lib/Search/Strategy/NullSearch';

suite('StrategyFabric', function () {

    suite('#registerStrategy(type, Strategy)', function () {
        test('should add a new strategy', function () {
            let strategyFabric = new StrategyFabric();
            strategyFabric.registerStrategy('breadthFirstSearch', BreadthFirstSearch);
            assert.deepEqual(strategyFabric.types, {'breadthFirstSearch': BreadthFirstSearch});
        });
        test('should not add a new strategy without search', function () {
            let strategyFabric = new StrategyFabric();
            strategyFabric.registerStrategy('breadthFirstSearch', BreadthFirstSearch);
            strategyFabric.registerStrategy('novalidstrategy', StrategyFabric);
            assert.deepEqual(strategyFabric.types, {'breadthFirstSearch': BreadthFirstSearch});
        });
    });

    suite('#getStrategy(type)', function () {
        test('should return a new strategy', function () {
            let breadthFirstSearch = new BreadthFirstSearch();
            let strategyFabric = new StrategyFabric();
            strategyFabric.registerStrategy('breadthFirstSearch', BreadthFirstSearch);
            assert.deepEqual(strategyFabric.getStrategy('breadthFirstSearch'), breadthFirstSearch);
        });
        test('should return NullSearch if strategy not exists', function () {
            let nullSearch = new NullSearch();
            let strategyFabric = new StrategyFabric();
            strategyFabric.registerStrategy('breadthFirstSearch', BreadthFirstSearch);
            assert.deepEqual(strategyFabric.getStrategy('unknownSearch'), nullSearch);
        });
    });

});