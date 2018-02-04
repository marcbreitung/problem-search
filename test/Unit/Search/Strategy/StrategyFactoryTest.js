let assert = require('chai').assert;

import {StrategyFactory} from './../../../../lib/Search/Strategy/StrategyFactory';
import {BreadthFirstSearch} from './../../../../lib/Search/Strategy/BreadthFirstSearch';
import {NullSearch} from './../../../../lib/Search/Strategy/NullSearch';

suite('StrategyFactory', function () {

    suite('#registerStrategy(type, Strategy)', function () {
        test('should add a new strategy', function () {
            let strategyFactory = new StrategyFactory();
            strategyFactory.registerStrategy('breadthFirstSearch', BreadthFirstSearch);
            assert.deepEqual(strategyFactory.types, {'breadthFirstSearch': BreadthFirstSearch});
        });
        test('should not add a new strategy without search', function () {
            let strategyFactory = new StrategyFactory();
            strategyFactory.registerStrategy('breadthFirstSearch', BreadthFirstSearch);
            strategyFactory.registerStrategy('novalidstrategy', StrategyFactory);
            assert.deepEqual(strategyFactory.types, {'breadthFirstSearch': BreadthFirstSearch});
        });
    });

    suite('#getStrategy(type)', function () {
        test('should return a new strategy', function () {
            let breadthFirstSearch = new BreadthFirstSearch();
            let strategyFactory = new StrategyFactory();
            strategyFactory.registerStrategy('breadthFirstSearch', BreadthFirstSearch);
            assert.deepEqual(strategyFactory.getStrategy('breadthFirstSearch'), breadthFirstSearch);
        });
        test('should return NullSearch if strategy not exists', function () {
            let nullSearch = new NullSearch();
            let strategyFactory = new StrategyFactory();
            strategyFactory.registerStrategy('breadthFirstSearch', BreadthFirstSearch);
            assert.deepEqual(strategyFactory.getStrategy('unknownSearch'), nullSearch);
        });
    });

});