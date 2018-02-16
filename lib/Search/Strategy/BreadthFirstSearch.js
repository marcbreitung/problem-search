import {BaseSearch} from './BaseSearch';
import {Node} from '../Node';
import {NoSolutionException} from '../../Exceptions/NoSolutionException';

export class BreadthFirstSearch extends BaseSearch {

    search(problem) {
        let node, extend;

        this.initSearch();

        if (this.initialIsGoal(problem)) {
            return this.getInitial(problem);
        }

        this.addFrontier(this.getInitial(problem));

        while (this.frontier.length > 0) {
            node = this.getCurrentNode();
            this.addExplored(node);
            extend = this.extend(problem, node);
            if (extend !== undefined) {
                break;
            }
        }

        if (extend !== undefined) {
            return extend;
        }

        throw new NoSolutionException();
    }

    getCurrentNode() {
        return this.frontier.shift();
    }

    extend(problem, node) {
        let actions = problem.actions(node.state);
        for (let i = 0; i < actions.length; i++) {
            let extendedNode = Node.make(problem, node, actions[i]);
            if (this.nodeExists(extendedNode) === false) {
                if (problem.goalTest(extendedNode.state)) {
                    return extendedNode;
                }
                this.addFrontier(extendedNode);
            }
        }
    }
}