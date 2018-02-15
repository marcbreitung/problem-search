import {Node} from './../Node';

export class BaseSearch {

    constructor() {
        this.initSearch();
    }

    initSearch() {
        this.frontier = [];
        this.explored = [];
    }

    getInitial(problem) {
        return new Node(problem.initialState);
    }

    initialIsGoal(problem) {
        return problem.goalTest(this.getInitial(problem).state);
    }

    addInitial(problem) {
        if (this.initialIsGoal(problem)) {
            return this.getInitial(problem);
        }
        this.frontier.push(this.getInitial(problem));
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