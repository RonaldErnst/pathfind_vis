import { useAlgorithm } from "@/contexts/AlgorithmContext";
import { GridTilePosition, useGrid, useGridTile } from "@/contexts/GridContext";
import getAlgStepColor from "@/utils/getAlgStepColor";
import { Bullseye, CaretRightFill } from "react-bootstrap-icons";

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
	const { name, type, setGridTileType, isStart, isEnd, gridState } = useGridTile(
		row,
		column
	);
	const { steps, currStep, isRunning } = useAlgorithm();

	const handleOnClick = () => {
		// Start and end cannot be walls
		if (isStart || isEnd) return;

		const newType = type === "wall" ? "path" : "wall";
		setGridTileType(newType);
	};

	let color = "";

	if (gridState === "init") {
		if (type === "wall") color = "bg-slate-800";
		else color = "bg-slate-200";
	} else {
        if(steps !== undefined && currStep !== undefined)
            color = getAlgStepColor(steps[currStep][name]);
    }

	if (!isStart && !isEnd) color += " hover:bg-slate-400";

	return (
		<div className="w-full h-full">
			<div
				className={`w-full h-full aspect-square border border-blue-300 grid place-items-center p-2 ${color}`}
				onClick={handleOnClick}
			>
				{!isStart ? null : <CaretRightFill className="w-full h-full" />}
				{!isEnd ? null : <Bullseye className="w-full h-full" />}
			</div>
		</div>
	);
}
