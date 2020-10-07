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
