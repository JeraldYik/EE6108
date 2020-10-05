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

interface IVertexWithEdges {
  [name: string]: Vertex;
}

interface IVertex {
  [name: string]: number;
}

class Dijkstra {
  vertices: IVertexWithEdges;

  constructor() {
    this.vertices = {};
  }

  addVertex(vertex: Vertex): void {
    this.vertices[vertex.name] = vertex;
  }

  findPointsOfShortestWay(start: string, finish: string): string[] {
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
    return arrayWithVertex;
  }

  findShortestWay(start: string, finish: string): string[] {
    let nodes: IVertex = {};

    Object.keys(this.vertices).forEach((key: string) => {
      if (this.vertices[key].name === start) {
        // initialise weight of start node to be 0
        this.vertices[key].weightFromStart = 0;
      }
      nodes[this.vertices[key].name] = this.vertices[key].weightFromStart;
    });

    while (Object.keys(nodes).length !== 0) {
      let sortedVisitedByWeight: string[] = Object.keys(nodes).sort(
        (a, b) =>
          this.vertices[a].weightFromStart - this.vertices[b].weightFromStart
      );
      let currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]];
      currentVertex.destVertices.forEach((n: DestinationVertex) => {
        const calculateWeight: number =
          currentVertex.weightFromStart + n.weightOfEdge;
        if (
          calculateWeight < this.vertices[n.nameOfDestVertex].weightFromStart
        ) {
          this.vertices[n.nameOfDestVertex].weightFromStart = calculateWeight;
        }
      });
      delete nodes[sortedVisitedByWeight[0]];
    }

    const finishWeight: number = this.vertices[finish].weightFromStart;
    let arrayWithVertex: string[] = this.findPointsOfShortestWay(
      start,
      finish
    ).reverse();
    arrayWithVertex.push(finish, finishWeight.toString());

    return arrayWithVertex;
  }
}

export default Dijkstra;
