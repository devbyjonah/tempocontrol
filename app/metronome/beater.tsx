import Image from "next/image";
import { useRef } from "react";
import MetronomeEngine from "./metronomeEngine";

export default function Beater({
	metronomeEngine,
}: {
	metronomeEngine: React.RefObject<MetronomeEngine>;
}) {
	const beater = useRef<HTMLImageElement>(null);
	// animation callback is passed to the metronome engine and invoked on each beat
	const animationCallback = (beat: number, secondsPerBeat: number) => {
		if (beater.current) {
			const rotateValue =
				beater.current.style.transform ===
				"translate(-50%) rotate(30deg)"
					? "-30deg"
					: "30deg";

			beater.current.style.transition = `transform ${secondsPerBeat}s linear`;
			beater.current.style.transform = `translate(-50%) rotate(${rotateValue})`;
		}
	};
	if (metronomeEngine.current) {
		metronomeEngine.current.animationCallback = animationCallback;
	}

	return (
		<Image
			id="beater"
			ref={beater}
			className="absolute h-full -top-2 left-1/2 origin-bottom -translate-x-1/2"
			src="/beater.png"
			alt="metronome"
			width={50}
			height={750}
		/>
	);
}
