import calcAlgSteps from "@/utils/calcAlgSteps";
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { GridTile, useGrid } from "./GridContext";

export type GridTileColor =
	| "unvisited"
    | "queued"
	| "visiting"
	| "visited"
    | "path"
	| "wall";

export type AlgorithmStep = Record<string, GridTileColor>;

export type AlgorithmType = "bfs" | "dfs" | "dijkstra" | "astar";

export type AlgorithmContextType = {
	algorithm?: AlgorithmType;
	steps?: AlgorithmStep[];
	currStep?: number;
	setAlgorithm: Dispatch<SetStateAction<AlgorithmType | undefined>>;
	calcSteps: () => void;
};

export type GraphType = Map<string, Array<GridTile>>;

const AlgorithmContext = createContext<AlgorithmContextType | null>(null);

export const useAlgorithm = () => {
	const ctx = useContext(AlgorithmContext);

	if (ctx === null)
		throw new Error("Path Finder Context is not available here");

	return ctx;
};

export const AlgorithmProvider: FC<PropsWithChildren> = ({ children }) => {
	const { grid, gridState, gridTileMap, startTile, endTile, setGridState } = useGrid();

	const [algorithm, setAlgorithm] = useState<AlgorithmType | undefined>();
	const [steps, setSteps] = useState<AlgorithmStep[] | undefined>();

	useEffect(() => {
        // Reset the Algorithm state when the gridstate changes, meaning that the grid has changed 
        // And the algorithm and steps might not be the same anymore
        if(gridState === "init") {
            setAlgorithm(undefined)
            setSteps(undefined)
        }
    }, [gridState]);

	const calcSteps = () => {
		if (algorithm === undefined)
			throw new Error("Algorithm must be selected first!");
		if (startTile === undefined)
			throw new Error("Starting grid tile must be defined");
		if (endTile === undefined)
			throw new Error("Goal grid tile must be defined");

		setGridState("algorithm");

		const newSteps = calcAlgSteps(algorithm, grid, startTile, endTile);
		setSteps(newSteps);
	};

	const value: AlgorithmContextType = {
		algorithm,
		steps,
		setAlgorithm,
		calcSteps,
	};

	return (
		<AlgorithmContext.Provider value={value}>
			{children}
		</AlgorithmContext.Provider>
	);
};
