import { useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";

export type Option<T> = {
	name: string;
	value: T;
};

// TODO make more generic, Button should be customizable and each item too
export default function Select<T>({
	options,
	option,
	title,
	setOption,
}: {
	options: Option<T>[];
	option: Option<T> | undefined;
	title: string;
	setOption: (option: T) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className={`relative text-xl text-white font-semibold min-w-[5rem]`}
			tabIndex={0}
			onBlur={() => setIsOpen(false)}
		>
			<div
				className={`${
					isOpen ? "bg-sky-800" : ""
				}  flex flex-row items-center justify-end p-2 gap-2 rounded-md hover:bg-sky-800 `}
				onClick={() => setIsOpen((open) => !open)}
			>
				<span className="whitespace-nowrap">{option === undefined? title : option.name}</span>
				<ChevronDown fill="white" size={15} />
			</div>
			<div
				className={`${
					isOpen ? "block" : "hidden"
				} absolute bg-sky-800 rounded-md right-0 flex flex-col gap-y-2 min-w-[5rem] overflow-clip`}
				style={{
					top: "calc(100% + 0.5rem)",
				}}
			>
				{options.map((opt) => {
					return (
						<div
							key={opt.name}
							className={`${
								option == opt ? "bg-sky-600" : ""
							} py-2 px-2 hover:bg-sky-500`}
							onClick={() => {
								setIsOpen(false);
								setOption(opt.value);
							}}
						>
							<span className="whitespace-nowrap">
								{opt.name}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
