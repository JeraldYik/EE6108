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

// helper function
export const _isVertexIn = (vertices: IVertexWithEdges, nameOfVertex: string) => {
  Object.keys(vertices).forEach((key: string) => {
    if (nameOfVertex === key) {
      return true;
    }
  });
  return false;
}

// helper function
export const _addEdgeToVertex = (vertices: IVertexWithEdges, _nameOfVertex: string, _nameOfDestVertex: string, _weightOfEdge: number): IVertexWithEdges => {
  Object.keys(vertices).forEach((key: string) => {
    if (_nameOfVertex === key) {
      vertices[key].vertex.addEdge({ nameOfDestVertex: _nameOfDestVertex, weightOfEdge: _weightOfEdge });
      vertices = _addDestVertexToPool(vertices, vertices[_nameOfVertex].vertex);
    }
  });
  return vertices;
}

// helper function
export const _addDestVertexToPool = (vertices: IVertexWithEdges, originVertex: Vertex): IVertexWithEdges => {
  originVertex.destVertices.forEach((dest: DestinationVertex) => {
    if (!vertices[dest.nameOfDestVertex]) {
      vertices[dest.nameOfDestVertex] = { vertex: null, nameOfPrev: null };
      vertices[dest.nameOfDestVertex].vertex = new Vertex(dest.nameOfDestVertex, []);;
    }
  });
  return vertices;
}
