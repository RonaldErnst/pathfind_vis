import {astar, bfs, dfs, dijkstra} from "@/algorithms";
import { GridTile } from "@/contexts/GridContext";
import { AlgorithmType } from "@/contexts/PathFinderContext";

export default function calcAlgSteps(algType: AlgorithmType, initialGrid: GridTile[][], graph: Map<String, Array<String>>, start: string, end: string) {
    switch(algType) {
        case "bfs":
            return bfs(initialGrid, graph, start, end);
        case "dfs":
            return dfs(initialGrid, graph, start, end);
        case "dijkstra":
            return dijkstra(initialGrid, graph, start, end);
        case "astar":
            return astar(initialGrid, graph, start, end);
        default:
            throw new Error(`Unknown Algorithm ${algType}`);
    }
}