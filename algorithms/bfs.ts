import { GraphType, GridTile } from "@/contexts/GridContext";
import { PathFinderStep } from "@/contexts/PathFinderContext";

export default function bfs(graph: GraphType, start: GridTile, end: GridTile) {
    const steps: PathFinderStep[] = [];

    const visited = new Set(start.name);
    const queue = [start.name];

    let currStep = initialGrid.map(row => row.map(col => col.type === "wall"? "wall" : "unvisited"));
    steps.push([...currStep]);

    currStep

    while(queue.length > 0) {
        let node = queue.shift()!;

        let adjacentNodes = graph.get(node);

        adjacentNodes?.forEach(n => {
            if(visited.has(n))
                return;

            visited.add(n);
            queue.push(n);
        });
    }

    return steps;
}