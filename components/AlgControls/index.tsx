import { useAlgorithm } from "@/contexts/AlgorithmContext";
import BackButton from "./BackButton";
import CalcStepsButton from "./CalcStepsButton";
import ForwardButton from "./ForwardButton";
import PausePlayButton from "./PausePlayButton";
import ProgressBar from "./ProgressBar";
import SkipEndButton from "./SkipEndButton";
import SkipStartButton from "./SkipStartButton";
import SpeedControl from "./SpeedControls";

export default function AlgControls() {
	const { steps } = useAlgorithm();

	return (
		<div className="absolute bottom-0 mb-8 grid place-items-center p-8 rounded-lg bg-opacity-60 bg-slate-500">
			{steps === undefined ? <CalcStepsButton /> : <SimulationControls />}
		</div>
	);
}

const SimulationControls = () => {
	return (
		<div
			className="flex justify-center items-center"
			style={{
				filter: "drop-shadow(0 4px 4px rgb(0 0 0 / 0.5))",
			}}
		>
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
