import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useMemo,
} from "react";

export type GridTilePosition = {
	row: number;
	column: number;
};

export type GridTileType = GridTilePosition & {
	isWall: boolean;
	color?: string;
	icon?: string;
};

type GridContextType = {
	height: number;
	width: number;
	startTile?: GridTilePosition;
	endTile?: GridTilePosition;
	grid: GridTileType[][];
};

// TODO default Values

const GridContext = createContext<GridContextType | null>(null);

export function useGrid() {
	const ctx = useContext(GridContext);

	if (ctx === null) throw new Error("Grid Context is not accessible here");

	return ctx;
}

export function useGridTile(row: number, col: number) {
	const ctx = useContext(GridContext);

	if (ctx === null)
        throw new Error("Grid Context is not accessible here");

	const { height, width, grid } = ctx; // TODO function to set wall on grid tile

    if(row < 0 || row >= height)
        throw new Error("Cannot get grid tile, row is out of bounds: " + row)

    if(col < 0 || col >= width)
        throw new Error("Cannot get grid tile, column is out of bounds: " + col)

    const gridTile = grid[row][col]
    return {
        ...gridTile,
        // TODO function here as well
    }
}

type GridProps = {
	width: number;
	height: number;
};

export const GridProvider: FC<PropsWithChildren<GridProps>> = ({
	children,
	width,
	height,
}) => {
	const grid = useMemo(() => createEmptyGrid(width, height), [width, height]);

	const createEmptyGrid = (
		width: number,
		height: number
	): GridTileType[][] => {
		return Array.from(Array(height)).map((_, row) => {
			return Array(width).map((_, column) => {
				return {
					row,
					column,
					isWall: false,
				} as GridTileType;
			});
		});
	};

	// TODO Functions to override the entire grid
	// TODO functions to generate new grid

	const value: GridContextType = {
		height,
		width,
		startTile: { row: 0, column: 0 },
		endTile: { row: width - 1, column: height - 1 },
		grid,
	};

	return (
		<GridContext.Provider value={value}>{children}</GridContext.Provider>
	);
};
