import createEmptyGrid from "@/utils/createEmptyGrid";
import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useState,
} from "react";

export type GridTilePosition = {
	row: number;
	column: number;
};

export type GridTileType = "empty" | "wall";
export type GridTile = GridTilePosition & {
	type: GridTileType;
	color?: string;
	icon?: string;
};

type GridContextType = {
	height: number;
	width: number;
	startTile?: GridTilePosition;
	endTile?: GridTilePosition;
	grid: GridTile[][];

	setGridTileType: (row: number, column: number, type: GridTileType) => void;
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
    const [startTile, setStartTile] = useState({ row: 0, column: 0 });
    const [endTile, setEndTile] = useState({ row: width - 1, column: height - 1 });
	const [grid, setGrid] = useState(() => createEmptyGrid(width, height));
    
	const setGridTileType = (
		row: number,
		column: number,
		type: GridTileType
	) => {
		setGrid((currGrid) => {
			const copy = [...currGrid];
			copy[row][column].type = type;

			return copy;
		});
	};

	// TODO Functions to override the entire grid
	// TODO functions to generate new grid

	const value: GridContextType = {
		height,
		width,
		startTile,
        endTile,
		grid,
		setGridTileType,
	};

	return (
		<GridContext.Provider value={value}>{children}</GridContext.Provider>
	);
};
