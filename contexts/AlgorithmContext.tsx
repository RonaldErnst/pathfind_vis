import calcAlgSteps from "@/utils/calcAlgSteps";
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useMemo,
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

export type SpeedType = 0.5 | 1 | 1.5 | 2 | 3 | 5;

export type AlgorithmContextType = {
	algorithm?: AlgorithmType;
	steps?: AlgorithmStep[];
	currStep?: number;
	speed: SpeedType;
	isRunning: boolean;
	setAlgorithm: Dispatch<SetStateAction<AlgorithmType | undefined>>;
	changeSpeed: (speed: SpeedType) => void;
	calcSteps: () => void;
	stepForward: () => void;
	stepBackward: () => void;
	startAnimation: () => void;
	stopAnimation: () => void;
	skipToStart: () => void;
    skipToEnd: () => void;
};

export type GridState = "init" | "algorithm";

export type GraphType = Map<string, Array<GridTile>>;

const AlgorithmContext = createContext<AlgorithmContextType | null>(null);

export const useAlgorithm = () => {
	const ctx = useContext(AlgorithmContext);

	if (ctx === null)
		throw new Error("Path Finder Context is not available here");

	return ctx;
};

export const AlgorithmProvider: FC<PropsWithChildren> = ({ children }) => {
	const { grid, startTile, endTile, startTilePos, endTilePos } = useGrid();
	const [gridState, setGridState] = useState<GridState>("init");

	const [algorithm, setAlgorithm] = useState<AlgorithmType | undefined>(
		"bfs"
	);
	const [steps, setSteps] = useState<AlgorithmStep[] | undefined>();
	const [currStep, setCurrStep] = useState<number | undefined>();
	const [speed, setSpeed] = useState<SpeedType>(1);
	const [timeouts, setTimeouts] = useState<NodeJS.Timer[] | undefined>();

	const isRunning = useMemo(() => timeouts !== undefined, [timeouts]);
	const timeoutLength = useMemo(() => (1 / speed) * 100, [speed]);

	const stopAnimation = useCallback(() => {
		timeouts?.forEach((timeoutId) => {
			clearTimeout(timeoutId);
		});

		setTimeouts(undefined);
	}, [timeouts]);

	useEffect(() => {
		setGridState("init");
	}, [grid, startTilePos, endTilePos]);

	useEffect(() => {
		// Reset the Algorithm state when the gridstate changes, meaning that the grid has changed
		// so the steps might not be the same anymore
		if (gridState === "init") {
			setSteps(undefined);
			setCurrStep(undefined);
			stopAnimation();
		}
	}, [gridState, stopAnimation]);

	useEffect(() => {
		if (isRunning) {
			// Restart animation with new
			stopAnimation();
			startAnimation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [speed]);

	const calcSteps = () => {
		if (algorithm === undefined)
			throw new Error("Algorithm must be selected first!");

		const newSteps = calcAlgSteps(algorithm, grid, startTile, endTile);
		setSteps(newSteps);
		setCurrStep(0);
		setGridState("algorithm");
	};

	function createAnimationSteps(): NodeJS.Timer[] | undefined {
		if (steps === undefined || currStep === undefined) return;

		let timeoutIDs = steps
			.filter((_, i) => i > currStep)
			.map((_, i) => {
				const timeoutId = setTimeout(() => {
					stepForward();
				}, i * timeoutLength);

				return timeoutId;
			});

		timeoutIDs.push(
			setTimeout(() => {
				stopAnimation();
			}, (timeoutIDs.length - 1) * timeoutLength)
		);

		return timeoutIDs;
	}

	const stepForward = () => {
		setCurrStep((step) => {
			if (step === undefined) return step;

			if (steps !== undefined && step >= steps.length) return step;

			return step + 1;
		});
	};

	const stepBackward = () => {
		setCurrStep((step) => {
			if (step === undefined) return step;

			if (steps !== undefined && step <= 0) return step;

			return step - 1;
		});
	};

	const startAnimation = () => {
		setTimeouts(createAnimationSteps());
	};

	const skipToStart = () => {
		stopAnimation();
		setCurrStep(0);
	};

    const skipToEnd = () => {
        stopAnimation();
        if(steps !== undefined)
        setCurrStep(steps?.length - 1);
    }

	const changeSpeed = (speed: SpeedType) => {
		setSpeed(speed);
	};

	const value: AlgorithmContextType = {
		algorithm,
		steps,
		currStep,
		speed,
		isRunning,
		setAlgorithm,
		changeSpeed,
		calcSteps,
		stepForward,
		stepBackward,
		startAnimation,
		stopAnimation,
		skipToStart,
        skipToEnd,
	};

	return (
		<AlgorithmContext.Provider value={value}>
			{children}
		</AlgorithmContext.Provider>
	);
};
