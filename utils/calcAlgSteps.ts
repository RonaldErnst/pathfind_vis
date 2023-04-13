import { astar, bfs, dfs, dijkstra } from "@/algorithms";
import { AlgorithmType } from "@/contexts/AlgorithmContext";
import { GridTile } from "@/contexts/GridContext";
import generateGraph from "./generateGraph";

export default function calcAlgSteps(
	algType: AlgorithmType,
	grid: GridTile[][],
	start: GridTile,
	end: GridTile
) {
	const graph = generateGraph(grid);

	switch (algType) {
		case "bfs":
			return bfs(grid, graph, start, end);
		case "dfs":
			return dfs(grid, graph, start, end);
		case "dijkstra":
			return dijkstra(grid, graph, start, end);
		case "astar":
			return astar(grid, graph, start, end);
		default:
			throw new Error(`Unknown Algorithm ${algType}`);
	}
}
