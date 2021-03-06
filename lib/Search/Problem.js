import {Action} from './Action';
import {State} from './State';

export class Problem {

    /**
     * @param {Graph} graph The problem graph
     * @param {State} initialState The initial state
     * @param {State} goal The goal
     */
    constructor(graph, initialState, goal) {
        this.graph = graph;
        this.initialState = initialState;
        this.goal = goal;
    }

    /**
     * List all possible actions for the given state.
     * @param {State} state The current state.
     * @returns {Array<Action>} Array with actions.
     */
    actions(state) {
        let node = this.graph.nodes.find((node) => node.id === state.id);
        if (node) {
            return node.childs.map(node => new Action(node.id));
        }
        return [];
    }

    /**
     * Returns the steps costs generated by the given state and action.
     * @param {State} state The current state.
     * @param {Action} action The current action.
     * @returns {int} The steps costs.
     */
    stepCost(state, action) {
        if (state !== null && action !== null) {
            let actionNode = this.graph.nodes.find((node) => node.id === action.id);
            return state.node.position.distance(actionNode.position);
        }
        return 0;
    }

    /**
     * Checks if the given state is the goal.
     * @param {State} goal The state to test.
     * @returns {boolean} True if the given state is the goal.
     */
    goalTest(goal) {
        return goal.id === this.goal.id;
    }

    /**
     * Returns the new state generated by the given state and action.
     * @param {State} state The current state.
     * @param {Action} action The current action.
     * @returns {State} state The new State.
     */
    result(state, action) {
        let currentAction = this.actions(state).find(node => node.id === action.id);
        if (currentAction) {
            let node = this.graph.nodes.find((node) => node.id === currentAction.id);
            return new State(node);
        }
    }
}