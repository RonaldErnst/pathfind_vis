import { useAlgorithm } from "@/contexts/AlgorithmContext";
import { SkipStartFill } from "react-bootstrap-icons";

const BackButton = () => {
	const { currStep, stepBackward, stopAnimation } = useAlgorithm();

    const handleClick = () => {
        stopAnimation();
        stepBackward();
    }

	return (
		<button disabled={currStep === 0} onClick={handleClick}>
			<SkipStartFill
				fill={currStep === 0 ? "gray" : "white"}
				className="w-10 h-10"
			/>
		</button>
	);
};

export default BackButton;