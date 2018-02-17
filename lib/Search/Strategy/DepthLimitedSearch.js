import {BaseSearch} from './BaseSearch';
import {LimitException} from './../../Exceptions/LimitException';
import {NoSolutionException} from "../../Exceptions/NoSolutionException";
import {Node} from './../Node';

export class DepthLimitedSearch extends BaseSearch {

    constructor(options) {
        super();
        this.limit = options.limit || 10;
    }

    search(problem) {
        this.initSearch();
        let solution = this.recursiveSearch(new Node(problem.initialState), problem, this.limit);
        if (solution !== undefined) {
            return solution;
        }
        throw new NoSolutionException();
    }

    recursiveSearch(node, problem, limit) {
        let actions;
        this.addExplored(node);

        if (problem.goalTest(node.state)) {
            return node;
        }

        if (limit === 0) {
            throw new LimitException();
        }

        actions = problem.actions(node.state);

        for (let i = 0; i < actions.length; i++) {
            let extendedNode = Node.make(problem, node, actions[i]);
            if (this.nodeExists(extendedNode) === false) {
                let result = this.recursiveSearch(extendedNode, problem, limit - 1);
                if (result === null) {
                    return null;
                }
                if (result !== undefined) {
                    return result;
                }
            }
        }
    }
}