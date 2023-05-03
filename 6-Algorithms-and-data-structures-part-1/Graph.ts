interface WeightedGraph<T> {
  addVertex(key: string): void;
  addEdge(vertex1: T, vertex2: T, weight: number): void;
}

class Vertex {
  constructor(public key: string) {
    this.key = key;
  }
}

class Edge {
  constructor(public from: Vertex, public to: Vertex, public weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

type AdjacencyList = {
  [key: string]: {
    [key: string]: number
  }
}

class Graph implements WeightedGraph<Vertex> {
  public adjacencyList: AdjacencyList;

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(key: string): void {
    if(!this.adjacencyList[key]) {
      this.adjacencyList[key] = {};
    }
  }

  addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
    this.adjacencyList[vertex1.key][vertex2.key] = weight;
    this.adjacencyList[vertex2.key][vertex1.key] = weight;
  }
}

const vertices = [
  new Vertex('1'),
  new Vertex('2'),
  new Vertex('3'),
  new Vertex('4'),
  new Vertex('5')
];

const vertex1 = vertices[0];
const vertex2 = vertices[1];
const vertex3 = vertices[2];
const vertex4 = vertices[3];
const vertex5 = vertices[4];

const edges = [
  new Edge(vertex1, vertex4, 3),
  new Edge(vertex1, vertex2, 5),
  new Edge(vertex1, vertex3, 4),
  new Edge(vertex2, vertex4, 6),
  new Edge(vertex2, vertex3, 5),
];

const graph = new Graph();

vertices.forEach(verticle => graph.addVertex(verticle.key));
edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.weight));

console.log('GRAPH: \n', graph.adjacencyList);

interface Path {
  path: string[];
  distance: number;
}

interface Dijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): Path;
  findAllShortestPaths(vertex: T): Record<string, Path>;
}

type Distances = { 
  [key: string]: Path
};

class DijkstraAlgorithms implements Dijkstra<Vertex> {
  constructor(private graph: Graph) {
    this.graph = graph;
  }
  private dijkstra(start: Vertex) {
    const baseGraph = this.graph.adjacencyList;
    const startKey = start.key;
    const distances: Distances = {};
    const remainingKeys: string[] = [];

    for(const vertexKey in baseGraph) {
      distances[vertexKey] = {
        path: [],
        distance: Infinity
      }
      if(vertexKey !== startKey) {
        remainingKeys.push(vertexKey);
      }
    }

    distances[startKey].distance = 0;
    distances[startKey].path.push(startKey);

    let currentKey = startKey;

    while(remainingKeys.length > 0) {
      const adjacentKeys = baseGraph[currentKey];

      for(let adjacentKey in adjacentKeys) {
        const distanceFromStart = distances[currentKey].distance + adjacentKeys[adjacentKey];
        const distanceLessThanPrev = distanceFromStart < distances[adjacentKey].distance;
        if(remainingKeys.includes(adjacentKey) && distanceLessThanPrev) {
          distances[adjacentKey].distance = distanceFromStart;
          distances[adjacentKey].path = distances[currentKey].path.concat(adjacentKey);
        }
      }

      const nearestKey = this.shortestDistanceKey(distances, remainingKeys);
      if (!nearestKey) {
        break;
      }

      const remainingIndex = remainingKeys.indexOf(nearestKey);
      remainingKeys.splice(remainingIndex, 1);
      currentKey = nearestKey;
    }

    return distances;
  }

  private shortestDistanceKey(distances: Distances, remainingKeys: string[]): string | null {
    let shortest: string | null = null;
    
    for (let key in distances) {
      let currentIsShorter =
        shortest === null || distances[key].distance < distances[shortest].distance;
            
      if (currentIsShorter && remainingKeys.includes(key)) {
        shortest = key;
      }
    }
    return shortest;
  };

  findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
    const distances = this.dijkstra(vertex1);
    const distance = distances[vertex2.key];
    console.log(distance);

    return distance;
  }

  findAllShortestPaths(vertex: Vertex): Record<string, Path> {
    const distances = this.dijkstra(vertex);
    delete distances[vertex.key]
    console.log(distances);

    return distances;
  }
}

const dijkstra: Dijkstra<Vertex> = new DijkstraAlgorithms(graph);

dijkstra.findShortestPath(vertex4, vertex3); // { path: ['4', '1', '3'], distance: 7 }
dijkstra.findShortestPath(vertex1, vertex5); // { path: [], distance: Infinity }
dijkstra.findShortestPath(vertex1, vertex1); // { path: ['1'], distance: 0 }

dijkstra.findAllShortestPaths(vertex4);
/*
  {
    '1': { path: ['4', '1'], distance: 3 },
    '2': { path: ['4', '2'], distance: 6 },
    '3': { path: ['4', '1', '3'], distance: 7 },
    '5': { path: [], distance: Infinity }
  }
*/
