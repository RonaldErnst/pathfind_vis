import { useAlgorithm } from "@/contexts/AlgorithmContext";
import { SkipBackwardFill } from "react-bootstrap-icons";


const SkipStartButton = () => {
	const { skipToStart, currStep } = useAlgorithm();

	const handleReset = () => {
		skipToStart();
	};

	return (
		<button className="" onClick={handleReset}>
			<SkipBackwardFill
				fill={currStep !== undefined && currStep > 0 ? "white" : "gray"}
				className="w-8 h-8"
			/>
		</button>
	);
};

export default SkipStartButton;