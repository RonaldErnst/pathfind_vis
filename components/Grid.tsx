import { useAlgorithm } from "@/contexts/AlgorithmContext";
import {
	GridTilePosition,
	GridTileType,
	useGrid,
	useGridTile,
} from "@/contexts/GridContext";
import getAlgStepColor from "@/utils/getAlgStepColor";
import { FC, useCallback, useMemo } from "react";
import { Bullseye, CaretRightFill } from "react-bootstrap-icons";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type DragDropItem = {
	row: number;
	column: number;
	isStart: boolean;
};

export default function Grid() {
	const { width, grid } = useGrid();

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex justify-center items-center h-screen bg-slate-400">
				<div
					className="grid place-items-center w-full h-full box-border"
					style={{
						gridTemplateColumns: `repeat(${width}, minmax(32px, 1fr))`,
					}}
				>
					{grid.flat().map(({ row, column }, i) => {
						return <GridTile key={i} row={row} column={column} />;
					})}
				</div>
			</div>
		</DndProvider>
	);
}

function GridTile({ row, column }: GridTilePosition) {
	const { moveStartTile, moveEndTile } = useGrid();
	const { name, type, setGridTileType, isStart, isEnd } = useGridTile(
		row,
		column
	);
	const { steps, currStep } = useAlgorithm();

	const [{ isOver, canDrop }, drop] = useDrop<
		DragDropItem,
		unknown,
		{ isOver: boolean; canDrop: boolean }
	>({
		accept: "gridtile",
		canDrop: () => type === "path" && !isStart && !isEnd,
		drop: (item) => handleDrop(item),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const handleDrop = (item: DragDropItem) => {
		if (item.isStart) moveStartTile(row, column);
		else moveEndTile(row, column);
	};

	const handleOnClick = () => {
		// Start and end cannot be walls
		if (isStart || isEnd) return;

		const newType = type === "wall" ? "path" : "wall";
		setGridTileType(newType);
	};

	const getGridColor = useCallback(() => {
		let color;
		if (!isOver && !canDrop) {
			if (steps !== undefined && currStep !== undefined)
				color = getAlgStepColor(steps[currStep][name]);
			else color = getDefaultGridColor(type);
		} else if (isOver && !canDrop) color = "bg-red-500";
		else if (!isOver && canDrop) color = getDefaultGridColor(type);
		else color = "bg-emerald-400";

		if (!isStart && !isEnd) {
			if (type === "path") color += " hover:bg-slate-400";
			else color += " hover:bg-slate-600";
		}

		return color;
	}, [canDrop, currStep, isEnd, isOver, isStart, name, steps, type]);

	return (
		<div
			className={`border grid place-items-center p-2 w-full aspect-square border-blue-300 ${useMemo(
				() => getGridColor(),
				[getGridColor]
			)}`}
			onClick={handleOnClick}
			ref={drop}
		>
			{!isStart ? null : (
				<StartEndTile isStart={true} row={row} column={column} />
			)}
			{!isEnd ? null : (
				<StartEndTile isStart={false} row={row} column={column} />
			)}
		</div>
	);
}

const getDefaultGridColor = (gridTileType: GridTileType) =>
	gridTileType === "wall" ? "bg-slate-800" : "bg-slate-200";

const StartEndTile: FC<{ isStart: boolean; row: number; column: number }> = ({
	isStart,
	row,
	column,
}) => {
	const [{ isDragging }, drag] = useDrag<
		DragDropItem,
		unknown,
		{ isDragging: boolean }
	>(() => ({
		type: "gridtile",
		item: { row, column, isStart },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			className="w-full h-full"
			style={{
				opacity: isDragging ? 0.5 : 1,
			}}
			ref={drag}
		>
			{isStart ? (
				<CaretRightFill className="w-full h-full" />
			) : (
				<Bullseye className="w-full h-full" />
			)}
		</div>
	);
};
