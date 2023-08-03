import { useRef, useState, useEffect } from "react";

export default function TempoSlider({
	tempo,
	changeTempo,
}: {
	tempo: number;
	changeTempo: (value: number) => number;
}) {
	const [showTempoRange, setShowTempoRange] = useState(false);
	const [tempoInput, setTempoInput] = useState(tempo.toString());

	const sliderContainer = useRef<HTMLDivElement>(null);
	const slider = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	type MouseAndTouch = React.TouchEvent | React.MouseEvent;
	let currentY = 0,
		previousY = 0;
	const startDrag = (e: MouseAndTouch) => {
		const handleEnd = () => {
			document.removeEventListener("touchmove", handleMove);
			document.removeEventListener("touchend", handleEnd);
			document.removeEventListener("mousemove", handleMove);
			window.removeEventListener("mouseup", handleEnd);
		};
		if (e.type === "touchstart") {
			previousY = (e as React.TouchEvent).touches[0].clientY;
			document.addEventListener("touchmove", handleMove);
			document.addEventListener("touchend", handleEnd);
		} else {
			previousY = (e as React.MouseEvent).clientY;
			document.addEventListener("mousemove", handleMove);
			window.addEventListener("mouseup", handleEnd);
		}
	};
	const handleMove = (event: MouseEvent | TouchEvent) => {
		if (event.type === "mousemove") {
			currentY = (event as MouseEvent).clientY;
		} else {
			currentY = (event as TouchEvent).touches[0].clientY;
		}
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

	useEffect(() => {
		setTempoInput(tempo.toString());
	}, [tempo]);

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
				onTouchStart={startDrag}
				style={{ bottom: ((tempo - 40) / 180) * 100 + "%" }}
				className="bg-accent touch-none sm:hover:scale-125 font-bold rounded border-4 border-primary absolute left-0 right-0"
			>
				<input
					ref={inputRef}
					type="text"
					maxLength={3}
					value={tempoInput}
					className="bg-accent w-full text-center"
					onChange={(e) => {
						let value: number | string = e.target.value;
						setTempoInput(value);
						value = parseInt(value);
						if (!value || value < 40 || value > 220) {
							setShowTempoRange(true);
						} else {
							setShowTempoRange(false);
							changeTempo(value);
						}
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
