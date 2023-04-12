import calcAlgSteps from "@/utils/calcAlgSteps";
import generateGraph from "@/utils/generateGraph";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from "react";
import { GridTile, useGrid } from "./GridContext";

export type PathFinderStep = {
    grid: GridTile[][];
}

export type AlgorithmType = "bfs" | "dfs" | "dijkstra" | "astar";

export type PathFinderContextType = {
    startGrid: GridTile[][];
    graph: Map<String, Array<String>>;
    algorithm?: AlgorithmType;
    steps?: PathFinderStep[];
    currStep?: number;
    setAlgorithm: Dispatch<SetStateAction<AlgorithmType | undefined>>;
    calcSteps: () => void
}

const PathFinderContext = createContext<PathFinderContextType | null>(null);

export const usePathFinder = () => {
    const ctx = useContext(PathFinderContext);

    if(ctx === null)
        throw new Error("Path Finder Context is not available here");

    return ctx;
}

export type PathFinderProps = {
    startGrid: GridTile[][]
}

export const PathFinderProvider: FC<PropsWithChildren> = ({ children }) => {
    const { grid, startTile, endTile } = useGrid();
    const graph = useMemo(() => generateGraph(grid), [grid]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType | undefined>();
    const [steps, setSteps] = useState<PathFinderStep[] | undefined>();

    const calcSteps = () => {
        if(algorithm === undefined)
            throw new Error("Algorithm must be selected first!");
        if(startTile === undefined)
            throw new Error("Starting grid tile must be defined");
        if(endTile === undefined)
            throw new Error("Goal grid tile must be defined");

        const newSteps = calcAlgSteps(algorithm, grid, graph, `${startTile.row}-${startTile.column}`, `${endTile.row}-${endTile.column}`);
        setSteps(newSteps);
    }

    const value: PathFinderContextType = {
        startGrid: grid,
        graph,
        algorithm,
        steps,
        setAlgorithm,
        calcSteps
    }

    return (
        <PathFinderContext.Provider value={value}>
            {children}
        </PathFinderContext.Provider>
    )
}
