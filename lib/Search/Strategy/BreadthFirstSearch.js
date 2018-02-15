import {BaseSearch} from './BaseSearch';
import {Node} from '../Node';

export class BreadthFirstSearch extends BaseSearch {

    search(problem) {
        let node, goal;
        this.initSearch();

        if (this.initialIsGoal(problem)) {
            return this.getInitial(problem);
        }

        this.addFrontier(this.getInitial(problem));

        while (this.frontier.length > 0) {
            node = this.getCurrentNode();
            this.addExplored(node);
            goal = this.extend(problem, node);
            if (goal !== undefined) {
                break;
            }
        }

        if (goal !== undefined) {
            return goal;
        }

        throw new Error('no_solution');
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