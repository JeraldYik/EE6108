import Dijkstra, { Vertex } from "./dijkstra";

const dijkstra = new Dijkstra();
dijkstra.addVertex(
  new Vertex(
    "A",
    [
      { nameOfDestVertex: "C", weight: 3 },
      { nameOfDestVertex: "E", weight: 7 },
      { nameOfDestVertex: "B", weight: 4 },
    ],
    1
  )
);
dijkstra.addVertex(
  new Vertex(
    "B",
    [
      { nameOfDestVertex: "A", weight: 4 },
      { nameOfDestVertex: "C", weight: 6 },
      { nameOfDestVertex: "D", weight: 5 },
    ],
    1
  )
);
dijkstra.addVertex(
  new Vertex(
    "C",
    [
      { nameOfDestVertex: "A", weight: 3 },
      { nameOfDestVertex: "B", weight: 6 },
      { nameOfDestVertex: "E", weight: 8 },
      { nameOfDestVertex: "D", weight: 11 },
    ],
    1
  )
);
dijkstra.addVertex(
  new Vertex(
    "D",
    [
      { nameOfDestVertex: "B", weight: 5 },
      { nameOfDestVertex: "C", weight: 11 },
      { nameOfDestVertex: "E", weight: 2 },
      { nameOfDestVertex: "F", weight: 2 },
    ],
    1
  )
);
dijkstra.addVertex(
  new Vertex(
    "E",
    [
      { nameOfDestVertex: "A", weight: 7 },
      { nameOfDestVertex: "C", weight: 8 },
      { nameOfDestVertex: "D", weight: 2 },
      { nameOfDestVertex: "G", weight: 5 },
    ],
    1
  )
);
dijkstra.addVertex(
  new Vertex(
    "F",
    [
      { nameOfDestVertex: "D", weight: 2 },
      { nameOfDestVertex: "G", weight: 3 },
    ],
    1
  )
);
dijkstra.addVertex(
  new Vertex(
    "G",
    [
      { nameOfDestVertex: "D", weight: 10 },
      { nameOfDestVertex: "E", weight: 5 },
      { nameOfDestVertex: "F", weight: 3 },
    ],
    1
  )
);
console.log(dijkstra.findShortestWay("A", "F"));
