export class Node {

    constructor(state) {
        this.parent = null;
        this.action = null;
        this.state = state;
        this.pathCost = 0;
    }

    static make(problem, parent, action) {
        let node;
        node = new Node();
        node.parent = parent;
        node.action = action;
        node.pathCost = node.parent.pathCost + problem.stepCost(parent.state, action);
        node.state = problem.result(parent.state, action);
        return node;
    }

    solution() {
        let node = this,
            path = [];
        while (node) {
            path.push(node);
            node = node.parent;
        }
        return path.reverse();
    }

    solutionGraph() {
        return this.solution().map((node) => node.state.node);
    }
}