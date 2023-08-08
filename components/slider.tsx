import { useState, useRef, useEffect } from "react";

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

	// ref for input element
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.backgroundSize = `${value}% 100%`;
		}
	}, [value]);

	return (
		<>
			<h3 className="text-white text-lg mt-5">{label}</h3>
			<input
				ref={inputRef}
				type="range"
				min={0}
				max={100}
				step=".01"
				value={value}
				style={{ backgroundSize: `${value}% 100%` }}
				onChange={onChange}
			/>
		</>
	);
}
