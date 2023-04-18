import { useAlgorithm } from "@/contexts/AlgorithmContext";
import { PauseFill, PlayFill } from "react-bootstrap-icons";

const PausePlayButton = () => {
	const { startAnimation, stopAnimation, isRunning, currStep, steps } =
		useAlgorithm();

	const handlePausePlay = () => {
		if (isRunning) stopAnimation();
		else startAnimation();
	};

	const reachedEnd =
		currStep !== undefined &&
		steps !== undefined &&
		currStep >= steps.length - 1;

	return (
		<button onClick={handlePausePlay} disabled={reachedEnd}>
			{isRunning ? (
				<PauseFill fill="white" className="w-10 h-10" />
			) : (
				<PlayFill
					fill={reachedEnd ? "gray" : "white"}
					className="w-10 h-10"
				/>
			)}
		</button>
	);
};

export default PausePlayButton;