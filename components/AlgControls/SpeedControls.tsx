import { SpeedType, useAlgorithm } from "@/contexts/AlgorithmContext";
import { useState } from "react";
import { ChevronUp, Speedometer2 } from "react-bootstrap-icons";

const SpeedControl = () => {
	const { speed, changeSpeed } = useAlgorithm();
	const [isOpen, setIsOpen] = useState(false);
	const speedOptions: SpeedType[] = [0.5, 1, 1.5, 2, 3, 5];

	// TODO
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
				<Speedometer2 fill="white" className="w-6 h-6 " style={{}} />
				<span className="text-center w-6">{speed}</span>
				<span>x</span>
				<ChevronUp fill="white" size={15} />
			</div>
			<div
				className={`${
					isOpen ? "block" : "hidden"
				} absolute bg-slate-800 rounded-md right-0 flex flex-col-reverse gap-y-2 overflow-clip`}
				style={{
					bottom: "calc(100% + 0.5rem)",
				}}
			>
				{speedOptions.map((option) => {
					return (
						<div
							key={option}
							className={`${
								speed == option ? "bg-slate-600" : ""
							} py-2 px-4 text-right hover:bg-slate-500`}
							onClick={() => {
								setIsOpen(false);
								changeSpeed(option);
							}}
						>
							{option} x
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SpeedControl;
