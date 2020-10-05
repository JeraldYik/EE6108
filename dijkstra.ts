// Assuming all edges are directed

class DestinationVertex {
  nameOfDestVertex: string;
  weightOfEdge: number;
}

export class Vertex {
  name: string;
  destVertices: DestinationVertex[];
  weightFromStart: number;

  constructor(name: string, destVertices: DestinationVertex[]) {
    this.name = name;
    this.destVertices = destVertices;
    // initialise weights of all nodes to be +inf first, weight of start node will be set later
    this.weightFromStart = Number.MAX_VALUE;
  }
}

// { name : Vertex}
interface IVertexWithEdges {
  [name: string]: Vertex;
}

// { name : weightFromStart}
interface IVertex {
  [name: string]: number;
}

class Dijkstra {
  vertices: IVertexWithEdges;

  constructor() {
    this.vertices = {};
  }

  // setter
  public addVertex(vertex: Vertex): void {
    this.vertices[vertex.name] = vertex;
  }

  // main algorithm
  public findShortestWay(start: string, finish: string): string[] {
    // queue : object
    let nodes: IVertex = {};

    Object.keys(this.vertices).forEach((key: string) => {
      if (this.vertices[key].name === start) {
        // initialise weight of start node to be 0
        this.vertices[key].weightFromStart = 0;
      }
      // populate queue of nodes to be worked on
      nodes[this.vertices[key].name] = this.vertices[key].weightFromStart;
    });

    while (Object.keys(nodes).length > 0) {
      // sort object and make it into a queue nodes of increasing weights
      let sortedVisitedByWeight: string[] = Object.keys(nodes).sort(
        (a, b) =>
          this.vertices[a].weightFromStart - this.vertices[b].weightFromStart
      );

      let currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]];
      // for all edges (u,v) where u = currentVertex
      currentVertex.destVertices.forEach((n: DestinationVertex) => {
        // calculateWeight = dist(u) + l(u,v)
        const calculateWeight: number =
          currentVertex.weightFromStart + n.weightOfEdge;
        // calculateWeight < dist(v)
        if (
          calculateWeight < this.vertices[n.nameOfDestVertex].weightFromStart
        ) {
          // dist(v) = calculateWeight
          this.vertices[n.nameOfDestVertex].weightFromStart = calculateWeight;
        }
      });

      // delete from queue
      delete nodes[sortedVisitedByWeight[0]];
    }

    const finishWeight: number = this.vertices[finish].weightFromStart;
    let arrayWithVertex: string[] = this.findPointsOfShortestWay(start, finish);
    arrayWithVertex.push(finish, finishWeight.toString());

    return arrayWithVertex;
  }

  // after finding shortest path from main algorithm (populating this.vertices with the appropriate weights), print out path with intermediate nodes
  private findPointsOfShortestWay(start: string, finish: string): string[] {
    let nextVertex: string = finish;
    let arrayWithVertex: string[] = [];
    while (nextVertex !== start) {
      let minWeight: number = Number.MAX_VALUE;
      let minVertex: string = "";
      this.vertices[nextVertex].destVertices.forEach((v: DestinationVertex) => {
        if (
          v.weightOfEdge + this.vertices[v.nameOfDestVertex].weightFromStart <
          minWeight
        ) {
          minWeight = this.vertices[v.nameOfDestVertex].weightFromStart;
          minVertex = v.nameOfDestVertex;
        }
      });
      arrayWithVertex.push(minVertex);
      nextVertex = minVertex;
    }

    return arrayWithVertex.reverse();
  }
}

export default Dijkstra;
