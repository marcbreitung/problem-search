export class GraphNode {

    constructor(id, point, position) {
        this.id = id;
        this.point = point;
        this.position = position;
        this.childs = [];
    }

    addChildNodes(childs) {
        childs.forEach((child) => this.addChildNode(child));
    }

    addChildNode(child) {
        if (child.id !== this.id && this.childs.indexOf(child) === -1) {
            this.childs.push(child);
        }
    }

    removeChildNode(child) {
        if (this.childs.indexOf(child) > -1) {
            this.childs.splice(this.childs.indexOf(child), 1);
        }
    }
}
