/** DIJKSTRA'S ALGORITHM PSEUDOCODE
 * Extracted from Page 110 from Algorithms (DPV) Textbook
 *
 * Input: Graph G = (V,E), in this case we assume that G is directed with positive edge lengths;
 * positive edge lengths {l_e : e \in E}; vertex s \in V
 * Output: For all vertices u reachable from s, dist(u) is set to the distance from s to u
 *
 * for all u \in V:
 *    dist(u) = +inf
 *    prev(u) = null
 * dist(s) = 0
 *
 * H = makequeue(V)
 * while H is not empty:
 *  u = deletemin(H)
 *  for all edges (u,v) \in E:
 *      if dist (v) > dist(u) + l(u,v):
 *          dist(v) = dist(u) + l(u,v)
 *          prev(u) = u
 *          decreasekey(H,v)
 */

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
    // initialise dist(u) = +inf first, weight of start node will be set later
    this.weightFromStart = Number.MAX_VALUE;
  }
}

// { name : { vertex; name; }}
interface IVertexWithEdges {
  [name: string]: IVertexWithEdgesInfo;
}

interface IVertexWithEdgesInfo {
  vertex: Vertex;
  nameOfPrev: string;
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
    /**
     * LIMITATION OF DIJKSTRA'S ALGORITHM:
     *
     * Dijkstra's algorithm fails when there are negative edges
     * We need to throw an error if user inputs an edge with negative weights
     */
    vertex.destVertices.forEach((v: DestinationVertex) => {
      if (v.weightOfEdge < 0) {
        throw new Error("Negative weights are not allowed!!!");
      }
    });

    // prev(u) = null;
    this.vertices[vertex.name] = { vertex: null, nameOfPrev: null };
    this.vertices[vertex.name].vertex = vertex;
  }

  // main algorithm
  public findShortestPath(start: string, finish: string): string[] {
    // H = makequeue(V); queue : object
    let nodes: IVertex = {};

    Object.keys(this.vertices).forEach((key: string) => {
      if (this.vertices[key].vertex.name === start) {
        // initialise weight of start node to be 0
        this.vertices[key].vertex.weightFromStart = 0;
      }
      // populate queue of nodes to be worked on
      nodes[this.vertices[key].vertex.name] = this.vertices[
        key
      ].vertex.weightFromStart;
    });

    // while H is not empty:
    while (Object.keys(nodes).length > 0) {
      // sort object and make it into a queue nodes of increasing weights
      let sortedVisitedByWeight: string[] = Object.keys(nodes).sort(
        (a, b) =>
          this.vertices[a].vertex.weightFromStart -
          this.vertices[b].vertex.weightFromStart
      );

      let currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]]
        .vertex;
      // for all edges (u,v) \in E, where u = currentVertex
      currentVertex.destVertices.forEach((n: DestinationVertex) => {
        // calculateWeight = dist(u) + l(u,v)
        const calculateWeight: number =
          currentVertex.weightFromStart + n.weightOfEdge;
        // if dist (v) > dist(u) + l(u,v); calculateWeight < dist(v)
        if (
          calculateWeight <
          this.vertices[n.nameOfDestVertex].vertex.weightFromStart
        ) {
          // dist(v) = dist(u) + l(u,v); dist(v) = calculateWeight
          this.vertices[
            n.nameOfDestVertex
          ].vertex.weightFromStart = calculateWeight;
          // prev(u) = u
          this.vertices[n.nameOfDestVertex].nameOfPrev = currentVertex.name;
        }
      });

      // u = deletemin(H); delete from queue
      delete nodes[sortedVisitedByWeight[0]];
    }

    const finishWeight: number = this.vertices[finish].vertex.weightFromStart;
    let arrayWithVertex: string[] = this.mapShortestPath(start, finish);
    arrayWithVertex.push(finish, finishWeight.toString());

    return arrayWithVertex;
  }

  // after finding shortest path from main algorithm (populating this.vertices with the appropriate weights), print out path with intermediate nodes using nameOfPrev attribute
  private mapShortestPath(start: string, finish: string): string[] {
    let nextVertex: string = finish;
    let arrayWithVertex: string[] = [];

    while (nextVertex !== start) {
      let nextVertexObj: IVertexWithEdgesInfo | null = this.vertices[nextVertex]
        ? this.vertices[nextVertex]
        : null;
      if (nextVertexObj) {
        nextVertex = nextVertexObj.nameOfPrev;
        arrayWithVertex.push(nextVertex);
      } else {
        throw new Error("Cannot find previous vertex!!");
      }
    }
    return arrayWithVertex.reverse();
  }
}

export default Dijkstra;
