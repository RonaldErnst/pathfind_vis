import { GridTilePosition, useGrid, useGridTile } from "@/contexts/GridContext";
import { useState } from "react";

export default function Grid() {
    const { width, height, grid } = useGrid();

	return (
		<div
			style={{
				gap: "4px",
				display: "grid",
				gridTemplateColumns: `repeat(${width}, minmax(16px, 1fr))`,
				gridTemplateRows: `repeat(${height}, minmax(16px, 1fr))`,
			}}
			className="w-full h-full bg-slate-400 justify-center"
		>
			{grid.flat().map(({row, column}, i) => {
				return <GridTile key={i} row={row} column={column} />;
			})}
		</div>
	);
}

function GridTile({row, column}: GridTilePosition) {
	const { isWall, icon, color } = useGridTile(row, column);

	return (
		<div className="w-full h-full grid justify-center">
			<div
				className={`w-full h-full aspect-square border ${
					isWall ? "bg-slate-600" : "bg-slate-200"
				} hover:bg-slate-500`}
				onClick={() => setIsWall((w) => !w)}
			></div>
		</div>
	);
}
