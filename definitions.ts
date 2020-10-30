export class DestinationVertex {
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
    // initialise dist(u) = +inf first, weight of start node will be set later
    this.weightFromStart = Number.MAX_VALUE;
  }

  public addEdge(edge: DestinationVertex): void {
    this.destVertices.push(edge);
  }
}

// { name : { vertex; name; }}
export interface IVertexWithEdges {
  [name: string]: IVertexWithEdgesInfo;
}

export interface IVertexWithEdgesInfo {
  vertex: Vertex;
  nameOfPrev: string;
}

// { name : weightFromStart}
export interface IVertex {
  [name: string]: number;
}

export interface IResult {
  shortestPath: string[];
  smallestWeightOfPath: number;
}

// add remaining vertices into pool
export const _addDestVerticesToPool = (vertices: IVertexWithEdges): void => {
  Object.values(vertices).forEach((v: IVertexWithEdgesInfo) => {
    v.vertex.destVertices.forEach((d: DestinationVertex) => {
      if (!vertices[d.nameOfDestVertex]) {
        vertices[d.nameOfDestVertex] = { vertex: null, nameOfPrev: null };
        vertices[d.nameOfDestVertex].vertex = new Vertex(d.nameOfDestVertex, []);
      }
    })
  });
}


