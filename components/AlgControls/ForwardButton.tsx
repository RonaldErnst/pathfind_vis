import { useAlgorithm } from "@/contexts/AlgorithmContext";
import { SkipEndFill } from "react-bootstrap-icons";

const ForwardButton = () => {
	const { stepForward, stopAnimation, currStep, steps } = useAlgorithm();

	const handleClick = () => {
		stopAnimation();
		stepForward();
	};

	const reachedEnd =
		currStep !== undefined &&
		steps !== undefined &&
		currStep >= steps.length - 1;

	return (
		<button disabled={reachedEnd} onClick={handleClick}>
			<SkipEndFill
				fill={reachedEnd ? "gray" : "white"}
				className="w-10 h-10"
			/>
		</button>
	);
};

export default ForwardButton;
