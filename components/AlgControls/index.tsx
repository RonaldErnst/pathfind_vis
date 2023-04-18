import { SpeedType, useAlgorithm } from "@/contexts/AlgorithmContext";
import { FC, useState } from "react";
import { ChevronUp, Speedometer2 } from "react-bootstrap-icons";
import BackButton from "./BackButton";
import ForwardButton from "./ForwardButton";
import PausePlayButton from "./PausePlayButton";
import SkipEndButton from "./SkipEndButton";
import SkipStartButton from "./SkipStartButton";
import SpeedControl from "./SpeedControls";
import ProgressBar from "./ProgressBar";

export default function AlgControls() {
	const { calcSteps, algorithm, steps } = useAlgorithm();

	return (
		<div className="absolute bottom-0 mb-8 grid place-items-center p-8 rounded-lg bg-opacity-60 bg-slate-500">
			{steps === undefined ? (
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
	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-row justify-center items-center gap-8">
				<SkipStartButton />
				<BackButton />
				<PausePlayButton />
				<ForwardButton />
				<SkipEndButton />
				<SpeedControl />
			</div>
			<ProgressBar />
		</div>
	);
};
