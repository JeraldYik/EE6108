import { Vertex } from "../definitions";
import Dijkstra from "../dijkstra";

/**
 * Structure of graph can be found in sample-graph.pdf
 */
console.log('====================== Dijkstra Test File ======================');
console.log('Graph input => A: C 3 E 7 B 4,B: A 4 C 6 D 5,C: A 3 B 6 E 8 D 11,D: B 5 C 11 E 2 F 2,E: A 7 C 8 D 2 G 5,F: D 2 G 3,G: D 10 E 5 F 3');
console.log("Expected output Path A->F (path, total weight): { shortestPath: [ 'A', 'B', 'D', 'F' ], smallestWeightOfPath: 11 }");
const dijkstra = new Dijkstra();
dijkstra.addVertex(
  new Vertex("A", [
    { nameOfDestVertex: "C", weightOfEdge: 3 },
    { nameOfDestVertex: "E", weightOfEdge: 7 },
    { nameOfDestVertex: "B", weightOfEdge: 4 },
  ])
);
dijkstra.addVertex(
  new Vertex("B", [
    { nameOfDestVertex: "A", weightOfEdge: 4 },
    { nameOfDestVertex: "C", weightOfEdge: 6 },
    { nameOfDestVertex: "D", weightOfEdge: 5 },
  ])
);
dijkstra.addVertex(
  new Vertex("C", [
    { nameOfDestVertex: "A", weightOfEdge: 3 },
    { nameOfDestVertex: "B", weightOfEdge: 6 },
    { nameOfDestVertex: "E", weightOfEdge: 8 },
    { nameOfDestVertex: "D", weightOfEdge: 11 },
  ])
);
dijkstra.addVertex(
  new Vertex("D", [
    { nameOfDestVertex: "B", weightOfEdge: 5 },
    { nameOfDestVertex: "C", weightOfEdge: 11 },
    { nameOfDestVertex: "E", weightOfEdge: 2 },
    { nameOfDestVertex: "F", weightOfEdge: 2 },
  ])
);
dijkstra.addVertex(
  new Vertex("E", [
    { nameOfDestVertex: "A", weightOfEdge: 7 },
    { nameOfDestVertex: "C", weightOfEdge: 8 },
    { nameOfDestVertex: "D", weightOfEdge: 2 },
    { nameOfDestVertex: "G", weightOfEdge: 5 },
  ])
);
dijkstra.addVertex(
  new Vertex("F", [
    { nameOfDestVertex: "D", weightOfEdge: 2 },
    { nameOfDestVertex: "G", weightOfEdge: 3 },
  ])
);
dijkstra.addVertex(
  new Vertex("G", [
    { nameOfDestVertex: "D", weightOfEdge: 10 },
    { nameOfDestVertex: "E", weightOfEdge: 5 },
    { nameOfDestVertex: "F", weightOfEdge: 3 },
  ])
);
dijkstra.addDestVerticesToPool();

console.log("Actual Output: ", dijkstra.findShortestPath("A", "F"));
console.log("\n\nTesting when a negative edge exist in the graph...");
console.log("Expected Output: Error is thrown for negative edge")
dijkstra.addVertex(
  new Vertex("H", [
    { nameOfDestVertex: "G", weightOfEdge: -10 }
  ])
);

