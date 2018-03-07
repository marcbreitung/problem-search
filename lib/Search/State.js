export class State {

    constructor(node) {
        this.id = node.id;
        this.node = node;
    }

    distance(state) {
        return this.node.position.distance(state.node.position);
    }
}
