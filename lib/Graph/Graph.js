export class Graph {

    constructor() {
        this.nodes = [];
    }

    addNode(node) {
        if (this.nodes.indexOf(node) === -1) {
            this.nodes.push(node);
        }
    }

    removeNode(node) {
        if (this.nodes.indexOf(node) > -1) {
            this.nodes.splice(this.nodes.indexOf(node), 1);
        }
    }

    findByNode(node) {
        if (this.nodes.indexOf(node) > -1) {
            return this.nodes[this.nodes.indexOf(node)];
        }
    }
}