import { SpeedType, useAlgorithm } from "@/contexts/AlgorithmContext";
import { useGrid } from "@/contexts/GridContext";
import { FC, useEffect, useState } from "react";
import {
	ArrowCounterclockwise,
	ChevronUp,
	PauseFill,
	PlayFill,
	SkipEndFill,
	SkipStartFill,
	Speedometer2,
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
		resetAlgorithm,
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
	};

	const reachedEnd =
		currStep !== undefined &&
		steps !== undefined &&
		currStep >= steps.length - 1;

	return (
		<div className="">
			<div className="flex flex-row justify-center items-center gap-8">
				{currStep !== undefined && currStep > 0 ? (
					<button onClick={handleReset}>
						<ArrowCounterclockwise
							fill="white"
							className="w-8 h-8"
						/>
					</button>
				) : null}
				<button disabled={currStep === 0} onClick={handleStepBackward}>
					<SkipStartFill
						fill={currStep === 0 ? "gray" : "white"}
						className="w-10 h-10"
					/>
				</button>
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
				<button disabled={reachedEnd} onClick={handleStepForward}>
					<SkipEndFill
						fill={reachedEnd ? "gray" : "white"}
						className="w-10 h-10"
					/>
				</button>
				<SpeedControl />
			</div>
		</div>
	);
};

const SpeedControl: FC = () => {
	const { speed, setSpeed } = useAlgorithm();
	const [isOpen, setIsOpen] = useState(false);
	const speedOptions: SpeedType[] = [0.5, 1, 1.5, 2, 3, 5];

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])

	return (
		<div
			className={`relative text-xl text-white font-semibold `}
            tabIndex={0}
            onBlur={() => setIsOpen(false)}
		>
            <div
                className={`flex justify-center items-center gap-2 p-1 rounded-md hover:bg-slate-800 ${
                    isOpen ? "bg-slate-800" : ""
                }`}
                onClick={() => setIsOpen((open) => !open)}
            >
                <Speedometer2 fill="white" className="w-6 h-6" />
                <span className="text-right w-12">{speed} x</span>
                <ChevronUp fill="white" size={15} />
            </div>
			<div
				className={`${
					isOpen ? "block" : "hidden"
				} absolute bg-slate-800 rounded-md right-0`}
				style={{
					bottom: "calc(100% + 0.5rem)",
				}}
			>
				{speedOptions.map((option) => {
					return (
						<div key={option} className={`${speed == option? "bg-slate-600" : ""} px-4 py-2 my-2 text-right hover:bg-slate-500`}
                            onClick={() => {
                                setIsOpen(false);
                                setSpeed(option);
                            }} >
							{option} x
						</div>
					);
				})}
			</div>
		</div>
	);
};
