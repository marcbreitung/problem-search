export class GraphNode {

    constructor(id, point, position) {
        this.id = id;
        this.point = point;
        this.position = position;
        this.connections = [];
    }

    addConnections(connections) {
        connections.forEach((connection) => this.addConnection(connection));
    }

    addConnection(connection) {
        if (connection.id !== this.id && this.connections.indexOf(connection) === -1) {
            this.connections.push(connection);
        }
    }

    removeConnection(connection) {
        if (this.connections.indexOf(connection) > -1) {
            this.connections.splice(this.connections.indexOf(connection), 1);
        }
    }
}
