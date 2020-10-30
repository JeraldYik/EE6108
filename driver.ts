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
      console.log("\nWhat do you want to do?\nEnter 1 to add a new vertex with edges, 2 to query for shortest path, 3 to add an edge to an existing vertex:");
      const choice = prompt("> ");
      switch (choice) {
        case '1':
          console.log("\n\Please note that the edges entered are directed\nPlease also note that this entry will overwrite the vertex entered before, if any.")
          console.log("Please enter your values in this format:\n<name-of-origin-vertex> <name-of-destination-vertex1> <weight-of-edge2> <name-of-destination-vertex2> <weight-of-edge2> etc...");
          input = prompt("> ").split(" ");
          const v = input.shift();
          const destVertices = [];
          for (var i=0; i<=input.length/2; i+=2) {
            destVertices.push({ nameOfDestVertex: input[i], weightOfEdge: input[i+1] });
          }
          dijkstra.addVertex(new Vertex(v, destVertices));
          break;
        case '2':
          console.log("\nEnter your origin vertex & your destination vertex in this format:\n<name-of-origin-vertex> <name-of-destination-vertex>")
          input = prompt("> ").split(" ")
          console.log("Shortest Path: ", dijkstra.findShortestPath(input[0], input[1]));
          break;
        case '3':
          console.log("\nNote that the current edge will be overwritten, if any");
          console.log("Enter your input in this format:\n<name-of-origin-vertex> <name-of-destination-vertex> <weight-of-edge>");
          input = prompt("> ").split(" ")
          dijkstra.addEdgeToVertex(input[0], input[1], input[2]);
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
// dijkstra.addVertex(
//   new Vertex("D", [
//     { nameOfDestVertex: "B", weightOfEdge: 5 },
//     { nameOfDestVertex: "C", weightOfEdge: 11 },
//     { nameOfDestVertex: "E", weightOfEdge: 2 },
//     { nameOfDestVertex: "F", weightOfEdge: 2 },
//   ])
// );
// dijkstra.addVertex(
//   new Vertex("E", [
//     { nameOfDestVertex: "A", weightOfEdge: 7 },
//     { nameOfDestVertex: "C", weightOfEdge: 8 },
//     { nameOfDestVertex: "D", weightOfEdge: 2 },
//     { nameOfDestVertex: "G", weightOfEdge: 5 },
//   ])
// );
// dijkstra.addVertex(
//   new Vertex("F", [
//     { nameOfDestVertex: "D", weightOfEdge: 2 },
//     { nameOfDestVertex: "G", weightOfEdge: 3 },
//   ])
// );
// dijkstra.addVertex(
//   new Vertex("G", [
//     { nameOfDestVertex: "D", weightOfEdge: 10 },
//     { nameOfDestVertex: "E", weightOfEdge: 5 },
//     { nameOfDestVertex: "F", weightOfEdge: 3 },
//   ])
// );
// console.log("Dijkstra: ", dijkstra.findShortestPath("A", "C"));

