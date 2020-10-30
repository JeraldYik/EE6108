/** BELLMAN-FORD'S ALGORITHM PSEUDOCODE
 * Extracted from Page 118 from Algorithms (DPV) Textbook
 *
 * Input: Graph G = (V,E), in this case we assume that G is directed with positive edge lengths, and that there are no negative cycles;
 * positive edge lengths {l_e : e \in E}; vertex s \in V
 * Output: For all vertices u reachable from s, dist(u) is set to the distance from s to u
 *
 * for all u \in V:
 *    dist(u) = +inf
 *    prev(u) = null
 *
 * dist(s) = 0
 * repeat |V|-1 times:
 *    for all edges (u,v) \in E:
 *      if dist (v) > dist(u) + l(u,v):
 *          dist(v) = dist(u) + l(u,v)
 *          prev(u) = u
 */

import {
  DestinationVertex,
  Vertex,
  IVertexWithEdges,
  IVertexWithEdgesInfo,
  IResult,
  _addDestVerticesToPool
} from "./definitions";

const _ = require('lodash');

class BellmanFord {
  vertices: IVertexWithEdges;

  constructor() {
    this.vertices = {};
  }

  // setter (NOTE: this will overwrite existing vertex, if any)
  public addVertex(vertex: Vertex): void {
    // prev(u) = null;
    this.vertices[vertex.name] = { vertex: null, nameOfPrev: null };
    this.vertices[vertex.name].vertex = vertex;
  }

  // main algorithm
  public findShortestPath(start: string, finish: string): IResult {
    // MAKE A COPY of this.vertices to make allow queries
    const pool: IVertexWithEdges = _.cloneDeep(this.vertices);

    Object.keys(pool).forEach((key: string) => {
      if (pool[key].vertex.name === start) {
        // dist(s) = 0; initialise weight of start node to be 0
        pool[key].vertex.weightFromStart = 0;
      } else {
        // dist(u) = +inf; initialise weight of rest of nodes to be +inf
        pool[key].vertex.weightFromStart = Number.MAX_VALUE;
      }
    });

    const V: number = Object.keys(pool).length;
    // repeat |V|-1 times
    for (var i: number = 0; i < V - 1; i++) {
      // for all (u,v) \in E:
      Object.keys(pool).forEach((key: string) => {
        // u = pool.name, v = pool[key].vertex.destVertices[i].nameOfDestVertex
        const currentVertex: Vertex = pool[key].vertex;
        // for all edges (u,v) \in E, where u = currentVertex
        currentVertex.destVertices.forEach((dest: DestinationVertex) => {
          // calculateWeight = dist(u) + l(u,v)
          const calculateWeight: number =
            currentVertex.weightFromStart + dest.weightOfEdge;
          // if dist (v) > dist(u) + l(u,v); calculateWeight < dist(v)
          if (
            calculateWeight <
            pool[dest.nameOfDestVertex].vertex.weightFromStart
          ) {
            // dist(v) = dist(u) + l(u,v); dist(v) = calculateWeight
            pool[
              dest.nameOfDestVertex
            ].vertex.weightFromStart = calculateWeight;
            // prev(u) = u
            pool[dest.nameOfDestVertex].nameOfPrev =
              currentVertex.name;
          }
        });
      });
    }

    /**
     * Perform iteration one more time (i.e. Vth time)
     * If there is any decrease in weightFromStart of any node, there exist a negative cycle
     */

    Object.keys(pool).forEach((key: string) => {
      // u = pool.name, v=pool[key].vertex.destVertices[i].nameOfDestVertex
      const currentVertex: Vertex = pool[key].vertex;
      // for all edges (u,v) \in E, where u = currentVertex
      currentVertex.destVertices.forEach((dest: DestinationVertex) => {
        // calculateWeight = dist(u) + l(u,v)
        const calculateWeight: number =
          currentVertex.weightFromStart + dest.weightOfEdge;
        // if dist (v) > dist(u) + l(u,v); calculateWeight < dist(v)
        if (
          calculateWeight <
          pool[dest.nameOfDestVertex].vertex.weightFromStart
        ) {
          throw new Error("There exist a negative cycle!!!");
        }
      });
    });

    const finishWeight: number = pool[finish].vertex.weightFromStart;
    let arrayWithVertex: string[] = this.mapShortestPath(start, finish, pool);
    arrayWithVertex.push(finish);

    return {shortestPath: arrayWithVertex, smallestWeightOfPath: finishWeight};
  }

  // after finding shortest path from main algorithm (populating pool with the appropriate weights), print out path with intermediate nodes using nameOfPrev attribute
  private mapShortestPath(start: string, finish: string, pool: IVertexWithEdges): string[] {
    let nextVertex: string = finish;
    let arrayWithVertex: string[] = [];

    while (nextVertex !== start) {
      let nextVertexObj: IVertexWithEdgesInfo | null = pool[nextVertex]
        ? pool[nextVertex]
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

  public addDestVerticesToPool(): void {
    _addDestVerticesToPool(this.vertices);
  }
}

export default BellmanFord;
