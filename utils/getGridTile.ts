import { GridTile, GridTilePosition } from "@/contexts/GridContext";

export default function getGridTile(grid: GridTile[][], pos: GridTilePosition) {
    return grid[pos.row][pos.column];
}