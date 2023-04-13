import { AlgorithmStep, GraphType } from "@/contexts/AlgorithmContext";
import { GridTile } from "@/contexts/GridContext";

export default function bfs(
	grid: GridTile[][],
	graph: GraphType,
	start: GridTile,
	end: GridTile
) {
	const steps: AlgorithmStep[] = [];

	const visited = new Set(start.name);
	const queue = [start.name];

	let currStep = grid.map((row) =>
		row.map((col) => (col.type === "wall" ? "wall" : "unvisited"))
	);
	steps.push([...currStep]);

	while (queue.length > 0) {
		let node = queue.shift()!;

		let adjacentNodes = graph.get(node);

		adjacentNodes?.forEach((n) => {
			if (visited.has(n)) return;

			visited.add(n);
			queue.push(n);
		});
	}

	return steps;
}
