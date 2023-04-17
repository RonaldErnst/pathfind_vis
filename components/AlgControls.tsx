import { useAlgorithm } from "@/contexts/AlgorithmContext";
import { useGrid } from "@/contexts/GridContext";
import {
	ArrowCounterclockwise,
	PauseFill,
	PlayFill,
	SkipEndFill,
	SkipStartFill,
} from "react-bootstrap-icons";

export default function AlgControls() {
	const { gridState } = useGrid();
	const { calcSteps, algorithm, steps } = useAlgorithm();

	return (
		<div className="absolute bottom-0 mb-8 grid place-items-center p-8 rounded-lg bg-opacity-80 bg-slate-600">
			{gridState === "init" ? (
				<button
					className={`p-2 rounded-md text-lg font-semibold ${
						algorithm === undefined
							? "bg-slate-400 text-slate-600 hover:bg-slate-300"
							: "bg-emerald-600 text-slate-200 hover:bg-emerald-500"
					}`}
					disabled={algorithm === undefined}
					onClick={() => calcSteps()}
				>
					Calculate algorithm steps!
				</button>
			) : (
				<SimulationControls />
			)}
		</div>
	);
}

const SimulationControls = () => {
	const {
		steps,
		currStep,
		isRunning,
		stepForward,
		stepBackward,
		runAnimation,
		stopAnimation,
        resetAlgorithm
	} = useAlgorithm();

	const handleStepForward = () => {
		stepForward();
	};

	const handleStepBackward = () => {
		stepBackward();
	};

	const handlePausePlay = () => {
		if (isRunning) stopAnimation();
		else runAnimation();
	};

    const handleReset = () => {
        resetAlgorithm();
    }

    const reachedEnd = currStep !== undefined && steps !== undefined && currStep >= steps.length - 1;

	return (
		<div className="flex flex-row justify-center items-center gap-8">
			{currStep !== undefined && currStep > 0 ? (
				<button onClick={handleReset}><ArrowCounterclockwise fill="white" className="w-8 h-8"/></button>
			) : null}
			<button disabled={currStep === 0} onClick={handleStepBackward}>
				<SkipStartFill fill={currStep === 0? "gray" : "white"} className="w-10 h-10" />
			</button>
			<button onClick={handlePausePlay} disabled={reachedEnd}>
				{isRunning ? (
					<PauseFill fill="white" className="w-10 h-10" />
				) : (
					<PlayFill fill={reachedEnd? "gray" : "white"} className="w-10 h-10" />
				)}
			</button>
			<button
				disabled={reachedEnd}
				onClick={handleStepForward}
			>
				<SkipEndFill fill={reachedEnd? "gray" : "white"} className="w-10 h-10" />
			</button>
		</div>
	);
};
