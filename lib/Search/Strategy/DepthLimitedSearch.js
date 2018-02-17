import {BaseSearch} from './BaseSearch';
import {LimitException} from './../../Exceptions/LimitException';
import {NoSolutionException} from "../../Exceptions/NoSolutionException";
import {Node} from './../Node';

export class DepthLimitedSearch extends BaseSearch {

    constructor(options) {
        super();
        this.depthLimit = options.depthLimit || 10;
    }

    search(problem) {
        this.initSearch();
        let solution = this.recursiveSearch(new Node(problem.initialState), problem);
        if (solution !== undefined) {
            return solution;
        }
        throw new NoSolutionException();
    }

    recursiveSearch(node, problem) {

        this.addExplored(node);

        if (problem.goalTest(node.state)) {
            return node;
        }

        if (this.depthLimit === 0) {
            throw new LimitException();
        }

        let actions = problem.actions(node.state);
        for (let i = 0; i < actions.length; i++) {
            let extendedNode = Node.make(problem, node, actions[i]);
            if (this.nodeExists(extendedNode) === false) {
                this.depthLimit -= 1;
                let result = this.recursiveSearch(extendedNode, problem);
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