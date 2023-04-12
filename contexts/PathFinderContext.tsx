import { createContext, FC, PropsWithChildren, useContext } from "react";
import { GridTile } from "./GridContext";

export type PathFinderStep = {
    grid: GridTile[][];
}

export type PathFinderContextType = {
    startGrid: GridTile[][];
    steps?: PathFinderStep[];
    currStep?: number;
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

export const PathFinderProvider: FC<PropsWithChildren<PathFinderProps>> = ({ children, startGrid }) => {

    const value: PathFinderContextType = {
        startGrid
    }

    return (
        <PathFinderContext.Provider value={value}>
            {children}
        </PathFinderContext.Provider>
    )
}
