import { GraphType } from "@/contexts/AlgorithmContext";
import { GridTile } from "@/contexts/GridContext";

export default function generateGraph(grid: GridTile[][]): GraphType {
    const graph = new Map<string, Array<GridTile>>();

    for(let i = 0; i < grid.length; i++) {
        let row = grid[i]
        for(let j = 0; j < row.length; j++) {
            graph.set(`${i}-${j}`, getAdjacentTiles(i, j, grid))
        }
    }

    return graph;
}

function getAdjacentTiles(row: number, column: number, grid: GridTile[][]) {
    const adjacentTiles = new Array<GridTile>();

    if(row > 0 && grid[row-1][column].type === "path")
        adjacentTiles.push(grid[row-1][column]);

    if(column > 0 && grid[row][column-1].type === "path")
        adjacentTiles.push(grid[row][column-1]);

    if(row < grid.length - 1 && grid[row+1][column].type === "path")
        adjacentTiles.push(grid[row+1][column])

    if(grid.length > 0 && column < grid[0].length - 1 && grid[row][column+1].type === "path")
        adjacentTiles.push(grid[row][column+1])

    return adjacentTiles;
}