"use client";
import Image from "next/image";
import MetronomeEngine from "./metronomeEngine";
import Button from "@/components/button";
import Slider from "@/components/slider";
import ModalOverlay from "./modalOverlay";
import ModalContent from "./modalContent";
import TempoSlider from "./tempoSlider";
import Beater from "./beater";
import SpotifySearch from "@/components/spotifySearch";

import { useRef, useState, useEffect } from "react";

export default function Metronome() {
	// store instance of MetronomeEngine in a ref so that it persists between renders
	// the ref acts as the single source of truth for the metronome state
	const metronomeEngine = useRef(new MetronomeEngine());
	// state for metronome values that are set by user
	const [tempo, setTempo] = useState(metronomeEngine.current.tempo);
	const [playing, setPlaying] = useState(metronomeEngine.current.playing);
	const [volume, setVolume] = useState(metronomeEngine.current.volume);
	const [pitch, setPitch] = useState(metronomeEngine.current.pitch);
	const [subdivision, setSubdivision] = useState(
		metronomeEngine.current.subdivision
	);
	const [beatsPerMeasure, setBeatsPerMeasure] = useState(
		metronomeEngine.current.beatsPerMeasure
	);

	// state for managing settings modals
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState(<>Default Modal</>);

	// event handlers for metronome
	const startStop = () => {
		metronomeEngine.current.startStop();
		setPlaying(metronomeEngine.current.playing);
		const beater: HTMLImageElement | null =
			document.querySelector("#beater");
		if (beater) beater.style.transform = "translate(-50%) rotate(0deg)";
	};
	/*** Refactor needed ***/
	const changeTempo = (value: number): number => {
		metronomeEngine.current.tempo = value;
		const updated = metronomeEngine.current.tempo;
		setTempo(updated);
		const tempoInput: HTMLInputElement | null =
			document.querySelector("#tempoInput");
		if (tempoInput) {
			tempoInput.defaultValue = tempo.toString();
		}
		return updated;
	};
	const changeSubdivision = (value: number): number => {
		metronomeEngine.current.subdivision = value;
		const updated = metronomeEngine.current.subdivision;
		setSubdivision(updated);
		return updated;
	};
	const changeTimeSignature = (value: number): number => {
		metronomeEngine.current.beatsPerMeasure = value;
		const updated = metronomeEngine.current.beatsPerMeasure;
		setBeatsPerMeasure(updated);
		return updated;
	};
	const changeVolume = (value: number) => {
		metronomeEngine.current.volume = value;
		const updated = metronomeEngine.current.volume;
		setVolume(updated);
		return updated;
	};
	const changePitch = (value: number) => {
		metronomeEngine.current.pitch = value;
		const updated = metronomeEngine.current.pitch;
		setPitch(updated);
		return updated;
	};
	// event handler to open and set modal content
	const openModal = (
		title: string,
		value: number,
		handler: (value: number) => number
	) => {
		setModalContent(
			<ModalContent
				title={title}
				initialValue={value}
				changeValue={handler}
			/>
		);
		setModalOpen(true);
	};

	useEffect(() => {
		// Cleanup function to stop the metronome and remove the audio context
		return () => {
			metronomeEngine.current.cleanup();
		};
	}, []);

	return (
		<div className="flex flex-col-reverse sm:flex-row justify-center gap-4 lg:gap-32">
			<ModalOverlay
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				content={modalContent}
			/>
			<div
				id="metronomeContainer"
				className="overflow-x-hidden sm:overflow-x-visible relative mt-28 sm:mt-40 mx-auto sm:mx-0 select-none"
				style={{ maxWidth: 500 + "px", maxHeight: 750 + "px" }}
			>
				<Image
					id="metronomeBase"
					src="/metronomeBase.png"
					alt="metronome"
					width={500}
					height={750}
					priority
				/>
				<Image
					id="sliderRail"
					className="saturate-0 opacity-25 absolute h-full -top-2 left-1/2 -translate-x-1/2"
					src="/beater.png"
					alt="metronome"
					width={50}
					height={750}
				/>
				<Beater metronomeEngine={metronomeEngine} />
				<TempoSlider changeTempo={changeTempo} tempo={tempo} />
			</div>
			<div className="mt-24 sm:mt-0 text-black flex flex-col items-center sm:items-stretch">
				<div className="max-w-xs rounded settings-container my-auto flex flex-col gap-2">
					<Button
						label={playing ? "Stop" : "Start"}
						onClick={startStop}
						className="bg-primary"
					/>
					<Button
						className="bg-primary"
						label="Subdivide"
						onClick={() =>
							openModal(
								"Subdivide",
								subdivision,
								changeSubdivision
							)
						}
					/>
					<Button
						className="bg-primary"
						label="Time Signature"
						onClick={() =>
							openModal(
								"Time Signature",
								beatsPerMeasure,
								changeTimeSignature
							)
						}
					/>
					<Slider
						handler={(value: string): number =>
							changeVolume(parseInt(value))
						}
						initial={volume}
						label="Volume"
					/>
					<Slider
						handler={(value: string): number =>
							changePitch(parseInt(value))
						}
						initial={pitch}
						label="Pitch"
					/>
					<SpotifySearch />
				</div>
			</div>
		</div>
	);
}
