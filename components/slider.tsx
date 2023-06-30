import { useState, useRef } from "react";

export default function Slider({
	handler,
	initial,
	label,
}: {
	handler: (value: string) => number;
	initial: number;
	label: string;
}) {
	const [value, setValue] = useState(initial);
	const onChange = (event: React.ChangeEvent) => {
		const value: number = handler((event.target as HTMLInputElement).value);
		setValue(value);
	};
	const backgroundPercentage = (): { backgroundSize: string } => {
		return { backgroundSize: `${value}% 100%` };
	};

	return (
		<>
			<h3 className="text-white text-lg mt-5">{label}</h3>
			<input
				type="range"
				min={0}
				max={100}
				step=".01"
				value={value}
				style={backgroundPercentage()}
				onChange={onChange}
			/>
		</>
	);
}
