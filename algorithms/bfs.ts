import { GridTile } from "@/contexts/GridContext";
import { PathFinderStep } from "@/contexts/PathFinderContext";

export default function bfs(initialGrid: GridTile[][], graph: Map<String, Array<String>>, start: string, end: string) {
    const steps: PathFinderStep[] = [];

    const visited = new Set(start);
    const queue = [start];

    while(queue.length > 0) {
        
    }

    return steps;
}