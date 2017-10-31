import {BaseSearch} from "./BaseSearch";
import {Node} from "../Node";

export class BreadthFirstSearch extends BaseSearch {

    search(problem) {
        let node, goal;
        this.initSearch();

        goal = this.addInitial(problem);
        if (goal !== undefined) {
            return goal;
        }

        while (this.frontier.length > 0) {
            node = this.getCurrentNode();
            this.addExploded(node);
            goal = this.extend(problem, node);
            if (goal !== undefined) {
                return goal;
            }
        }
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