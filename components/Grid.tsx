import { GridTilePosition, useGrid, useGridTile } from "@/contexts/GridContext";

export default function Grid() {
	const { width, height, grid } = useGrid();

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${width}, minmax(16px, 1fr))`,
				gridTemplateRows: `repeat(${height}, minmax(16px, 1fr))`,
			}}
			className="w-full h-full bg-slate-400 justify-center"
		>
			{grid.flat().map(({ row, column }, i) => {
				return <GridTile key={i} row={row} column={column} />;
			})}
		</div>
	);
}

function GridTile({ row, column }: GridTilePosition) {
	const { type, setGridTileType, isStart, isEnd } = useGridTile(row, column);

	const handleOnClick = () => {
		const newType = type === "wall" ? "path" : "wall";
		setGridTileType(newType);
	};

	return (
		<div className="w-full h-full">
			<div
				className={`w-full h-full aspect-square border border-blue-300 ${
					type === "wall" ? "bg-slate-600" : "bg-slate-200"
				} hover:bg-slate-400`}
				onClick={handleOnClick}
			></div>
		</div>
	);
}
