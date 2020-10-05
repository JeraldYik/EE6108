// Assuming all edges are directed

class DestinationVertex {
  nameOfDestVertex: string;
  weight: number;
}

export class Vertex {
  name: string;
  nodes: DestinationVertex[];
  weight: number;

  constructor(name: string, nodes: DestinationVertex[], weight: number) {
    this.name = name;
    this.nodes = nodes;
    this.weight = weight;
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
      this.vertices[nextVertex].nodes.forEach((v: DestinationVertex) => {
        if (v.weight + this.vertices[v.nameOfDestVertex].weight < minWeight) {
          minWeight = this.vertices[v.nameOfDestVertex].weight;
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
        this.vertices[key].weight = 0;
      } else {
        this.vertices[key].weight = Number.MAX_VALUE;
      }
      nodes[this.vertices[key].name] = this.vertices[key].weight;
    });

    while (Object.keys(nodes).length !== 0) {
      let sortedVisitedByWeight: string[] = Object.keys(nodes).sort(
        (a, b) => this.vertices[a].weight - this.vertices[b].weight
      );
      let currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]];
      currentVertex.nodes.forEach((n: DestinationVertex) => {
        const calculateWeight: number = currentVertex.weight + n.weight;
        if (calculateWeight < this.vertices[n.nameOfDestVertex].weight) {
          this.vertices[n.nameOfDestVertex].weight = calculateWeight;
        }
      });
      delete nodes[sortedVisitedByWeight[0]];
    }

    const finishWeight: number = this.vertices[finish].weight;
    let arrayWithVertex: string[] = this.findPointsOfShortestWay(
      start,
      finish
    ).reverse();
    arrayWithVertex.push(finish, finishWeight.toString());

    return arrayWithVertex;
  }
}

export default Dijkstra;
