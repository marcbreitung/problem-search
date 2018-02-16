import {BaseSearch} from './BaseSearch';
import {Node} from './../Node';
import {NoSolutionException} from "../../Exceptions/NoSolutionException";

export class UniformCostSearch extends BaseSearch {

    search(problem) {
        let node, goal;

        this.initSearch();

        if (this.initialIsGoal(problem)) {
            return this.getInitial(problem);
        }

        this.addFrontier(this.getInitial(problem));

        while (this.frontier.length > 0) {
            node = this.getCurrentNode();
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

    getCurrentNode() {
        this.sortFrontier();
        return this.frontier.shift();
    }

    extend(problem, node) {
        let actions = problem.actions(node.state);
        for (let i = 0; i < actions.length; i++) {
            let extendedNode = Node.make(problem, node, actions[i]);
            if (this.nodeExists(extendedNode) === false) {
                this.addFrontier(extendedNode);
            }
            this.updateNodeWithHigherPathCost(extendedNode);
        }
    }

    updateNodeWithHigherPathCost(node) {
        let nodeIndex = this.frontier.findIndex((frontier) => frontier.state.id === node.state.id && frontier.pathCost > node.pathCost);
        if (nodeIndex > 0) {
            this.frontier.splice(nodeIndex, 1, node);
            this.sortFrontier();
        }
    }

    sortFrontier() {
        this.frontier = this.frontier.sort((a, b) => a.pathCost - b.pathCost);
    }
}