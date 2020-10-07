import { Vertex } from "./definitions";
import Dijkstra from "./dijkstra";
import BellmanFord from "./bellman-ford";

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
console.log("Dijkstra: ", dijkstra.findShortestPath("A", "F"));

const bellmanFord = new BellmanFord();
bellmanFord.addVertex(
  new Vertex("A", [
    { nameOfDestVertex: "C", weightOfEdge: 3 },
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
    { nameOfDestVertex: "A", weightOfEdge: 3 },
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
    { nameOfDestVertex: "F", weightOfEdge: 2 },
  ])
);
bellmanFord.addVertex(
  new Vertex("E", [
    { nameOfDestVertex: "A", weightOfEdge: 7 },
    { nameOfDestVertex: "C", weightOfEdge: 8 },
    { nameOfDestVertex: "D", weightOfEdge: 2 },
    { nameOfDestVertex: "G", weightOfEdge: 5 },
  ])
);
bellmanFord.addVertex(
  new Vertex("F", [
    { nameOfDestVertex: "D", weightOfEdge: 2 },
    { nameOfDestVertex: "G", weightOfEdge: 3 },
  ])
);
bellmanFord.addVertex(
  new Vertex("G", [
    { nameOfDestVertex: "D", weightOfEdge: 10 },
    { nameOfDestVertex: "E", weightOfEdge: 5 },
    { nameOfDestVertex: "F", weightOfEdge: 3 },
  ])
);
console.log("Bellman-Ford: ", bellmanFord.findShortestPath("A", "F"));
