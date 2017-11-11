export class GraphNode {

    constructor(id, point, position) {
        this.id = id;
        this.point = point;
        this.position = position;
        this.childs = [];
    }

    addChildNodes(childNodes) {
        childNodes.forEach((child) => this.addChildNode(child));
    }

    addChildNode(childNode) {
        if (childNode.id !== this.id && this.childs.indexOf(childNode) === -1) {
            this.childs.push(childNode);
        }
    }

    removeChildNode(childNode) {
        if (this.childs.indexOf(childNode) > -1) {
            this.childs.splice(this.childs.indexOf(childNode), 1);
        }
    }
}
