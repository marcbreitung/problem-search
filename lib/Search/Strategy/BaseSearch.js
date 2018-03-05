import {Node} from './../Node';

export class BaseSearch {

    constructor() {
        this.initSearch();
    }

    initSearch() {
        this.frontier = [];
        this.explored = [];
    }

    /**
     * Returns the initial state as node if it is the goal,
     * otherwise adds the node to the frontier array.
     * @param {Problem} problem The search problem.
     * @returns {(Node|void)} The initial state as a node.
     */
    addInitial(problem) {
        if (this.initialIsGoal(problem)) {
            return this.getInitial(problem);
        }
        this.frontier.push(this.getInitial(problem));
    }

    /**
     * Returns the initial state as a node.
     * @param {Problem} problem The search problem.
     * @returns {Node} The initial state as a node.
     */
    getInitial(problem) {
        return new Node(problem.initialState);
    }

    /**
     * Checks if the initial state is the goal.
     * @param {Problem} problem The search problem.
     * @returns {boolean} True if the initial state is the goal.
     */
    initialIsGoal(problem) {
        return problem.goalTest(this.getInitial(problem).state);
    }

    /**
     * Adds the the given node to the frontier array, if the node not already exists.
     * @param {Node} node The node to add to the frontier array.
     * @returns {void}
     */
    addFrontier(node) {
        if (this.nodeExistsInFrontier(node) === false) {
            this.frontier.push(node);
        }
    }

    /**
     * Adds the the given node to the explored array, if the node not already exists.
     * @param {Node} node The node to add to the explored array.
     * @returns {void}
     */
    addExplored(node) {
        if (this.nodeExistsInExplored(node) === false) {
            this.explored.push(node);
        }
    }

    /**
     * Checks if the given node exists in the frontier or explored array.
     * @param {Node} node The node to find in the arrays.
     * @returns {boolean} True if the node exists in the frontier or explored array.
     */
    nodeExists(node) {
        return this.nodeExistsInFrontier(node) || this.nodeExistsInExplored(node);
    }

    /**
     * Checks if the given node exists in the explored array.
     * @param {Node} node The node to find in the array.
     * @returns {boolean} True if the node exists in the frontier array.
     */
    nodeExistsInFrontier(node) {
        return this.frontier.find((frontier) => frontier.state.id === node.state.id) !== undefined;
    }

    /**
     * Checks if the given node exists in the explored array.
     * @param {Node} node The node to find in the array.
     * @returns {boolean} True if the node exists in the explored array.
     */
    nodeExistsInExplored(node) {
        return this.explored.find((explored) => explored.state.id === node.state.id) !== undefined;
    }
}