import { useAlgorithm } from "@/contexts/AlgorithmContext";

const CalcStepsButton = () => {
	const { calcSteps, algorithm } = useAlgorithm();

	return (
		<button
			disabled={algorithm === undefined}
			onClick={() => calcSteps()}
			className={`p-2 rounded-md text-lg font-semibold ${
				algorithm === undefined
					? "bg-slate-400 text-slate-600 hover:bg-slate-300"
					: "bg-sky-600 text-slate-200 hover:bg-sky-500"
			}`}
			style={{
				filter: "drop-shadow(0 4px 4px rgb(0 0 0 / 0.6))",
			}}
		>
			Calculate algorithm steps!
		</button>
	);
};

export default CalcStepsButton;
