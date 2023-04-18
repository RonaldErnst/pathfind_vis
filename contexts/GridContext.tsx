import createEmptyGrid from "@/utils/createEmptyGrid";
import createEmptyWeightMap from "@/utils/createEmptyWeightMap";
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
	grid: GridTile[][];
    gridTileMap: Record<string, GridTile>,
    weightMap: Record<string, number>,
    startTilePos: GridTilePosition;
    endTilePos: GridTilePosition;
    startTile: GridTile;
    endTile: GridTile;
	setGrid: Dispatch<SetStateAction<GridTile[][]>>;
	setGridTileType: (row: number, column: number, type: GridTileType) => void;
    setGridTileWeight: (gridtile: string, weight: number) => void;
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
	const [grid, setGrid] = useState<GridTile[][]>(() =>
		createEmptyGrid(width, height)
	);
    const [weightMap, setWeightMap] = useState<Record<string, number>>(() => createEmptyWeightMap(grid)); // TODO see if use state works this way
    const [startTilePos, setStartTilePos] = useState<GridTilePosition>({row: 0, column: 0});
    const [endTilePos, setEndTilePos] = useState<GridTilePosition>({row: height - 1, column: width - 1});

    const startTile = useMemo(() => grid[startTilePos?.row][startTilePos?.column], [startTilePos, grid]);
    const endTile = useMemo(() => grid[endTilePos?.row][endTilePos?.column], [endTilePos, grid]);
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
	};

    const moveStartTile = (row: number, column: number) => {
        setStartTilePos({row, column});
    }

    const moveEndTile = (row: number, column: number) => {
        setEndTilePos({row, column});
    }

    const setGridTileWeight = (gridtile: string, weight: number) => {
        setWeightMap((currMap) => {
            currMap[gridtile] = weight;
            return {...currMap};
        });
    }

	// TODO functions to generate new grid

	const value: GridContextType = {
		height,
		width,
		grid,
        weightMap,
        gridTileMap,
        startTilePos,
        endTilePos,
        startTile,
        endTile,
		setGrid,
		setGridTileType,
		setGridTileWeight,
        moveStartTile,
        moveEndTile
	};

	return (
		<GridContext.Provider value={value}>{children}</GridContext.Provider>
	);
};
