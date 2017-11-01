import {BaseSearch} from './BaseSearch';
import {Node} from './../Node';

export class UniformCostSearch extends BaseSearch {

    search(problem) {
        let node, goal;

        this.initSearch();
        goal = this.addInitial(problem);
        if (goal !== undefined) {
            return goal;
        }

        while (this.frontier.length > 0) {
            node = this.getCurrentNode();
            if (problem.goalTest(node.state)) {
                return node;
            }
            this.addExplored(node);
            this.extend(problem, node);
        }
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