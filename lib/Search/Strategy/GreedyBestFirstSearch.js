import {BaseSearch} from './BaseSearch';
import {NoSolutionException} from "../../Exceptions/NoSolutionException";
import {Node} from './../Node';

export class GreedyBestFirstSearch extends BaseSearch {

    search(problem) {
        let node, goal;
        this.initSearch();

        if (this.initialIsGoal(problem)) {
            return this.getInitial(problem);
        }

        this.addFrontier(this.getInitial(problem));

        while (this.frontier.length > 0) {
            node = this.getCurrentNode(problem);
            if (problem.goalTest(node.state)) {
                goal = node;
                break;
            }
            this.addExplored(node);
            this.extend(problem, node);
        }

        if (goal !== undefined) {
            return goal;
        }

        throw new NoSolutionException();
    }

    getCurrentNode(problem) {
        this.sortFrontier(problem.goal);
        return this.frontier.shift();
    }

    extend(problem, node) {
        let actions = problem.actions(node.state);
        for (let i = 0; i < actions.length; i++) {
            let extendedNode = Node.make(problem, node, actions[i]);
            if (this.nodeExists(extendedNode) === false) {
                this.addFrontier(extendedNode);
            }
            this.updateNodeWithLowerDistanceToGoal(extendedNode, problem.goal);
        }
    }

    updateNodeWithLowerDistanceToGoal(node, goal) {
        let nodeIndex = this.frontier.findIndex(frontier => frontier.state.id === node.state.id && frontier.state.distance(goal) > node.state.distance(goal));
        if (nodeIndex > 0) {
            this.frontier.splice(nodeIndex, 1, node);
            this.sortFrontier(goal);
        }
    }

    sortFrontier(goal) {
        this.frontier = this.frontier.sort((a, b) => a.state.distance(goal) - b.state.distance(goal));
    }
}