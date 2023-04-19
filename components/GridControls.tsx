import { AlgorithmType, useAlgorithm } from "@/contexts/AlgorithmContext";
import { FC, MouseEventHandler } from "react";
import Select, { type Option } from "./Select";

export default function GridControls() {
	const { algorithm, setAlgorithm } = useAlgorithm();
	const algOptions: Option<AlgorithmType>[] = [
		{ value: "astar", name: "A*" },
		{ value: "bfs", name: "Breath First Search" },
		{ value: "dfs", name: "Depth First Search" },
		{ value: "dijkstra", name: "Dijkstra" },
	];

	const AlgSelect = Select<AlgorithmType>;

	return (
		<div className="w-full md:w-min h-full flex">
            <AlgSelect
                option={algOptions.find(option => option.value == algorithm)}
                setOption={setAlgorithm}
                options={algOptions}
                title={"Algorithm"}
            />
		</div>
	);
}

const Button: FC<{
	text: string;
	onClick: MouseEventHandler<HTMLDivElement>;
}> = ({ text, onClick }) => {
	return (
		<div onClick={onClick} className="">
			{text}
		</div>
	);
};

