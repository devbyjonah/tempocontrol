import { useRef } from "react";

export default function TempoSlider({
	tempo,
	changeTempo,
}: {
	tempo: number;
	changeTempo: (value: number) => number;
}) {
	const sliderContainer = useRef<HTMLDivElement>(null);
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
		changeTempo(newTempo);
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
				onMouseDown={startDrag}
				style={{ bottom: ((tempo - 40) / 180) * 100 + "%" }}
				className="bg-accent sm:hover:scale-125 font-bold rounded border-4 border-primary absolute left-0 right-0"
			>
				{tempo}
			</div>
		</div>
	);
}
