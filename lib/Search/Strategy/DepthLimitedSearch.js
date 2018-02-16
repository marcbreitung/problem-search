import {BaseSearch} from './BaseSearch';
import {Node} from './../Node';
import {LimitException} from './../../Exceptions/LimitException';
import {NoSolutionException} from "../../Exceptions/NoSolutionException";

export class DepthLimitedSearch extends BaseSearch {

    constructor(depthLimit) {
        super();
        this.depthLimit = depthLimit;
    }

    search(problem) {
        this.initSearch();
        return this.recursiveSearch(new Node(problem.initialState), problem, this.depthLimit);
    }

    recursiveSearch(node, problem, limit) {
        let result;

        this.addExplored(node);

        if (problem.goalTest(node.state)) {
            return node;
        }

        if (limit === 0) {
            throw new LimitException();
        }

        let actions = problem.actions(node.state);

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

        if (result !== undefined) {
            return result;
        }

        throw new NoSolutionException();
    }
}