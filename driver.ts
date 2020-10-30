import { Vertex } from "./definitions";
import Dijkstra from "./dijkstra";
import BellmanFord from "./bellman-ford";

const prompt = require('prompt-sync')({sigint: true});

let input;
console.log("Which algorithm do you want to test?\nEnter 1 for Dijkstra\'s, 2 for Bellman-Ford:");
const algo = prompt("> ");
switch (algo) {
  case '1':
    const dijkstra = new Dijkstra();
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
    const bellmanford = new BellmanFord();
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
            bellmanford.addVertex(new Vertex(v, destVertices));
          });
          bellmanford.addDestVerticesToPool();
          console.log("=== Graph saved ===");
          break;
        case '2':
          console.log("\nEnter your origin vertex & your destination vertex in this format:\n<name-of-origin-vertex> <name-of-destination-vertex>")
          input = prompt("> ").split(" ")
          console.log("Shortest Path: ", bellmanford.findShortestPath(input[0], input[1]));
          break;
        default:
          console.log('Improper Input!!!');
          break;
      }
    }
  default:
    console.log('Improper Input!!!');
    break;
}