import { useAlgorithm } from "@/contexts/AlgorithmContext";
import { useGrid } from "@/contexts/GridContext";
import { useState } from "react";
import {
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
	const { steps, currStep, isRunning, stepForward, stepBackward } = useAlgorithm();

    const handleStepForward = () => {
        stepForward();
    }

    const handleStepBackward = () => {
        stepBackward();
    }

	return (
		<div className="flex flex-row justify-center items-center gap-8">
			<button disabled={currStep === 0} onClick={handleStepBackward}>
				<SkipStartFill fill="white" className="w-10 h-10"/>
			</button>
			<button>{isRunning ? <PauseFill fill="white" className="w-10 h-10"/> : <PlayFill fill="white" className="w-10 h-10"/>}</button>
			<button disabled={currStep === steps?.length} onClick={handleStepForward}>
				<SkipEndFill fill="white" className="w-10 h-10"/>
			</button>
		</div>
	);
};
