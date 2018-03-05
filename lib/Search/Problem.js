import {Action} from './Action';
import {State} from './State';

export class Problem {

    constructor(graph, initialState, goal) {
        this.graph = graph;
        this.initialState = initialState;
        this.goal = goal;
    }

    actions(state) {
        let node = this.graph.nodes.find((node) => node.id === state.id);
        if (node) {
            return node.childs.map(node => new Action(node.id));
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
            let node = this.graph.nodes.find((node) => node.id === currentAction.id);
            return new State(currentAction.id, node);
        }
    }

    findGraphNodeByState(state) {
        return this.graph.nodes.find((node) => node.id === state.id);
    }

}