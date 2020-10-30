import { Vertex } from "./definitions";
import Dijkstra from "./dijkstra";
import BellmanFord from "./bellman-ford";

const prompt = require('prompt-sync')({sigint: true});

console.log("Which algorithm do you want to test?\nEnter 1 for Dijkstra\'s, 2 for Bellman-Ford:");
const algo = prompt("> ");
switch (algo) {
  case '1':
    const dijkstra = new Dijkstra();
    let input;
    while(true) {
      console.log("\nPlease note that a new entry of a graph will overwrite the existing graph, if any.")
      console.log("\nWhat do you want to do?\nEnter 1 to add a graph, 2 to query for shortest path:");
      const choice = prompt("> ");
      switch (choice) {
        case '1':
          console.log("\n\Please note that the edges entered are directed, i.e. if the edge is undirected, please also include the edge in the other origin vertex.")
          console.log("Please note again that this entry will overwrite the vertex entered before, if any.")
          console.log("Please enter your values in this format:\n<name-of-origin-vertex1>: <name-of-destination-vertex1> <weight-of-edge1> <name-of-destination-vertex2> <weight-of-edge2> etc...,<name-of-origin-vertex2> <name-of-destination-vertex3> <weight-of-edge3> etc...");
          console.log("A sample input:\n\tA: B 2 C 3,B: C 4")
          console.log("This means that (A->B, weight=2), (A->C, weight=3), (B->C, weight=4)")
          input = prompt("> ").split(",");
          input.forEach(vertices => {
            vertices = vertices.split(" ");
            const v = vertices.shift()[0];
            const destVertices = [];
            for (var i=0; i<vertices.length; i+=2) {
              destVertices.push({ nameOfDestVertex: vertices[i], weightOfEdge: parseFloat(vertices[i+1]) });
            }
            dijkstra.addVertex(new Vertex(v, destVertices));
          });
          dijkstra.addDestVerticesToPool();
          console.log("=== Graph saved ===");
          break;
        case '2':
          console.log("\nEnter your origin vertex & your destination vertex in this format:\n<name-of-origin-vertex> <name-of-destination-vertex>")
          input = prompt("> ").split(" ")
          console.log("Shortest Path: ", dijkstra.findShortestPath(input[0], input[1]));
          break;
        default:
          console.log('Improper Input!!!');
          break;
      }
    }
  case '2':
    break;
  default:
    console.log('Improper Input!!!');
    break;
}

// const dijkstra = new Dijkstra();

// dijkstra.addVertex(
//   new Vertex("A", [
//     { nameOfDestVertex: "C", weightOfEdge: 3 },
//     { nameOfDestVertex: "E", weightOfEdge: 7 },
//     { nameOfDestVertex: "B", weightOfEdge: 4 },
//   ])
// );
// dijkstra.addVertex(
//   new Vertex("B", [
//     { nameOfDestVertex: "A", weightOfEdge: 4 },
//     { nameOfDestVertex: "C", weightOfEdge: 6 },
//     { nameOfDestVertex: "D", weightOfEdge: 5 },
//   ])
// );
// dijkstra.addVertex(
//   new Vertex("C", [
//     { nameOfDestVertex: "A", weightOfEdge: 3 },
//     { nameOfDestVertex: "B", weightOfEdge: 6 },
//     { nameOfDestVertex: "E", weightOfEdge: 8 },
//     { nameOfDestVertex: "D", weightOfEdge: 11 },
//   ])
// );
// // dijkstra.addVertex(
// //   new Vertex("D", [
// //     { nameOfDestVertex: "B", weightOfEdge: 5 },
// //     { nameOfDestVertex: "C", weightOfEdge: 11 },
// //     { nameOfDestVertex: "E", weightOfEdge: 2 },
// //     { nameOfDestVertex: "F", weightOfEdge: 2 },
// //   ])
// // );
// dijkstra.addVertex(
//   new Vertex("E", [
//     { nameOfDestVertex: "A", weightOfEdge: 7 },
//     { nameOfDestVertex: "C", weightOfEdge: 8 },
//     { nameOfDestVertex: "D", weightOfEdge: 2 },
//     { nameOfDestVertex: "G", weightOfEdge: 5 },
//   ])
// );
// // dijkstra.addVertex(
// //   new Vertex("F", [
// //     { nameOfDestVertex: "D", weightOfEdge: 2 },
// //     { nameOfDestVertex: "G", weightOfEdge: 3 },
// //   ])
// // );
// dijkstra.addVertex(
//   new Vertex("G", [
//     { nameOfDestVertex: "D", weightOfEdge: 10 },
//     { nameOfDestVertex: "E", weightOfEdge: 5 },
//     { nameOfDestVertex: "F", weightOfEdge: 3 },
//   ])
// );
// dijkstra.addDestVerticesToPool();
// console.log("Dijkstra: ", dijkstra.findShortestPath("A", "F"));

