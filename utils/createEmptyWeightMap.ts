import { GridTile } from "@/contexts/GridContext";

export default function createEmptyWeightMap(grid: GridTile[][]): Record<string, number> {
    return grid.flat().reduce((acc, tile) => {
        return {...acc, [tile.name]: 1}
    }, {})
}