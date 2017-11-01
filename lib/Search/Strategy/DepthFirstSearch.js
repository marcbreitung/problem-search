import {BaseSearch} from './BaseSearch';
import {Node} from './../Node';

export class DepthFirstSearch extends BaseSearch {

    search(problem) {
        this.initSearch();
        return this.recursiveSearch(new Node(problem.initialState), problem);
    }

    recursiveSearch(node, problem) {

        if (problem.goalTest(node.state)) {
            return node;
        }

        this.addExplored(node);

        let actions = problem.actions(node.state);

        for (let i = 0; i < actions.length; i++) {
            let extendedNode = Node.make(problem, node, actions[i]);
            if (this.nodeExistsInExplored(extendedNode) === false) {
                let result = this.recursiveSearch(extendedNode, problem);
                if (result !== undefined) {
                    return result;
                }
            }
        }
    }
}