import {Action} from "./Action";
import {State} from "./State";

export class Problem {

    constructor(graph, initialState, goal) {
        this.graph = graph;
        this.initialState = initialState;
        this.goal = goal;
    }

    actions(state) {
        let node = this.graph.nodes.find((node) => node.id === state.id);
        if (node) {
            return node.connections.map(node => new Action(node.id));
        }
        return [];
    }

    stepCost(state, action) {
        if (state !== null && action !== null) {
            let stateNode = this.graph.nodes.find((node) => node.id === state.id),
                actionNode = this.graph.nodes.find((node) => node.id === action.id);
            return stateNode.position.distance(actionNode.position);
        }
        return 0;
    }

    goalTest(goal) {
        return goal.id === this.goal.id;
    }

    result(state, action) {
        let currentAction = this.actions(state).find(node => node.id === action.id);
        if (currentAction) {
            return new State(currentAction.id);
        }
    }

    findGraphNodeByState(state) {
        return this.graph.nodes.find((node) => node.id === state.id);
    }

}