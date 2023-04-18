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
                style={{
                    filter: "drop-shadow(0 4px 4px rgb(0 0 0 / 0.6))"
                }}
			/>
		</button>
	);
};

export default BackButton;