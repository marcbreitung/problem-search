import {BaseSearch} from './BaseSearch';
import {Node} from './../Node';
import {LimitException} from './../../Exceptions/LimitException';

export class DepthLimitedFirstSearch extends BaseSearch {

    search(problem) {
        this.initSearch();
        return this.recursiveSearch(new Node(problem.initialState), problem, 2);
    }

    recursiveSearch(node, problem, limit) {

        this.addExploded(node);

        if (problem.goalTest(node.state)) {
            return node;
        }

        if (limit === 0) {
            throw new LimitException('Limit is 0');
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
    }
}