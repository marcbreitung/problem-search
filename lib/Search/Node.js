export class Node {

    constructor(state) {
        this.parent = null;
        this.action = null;
        this.problem = null;
        this.state = state;
        this.pathCost = 0;
    }

    static make(problem, parent, action) {
        let node;
        node = new Node();
        node.parent = parent;
        node.parent.problem = problem;
        node.action = action;
        node.pathCost = node.parent.pathCost + problem.stepCost(parent.state, action);
        node.state = problem.result(parent.state, action);
        node.problem = problem;
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
        return this.solution().map((node) => {
            if (node.state.node) {
                return node.state.node;
            }
            return this.problem.findGraphNodeByState(node.state);
        });
    }
}