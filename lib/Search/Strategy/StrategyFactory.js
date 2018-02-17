import {NullSearch} from "./NullSearch";

export class StrategyFactory {

    constructor() {
        this.types = {};
    }

    getStrategy(type, options) {
        if (this.types[type]) {
            return new this.types[type](options);
        }
        return new NullSearch();
    }

    registerStrategy(type, Strategy) {
        let proto = Strategy.prototype;
        if (proto.search) {
            this.types[type] = Strategy;
        }
    }
}
