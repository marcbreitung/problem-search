import {Point} from "../../lib/Graph/Point";
import {Graph} from "../../lib/Graph/Graph";
import {GraphNode} from "../../lib/Graph/GraphNode";

let graphNodeA = new GraphNode('A', new Point(2, 2), new Point(20, 20));
let graphNodeB = new GraphNode('B', new Point(1, 1), new Point(10, 10));
let graphNodeC = new GraphNode('C', new Point(2, 1), new Point(20, 10));
let graphNodeD = new GraphNode('D', new Point(3, 1), new Point(30, 10));
let graphNodeE = new GraphNode('E', new Point(3, 2), new Point(30, 20));
let graphNodeF = new GraphNode('F', new Point(4, 4), new Point(35, 25));

let graphNodeX = new GraphNode('X', new Point(5, 5), new Point(50, 50));
let graphNodeY = new GraphNode('Y', new Point(6, 6), new Point(60, 60));

graphNodeA.addChildNodes([graphNodeB, graphNodeD, graphNodeE]);
graphNodeB.addChildNodes([graphNodeA, graphNodeC]);
graphNodeC.addChildNodes([graphNodeB, graphNodeD]);
graphNodeD.addChildNodes([graphNodeA, graphNodeE, graphNodeC]);
graphNodeE.addChildNodes([graphNodeA, graphNodeD]);
graphNodeX.addChildNodes([graphNodeY]);

let graph = new Graph();

graph.addNode(graphNodeA);
graph.addNode(graphNodeB);
graph.addNode(graphNodeC);
graph.addNode(graphNodeD);
graph.addNode(graphNodeE);
graph.addNode(graphNodeF);
graph.addNode(graphNodeX);
graph.addNode(graphNodeY);

exports.TestGraph = graph;