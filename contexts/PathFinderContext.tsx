import calcAlgSteps from "@/utils/calcAlgSteps";
import generateGraph from "@/utils/generateGraph";
import getGridTile from "@/utils/getGridTile";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from "react";
import { GridTile, GridTileColor, useGrid } from "./GridContext";

export type PathFinderStep = GridTileColor[][]

export type AlgorithmType = "bfs" | "dfs" | "dijkstra" | "astar"

export type PathFinderContextType = {
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

export const PathFinderProvider: FC<PropsWithChildren> = ({ children }) => {
    const { graph, startTile, endTile, setGridState } = useGrid();
    
    const [algorithm, setAlgorithm] = useState<AlgorithmType | undefined>();
    const [steps, setSteps] = useState<PathFinderStep[] | undefined>();

    console.log("Graph changed", graph, algorithm); // TODO test if algorithm changes if grid changes (due to changes from algo steps)

    const calcSteps = () => {
        if(algorithm === undefined)
            throw new Error("Algorithm must be selected first!");
        if(startTile === undefined)
            throw new Error("Starting grid tile must be defined");
        if(endTile === undefined)
            throw new Error("Goal grid tile must be defined");

        setGridState("algorithm");

        const newSteps = calcAlgSteps(algorithm, graph, startTile, endTile);
        setSteps(newSteps);
    }

    const value: PathFinderContextType = {
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
