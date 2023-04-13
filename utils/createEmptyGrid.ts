import { GridTile } from "@/contexts/GridContext";

export default function createEmptyGrid(width: number, height: number): GridTile[][] {
    const grid = Array.from(Array(height)).map((_, row) => {
        return Array.from(Array(width)).map((_, column) => {
            return {
                row,
                column,
                type: "path",
                name: `${row}-${column}`
            } as GridTile;
        });
    });

    return grid;
};