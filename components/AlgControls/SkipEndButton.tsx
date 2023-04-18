import { useAlgorithm } from "@/contexts/AlgorithmContext";
import { SkipForwardFill } from "react-bootstrap-icons";

const SkipEndButton = () => {
	const { skipToEnd, currStep, steps } = useAlgorithm();

	const handleReset = () => {
		skipToEnd();
	};

	const reachedEnd =
		currStep !== undefined &&
		steps !== undefined &&
		currStep >= steps.length - 1;

	return (
		<button onClick={handleReset}>
			<SkipForwardFill
				fill={reachedEnd ? "gray" : "white"}
				className="w-8 h-8"
			/>
		</button>
	);
};

export default SkipEndButton;
