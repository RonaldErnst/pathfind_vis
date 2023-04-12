import createEmptyGrid from "@/utils/createEmptyGrid";
import generateGraph from "@/utils/generateGraph";
import getGridTile from "@/utils/getGridTile";
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react";


export type GridState = "init" | "algorithm";

export type GridTilePosition = {
	row: number;
	column: number;
};

export type GridTileType = "empty" | "wall";
export type GridTileColor = "unvisited" | "visited" | "path" | "wall";
export type GridTile = GridTilePosition & {
	name: string;
	type: GridTileType;
	color?: GridTileColor;
	icon?: string;
};

export type GraphType = Map<string, Array<string>>;
type GridContextType = {
	height: number;
	width: number;
	gridState: GridState;
	startTile: GridTile;
	endTile: GridTile;
	grid: GridTile[][];
	graph: GraphType;
	setGrid: Dispatch<SetStateAction<GridTile[][]>>;
	setGridTileType: (row: number, column: number, type: GridTileType) => void;
	setGridState: Dispatch<SetStateAction<GridState>>;
	moveStartTile: (row: number, column: number) => void;
	moveEndTile: (row: number, column: number) => void;
};

const GridContext = createContext<GridContextType | null>(null);

export function useGrid() {
	const ctx = useContext(GridContext);

	if (ctx === null) throw new Error("Grid Context is not accessible here");

	return ctx;
}

export function useGridTile(row: number, column: number) {
	const ctx = useContext(GridContext);

	if (ctx === null) throw new Error("Grid Context is not accessible here");

	const { height, width, grid, setGridTileType } = ctx; // TODO function to set wall on grid tile

	if (row < 0 || row >= height)
		throw new Error("Cannot get grid tile, row is out of bounds: " + row);

	if (column < 0 || column >= width)
		throw new Error(
			"Cannot get grid tile, column is out of bounds: " + column
		);

	const gridTile = grid[row][column];
	return {
		...gridTile,
		setGridTileType: (type: GridTileType) =>
			setGridTileType(row, column, type),
	};
}

export const GridProvider: FC<PropsWithChildren> = ({ children }) => {
	const [height, setHeight] = useState(16); // TODO maybe different default value?
	const [width, setWidth] = useState(20); // TODO
	const [gridState, setGridState] = useState<GridState>("init");
    const [startGridPos, setStartGridPos] = useState<GridTilePosition>({ row: 0, column: 0 });
    const [endGridPos, setEndGridPos] = useState<GridTilePosition>({ row: width - 1, column: height - 1 });
	const [grid, setGrid] = useState<GridTile[][]>(() => createEmptyGrid(width, height));
	const graph = useMemo(() => generateGraph(grid), [grid]);
    
	const setGridTileType = (
		row: number,
		column: number,
		type: GridTileType
	) => {
		setGrid((currGrid) => {
			currGrid[row][column].type = type;

			return [...currGrid];
		});

		setGridState("init"); // Grid got changed, cancel Algorithm
	};

	const moveStartTile = (row: number, column: number) => {
		if(startGridPos.row === row && startGridPos.column === column)
			return; // Cannot place start on the same tile again

		if(endGridPos.row === row && endGridPos.column === column)
			return; // Start cannot be the same tile as goal

		setStartGridPos({row, column});
		setGridState("init"); // Grid got changed, cancel Algorithm
	}

	const moveEndTile = (row: number, column: number) => {
		if(startGridPos.row === row && startGridPos.column === column)
			return; // Start cannot be the same tile as goal

		if(endGridPos.row === row && endGridPos.column === column)
			return; // Cannot place goal on the same tile again 

		setEndGridPos({row, column});
		setGridState("init"); // Grid got changed, cancel Algorithm
	}

	// TODO functions to generate new grid

	const value: GridContextType = {
		height,
		width,
		gridState,
		startTile: useMemo(() => getGridTile(grid, startGridPos), [grid, startGridPos]),
        endTile: useMemo(() => getGridTile(grid, endGridPos), [grid, endGridPos]),
		grid,
		graph,
		setGridTileType,
		moveStartTile,
		moveEndTile,
		setGrid,
		setGridState
	};

	return (
		<GridContext.Provider value={value}>{children}</GridContext.Provider>
	);
};
