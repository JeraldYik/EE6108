import { Vertex } from "../definitions";
import BellmanFord from "../bellman-ford";

console.log("===== Bellman's Ford =====");
console.log("Expected output (path, total weight): [ [ 'A', 'C', 'E', 'D', 'F' ], 5 ]");
const bellmanFord = new BellmanFord();
bellmanFord.addVertex(
  new Vertex("A", [
    { nameOfDestVertex: "C", weightOfEdge: -3 },
    { nameOfDestVertex: "E", weightOfEdge: 7 },
    { nameOfDestVertex: "B", weightOfEdge: 4 },
  ])
);
bellmanFord.addVertex(
  new Vertex("B", [
    { nameOfDestVertex: "A", weightOfEdge: 4 },
    { nameOfDestVertex: "C", weightOfEdge: 6 },
    { nameOfDestVertex: "D", weightOfEdge: 5 },
  ])
);
bellmanFord.addVertex(
  new Vertex("C", [
    { nameOfDestVertex: "B", weightOfEdge: 6 },
    { nameOfDestVertex: "E", weightOfEdge: 8 },
    { nameOfDestVertex: "D", weightOfEdge: 11 },
  ])
);
bellmanFord.addVertex(
  new Vertex("D", [
    { nameOfDestVertex: "B", weightOfEdge: 5 },
    { nameOfDestVertex: "C", weightOfEdge: 11 },
    { nameOfDestVertex: "E", weightOfEdge: 2 },
    { nameOfDestVertex: "F", weightOfEdge: -2 },
  ])
);
bellmanFord.addVertex(
  new Vertex("E", [
    { nameOfDestVertex: "A", weightOfEdge: 7 },
    { nameOfDestVertex: "C", weightOfEdge: 8 },
    { nameOfDestVertex: "D", weightOfEdge: 2 },
  ])
);
bellmanFord.addVertex(
  new Vertex("F", [])
);
bellmanFord.addVertex(
  new Vertex("G", [
    { nameOfDestVertex: "D", weightOfEdge: 10 },
    { nameOfDestVertex: "E", weightOfEdge: -5 },
    { nameOfDestVertex: "F", weightOfEdge: -3 },
  ])
);
console.log("Actual Output: ", bellmanFord.findShortestPath("A", "F"));

console.log("\n\nTesting out helper method addEdgeToVertex()...");
bellmanFord.addEdgeToVertex("C", "F", 1);
console.log("Expected output (path, total weight): [ [ 'A', 'C', 'F' ], -2 ]");
console.log("Actual Output: ", bellmanFord.findShortestPath("A", "F"));

console.log("\n\nTesting when a negative cycle exist in the graph...");
bellmanFord.addEdgeToVertex("F", "G", -20);
console.log("Expected Output: Error is thrown for negative cycle");
console.log("Actual Output: ", bellmanFord.findShortestPath("A", "F"));