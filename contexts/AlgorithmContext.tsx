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
	isRunning: boolean;
	setAlgorithm: Dispatch<SetStateAction<AlgorithmType | undefined>>;
	calcSteps: () => void;
    stepForward: () => void;
    stepBackward: () => void;
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
	const { grid, gridState, startTile, endTile, setGridState } = useGrid();

	const [algorithm, setAlgorithm] = useState<AlgorithmType | undefined>(
		"bfs"
	);
	const [steps, setSteps] = useState<AlgorithmStep[] | undefined>();
	const [currStep, setCurrStep] = useState<number | undefined>();
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		// Reset the Algorithm state when the gridstate changes, meaning that the grid has changed
		// so the steps might not be the same anymore
		if (gridState === "init") {
            setSteps(undefined);
            setCurrStep(undefined);
            setIsRunning(false);
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
        setCurrStep(0);
	};

    const stepForward = () => {
        setCurrStep((step) => {
            if(step === undefined)
                return step;

            if(steps !== undefined && step >= steps.length)
                return step;

            return step + 1;
        })
    }

    const stepBackward = () => {
        setCurrStep((step) => {
            if(step === undefined)
                return step;

            if(steps !== undefined && step <= 0)
                return step;

            return step - 1;
        })
    }

	const value: AlgorithmContextType = {
		algorithm,
		steps,
		currStep,
		isRunning,
		setAlgorithm,
		calcSteps,
        stepForward,
        stepBackward
	};

	return (
		<AlgorithmContext.Provider value={value}>
			{children}
		</AlgorithmContext.Provider>
	);
};
