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
    setSpeed: Dispatch<SetStateAction<SpeedType>>;
	calcSteps: () => void;
    stepForward: () => void;
    stepBackward: () => void;
    runAnimation: () => void;
    stopAnimation: () => void;
    resetAlgorithm: () => void;
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
	const [timeouts, setTimeouts] = useState<NodeJS.Timer[] | undefined>();
    const [speed, setSpeed] = useState<SpeedType>(1);
    const timeoutLength = useMemo(() => (1 / speed) * 100, [speed]);

    const clearTimeouts = useCallback(() => {
        timeouts?.forEach((timeoutId) => {
            clearTimeout(timeoutId);
        })

        setTimeouts(undefined);
    }, [timeouts]);

	useEffect(() => {
		// Reset the Algorithm state when the gridstate changes, meaning that the grid has changed
		// so the steps might not be the same anymore
		if (gridState === "init") {
            setSteps(undefined);
            setCurrStep(undefined);
            clearTimeouts();
        }
	}, [clearTimeouts, gridState]);

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

    const runAnimation = () => {
        if(steps === undefined || currStep === undefined)
            return;

        let timeoutIDs = steps.filter((_, i) => i > currStep).map((_, i) => {
            const timeoutId = setTimeout(() => {
                stepForward();
            }, i * timeoutLength);

            return timeoutId;
        })

        timeoutIDs.push(setTimeout(() => {
            clearTimeouts();
        }, (timeoutIDs.length - 1) * timeoutLength))

        setTimeouts(timeoutIDs);
    }

    const stopAnimation = () => {
        clearTimeouts();
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

    const resetAlgorithm = () => {
        clearTimeouts();
        setCurrStep(0);
    }

	const value: AlgorithmContextType = {
		algorithm,
		steps,
		currStep,
        speed,
		isRunning: timeouts !== undefined,
		setAlgorithm,
        setSpeed,
		calcSteps,
        stepForward,
        stepBackward,
        runAnimation,
        stopAnimation,
        resetAlgorithm
	};

	return (
		<AlgorithmContext.Provider value={value}>
			{children}
		</AlgorithmContext.Provider>
	);
};
