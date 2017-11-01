import {Node} from './../Node';

export class BaseSearch {

    constructor() {
        this.initSearch();
    }

    initSearch() {
        this.frontier = [];
        this.explored = [];
    }

    addInitial(problem) {
        let initialNode = new Node(problem.initialState);
        if (problem.goalTest(initialNode.state)) {
            return initialNode;
        }
        this.frontier.push(new Node(problem.initialState));
    }

    addFrontier(node) {
        if (this.nodeExistsInFrontier(node) === false) {
            this.frontier.push(node);
        }
    }

    addExplored(node) {
        if (this.nodeExistsInExplored(node) === false) {
            this.explored.push(node);
        }
    }

    nodeExists(node) {
        return this.nodeExistsInFrontier(node) && this.nodeExistsInExplored(node);
    }

    nodeExistsInFrontier(node) {
        return this.frontier.find((frontier) => frontier.state.id === node.state.id) !== undefined;
    }

    nodeExistsInExplored(node) {
        return this.explored.find((explored) => explored.state.id === node.state.id) !== undefined;
    }
}