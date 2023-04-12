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

console.log('GRAPH: \n:', JSON.stringify(graph.adjacencyList))

interface Path {
  path: string[];
  distance: number;
}

interface Dijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): Path;
  findAllShortestPaths(vertex: T): Record<string, Path>;
}

class DijkstraAlgorithms implements Dijkstra<Vertex> {
  constructor(private graph: Graph) {
    this.graph = graph;
  }

  findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
    const start = vertex1.key;
    const end = vertex2.key;

    const distances: { [key: string]: number } = {};
    const visited: string[] = [];
    let currentNode: string = start;
    distances[currentNode] = 0;
  
    while (currentNode !== end) {
      for (let neighbor in this.graph.adjacencyList[currentNode]) {
        let distance: number = this.graph.adjacencyList[currentNode][neighbor];
        if (!distances[neighbor]) {
          distances[neighbor] = distance + distances[currentNode];
        } else if (distances[neighbor] > distance + distances[currentNode]) {
          distances[neighbor] = distance + distances[currentNode];
        }
      }
      visited.push(currentNode);
      let unvisited: { [key: string]: number } = {};
      for (let node in this.graph.adjacencyList) {
        if (!visited.includes(node)) {
          unvisited[node] = distances[node];
        }
      }
      currentNode = Object.keys(unvisited).reduce((a, b) => unvisited[a] < unvisited[b] ? a : b, start);
    }
  
    // return distances[end];
    const result = { path: visited, distance: distances[end] };
    console.log(JSON.stringify(result));
    return { path: visited, distance: distances[end] };
  }

  findAllShortestPaths(vertex: Vertex): Record<string, Path> {
    const result: Record<string, Path> = {}
    for(const vert in this.graph) {
      if(vert !== vertex.key) {
        result[vert] = this.findShortestPath(vertex, new Vertex(vert));
      }
    }

    return result;
  }
}

const dijkstra: Dijkstra<Vertex> = new DijkstraAlgorithms(graph);

// dijkstra.findShortestPath(vertex4, vertex3); // { path: ['4', '1', '3'], distance: 7 }
// dijkstra.findShortestPath(vertex1, vertex5); // { path: [], distance: Infinity }
// dijkstra.findShortestPath(vertex1, vertex1); // { path: ['1'], distance: 0 }

// dijkstra.findAllShortestPaths(vertex4);
/*
  {
    '1': { path: ['4', '1'], distance: 3 },
    '2': { path: ['4', '2'], distance: 6 },
    '3': { path: ['4', '1', '3'], distance: 7 },
    '5': { path: [], distance: Infinity }
  }
*/
