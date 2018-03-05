import {Point} from "../../lib/Graph/Point";
import {Graph} from "../../lib/Graph/Graph";
import {GraphNode} from "../../lib/Graph/GraphNode";

let graphNodes = {};

graphNodes.graphNodeA = new GraphNode('A', new Point(2, 2), new Point(20, 20));
graphNodes.graphNodeB = new GraphNode('B', new Point(1, 1), new Point(10, 10));
graphNodes.graphNodeC = new GraphNode('C', new Point(2, 1), new Point(20, 10));
graphNodes.graphNodeD = new GraphNode('D', new Point(3, 1), new Point(30, 10));
graphNodes.graphNodeE = new GraphNode('E', new Point(3, 2), new Point(30, 20));
graphNodes.graphNodeF = new GraphNode('F', new Point(4, 4), new Point(35, 25));

graphNodes.graphNodeX = new GraphNode('X', new Point(5, 5), new Point(50, 50));
graphNodes.graphNodeY = new GraphNode('Y', new Point(6, 6), new Point(60, 60));

graphNodes.graphNodeA.addChildNodes([graphNodes.graphNodeB, graphNodes.graphNodeD, graphNodes.graphNodeE]);
graphNodes.graphNodeB.addChildNodes([graphNodes.graphNodeA, graphNodes.graphNodeC]);
graphNodes.graphNodeC.addChildNodes([graphNodes.graphNodeB, graphNodes.graphNodeD]);
graphNodes.graphNodeD.addChildNodes([graphNodes.graphNodeA, graphNodes.graphNodeE, graphNodes.graphNodeC]);
graphNodes.graphNodeE.addChildNodes([graphNodes.graphNodeA, graphNodes.graphNodeD]);
graphNodes.graphNodeX.addChildNodes([graphNodes.graphNodeY]);

let graph = new Graph();

graph.addNode(graphNodes.graphNodeA);
graph.addNode(graphNodes.graphNodeB);
graph.addNode(graphNodes.graphNodeC);
graph.addNode(graphNodes.graphNodeD);
graph.addNode(graphNodes.graphNodeE);
graph.addNode(graphNodes.graphNodeF);
graph.addNode(graphNodes.graphNodeX);
graph.addNode(graphNodes.graphNodeY);

exports.TestGraph = graph;
exports.TestGraphNodes = graphNodes;