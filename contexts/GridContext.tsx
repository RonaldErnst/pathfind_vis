import createEmptyGrid from "@/utils/createEmptyGrid";
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

export type GridTileType = "path" | "wall";
export type GridTile = GridTilePosition & {
	name: string;
	type: GridTileType;
};

type GridContextType = {
	height: number;
	width: number;
	gridState: GridState;
	grid: GridTile[][];
    gridTileMap: Record<string, GridTile>,
    startTile?: GridTile;
    endTile?: GridTile;
	setGrid: Dispatch<SetStateAction<GridTile[][]>>;
	setGridTileType: (row: number, column: number, type: GridTileType) => void;
	setGridState: Dispatch<SetStateAction<GridState>>;
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

	const { height, width, grid, setGridTileType, startTile, endTile } = ctx;

	if (row < 0 || row >= height)
		throw new Error("Cannot get grid tile, row is out of bounds: " + row);

	if (column < 0 || column >= width)
		throw new Error(
			"Cannot get grid tile, column is out of bounds: " + column
		);

	const gridTile = grid[row][column];
	return {
		...gridTile,
        isStart: startTile === undefined? false : startTile.row === row && startTile.column === column,
        isEnd: endTile === undefined? false : endTile.row === row && endTile.column === column,
		setGridTileType: (type: GridTileType) =>
			setGridTileType(row, column, type),
	};
}

type GridProviderProps = {
    height: number;
    width: number;
}

export const GridProvider: FC<PropsWithChildren<GridProviderProps>> = ({ children, height: initialHeight, width: initialWidth }) => {
	const [height, setHeight] = useState(initialHeight);
	const [width, setWidth] = useState(initialWidth);
	const [gridState, setGridState] = useState<GridState>("init");
	const [grid, setGrid] = useState<GridTile[][]>(() =>
		createEmptyGrid(width, height)
	);
    const [startTilePos, setStartTilePos] = useState<GridTilePosition | undefined>({row: 0, column: 0});
    const [endTilePos, setEndTilePos] = useState<GridTilePosition | undefined>({row: height - 1, column: width - 1});

    const startTile = useMemo(() => startTilePos === undefined? undefined : grid[startTilePos?.row][startTilePos?.column], [startTilePos, grid]);
    const endTile = useMemo(() => endTilePos === undefined? undefined : grid[endTilePos?.row][endTilePos?.column], [endTilePos, grid]);
    const gridTileMap = useMemo(() => grid.flat().reduce<Record<string, GridTile>>((acc, tile) => ({...acc, [tile.name]: tile}), {}), [grid]);

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

	// TODO functions to generate new grid

	const value: GridContextType = {
		height,
		width,
		gridState,
		grid,
        gridTileMap,
        startTile,
        endTile,
		setGridTileType,
		setGrid,
		setGridState,
	};

	return (
		<GridContext.Provider value={value}>{children}</GridContext.Provider>
	);
};
