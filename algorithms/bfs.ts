import { AlgorithmStep, GraphType } from "@/contexts/AlgorithmContext";
import { GridTile } from "@/contexts/GridContext";

export default function bfs(
	grid: GridTile[][],
	graph: GraphType,
	start: GridTile,
	end: GridTile
) {
	const steps: AlgorithmStep[] = [];

	const queue = [start];
    const previous: Record<string, GridTile | null> = {[start.name]: null};

    // Add starting empty grid point as first step
	let currStep = grid.flat().reduce<AlgorithmStep>((acc,tile) => ({...acc, [tile.name]: tile.type === "wall" ? "wall" : "unvisited"}), {})
	steps.push(currStep);

	while (queue.length > 0) {
		let node = queue.shift()!;

        currStep = {
            ...currStep,
            [node.name]: "visiting"
        }
        steps.push(currStep);

        if(node.name === end.name){
            currStep = {
                ...currStep,
                [node.name]: "visited"
            }
            steps.push(currStep);
            break;
        }

		let adjacentNodes = graph.get(node.name);

		adjacentNodes?.forEach((n) => {
			if (n.name in previous) return;

			previous[n.name] = node;
			queue.push(n);

            currStep = {
                ...currStep,
                [n.name]: "queued"
            }
		});

        currStep = {
            ...currStep,
            [node.name]: "visited"
        }
        steps.push(currStep);
	}

    // visualize the added path if there is a path
    if(end.name in previous) {
        let currNode: GridTile | null = end;
        while(currNode !== null) {
            currStep = {
                ...currStep,
                [currNode.name]: "path"
            }

            currNode = previous[currNode.name]
        }

        // Add the complete path
        steps.push(currStep)
    }

	return steps;
}