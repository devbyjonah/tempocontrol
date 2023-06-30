import { useRef, useState } from "react";

export default function TempoSlider({
	tempo,
	changeTempo,
}: {
	tempo: number;
	changeTempo: (value: number) => number;
}) {
	const [showTempoRange, setShowTempoRange] = useState(false);

	const sliderContainer = useRef<HTMLDivElement>(null);
	const slider = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	let currentY = 0,
		previousY = 0;
	const startDrag = (e: React.MouseEvent) => {
		previousY = e.clientY;
		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	};
	const handleMouseMove = (event: MouseEvent) => {
		currentY = event.clientY;
		let diff = currentY - previousY;
		const sliderHeight =
			sliderContainer.current?.getBoundingClientRect().height;
		const percentage = diff / (sliderHeight ?? 600 + 50);
		const newTempo = tempo - Math.round(percentage * 180);
		const updated = changeTempo(newTempo);

		if (inputRef.current) {
			inputRef.current.value = updated.toString();
		}
	};

	return (
		<div
			id="sliderContainer"
			ref={sliderContainer}
			style={{ height: "87%" }}
			className="text-white text-2xl w-16 text-center absolute top-14 left-1/2 -translate-x-1/2"
		>
			<div
				id="slider"
				ref={slider}
				onMouseDown={startDrag}
				style={{ bottom: ((tempo - 40) / 180) * 100 + "%" }}
				className="bg-accent sm:hover:scale-125 font-bold rounded border-4 border-primary absolute left-0 right-0"
			>
				<input
					ref={inputRef}
					type="text"
					defaultValue={tempo}
					className="bg-accent w-full text-center"
					onChange={(e) => {
						const value = parseInt(e.target.value);
						if (!value || value < 40 || value > 220) {
							setShowTempoRange(true);
							return;
						}
						setShowTempoRange(false);
						changeTempo(parseInt(e.target.value));
					}}
				/>
			</div>
			{showTempoRange && (
				<div
					className="bg-red-500 w-48 absolute rounded"
					style={{
						bottom: ((tempo - 40) / 180) * 100 + "%",
						left: "-225px",
					}}
					id="tempoRange"
				>
					<p className="text-base text-center p-2">
						Please enter a number between 40 and 220 beats per
						minute.
					</p>
				</div>
			)}
		</div>
	);
}
