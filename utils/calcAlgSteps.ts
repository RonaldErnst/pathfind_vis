import {astar, bfs, dfs, dijkstra} from "@/algorithms";
import { GraphType, GridTile } from "@/contexts/GridContext";
import { AlgorithmType } from "@/contexts/PathFinderContext";

export default function calcAlgSteps(algType: AlgorithmType, graph: GraphType, start: GridTile, end: GridTile) {
    switch(algType) {
        case "bfs":
            return bfs(graph, start, end);
        case "dfs":
            return dfs(graph, start, end);
        case "dijkstra":
            return dijkstra(graph, start, end);
        case "astar":
            return astar(graph, start, end);
        default:
            throw new Error(`Unknown Algorithm ${algType}`);
    }
}