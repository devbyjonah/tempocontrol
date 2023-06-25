"use client";
import Image from "next/image";
import MetronomeEngine from "./metronomeEngine";
import Button from "@/components/button";
import Slider from "@/components/slider";
import SettingsModal from "./settingsModal";
import ModalContent from "./modalContent";

import { useRef, useState, useEffect } from "react";

export default function Metronome() {
    // animation callback is passed to the metronome engine and invoked on each beat
    const animationCallback = (beat: number, secondsPerBeat: number) => {
        const beater: HTMLImageElement | null =
            document.querySelector("#beater");
        if (beater) {
            const rotateValue =
                beater.style.transform === "translate(-50%) rotate(30deg)"
                    ? "-30deg"
                    : "30deg";

            beater.style.transition = `transform ${secondsPerBeat}s linear`;
            beater.style.transform = `translate(-50%) rotate(${rotateValue})`;
        }
    };
    // store instance of MetronomeEngine in a ref so that it persists between renders
    // the ref acts as the single source of truth for the metronome state
    const metronomeEngine = useRef(new MetronomeEngine(animationCallback));
    // state for metronome values that are set by user
    const [tempo, setTempo] = useState(metronomeEngine.current.tempo);
    const [playing, setPlaying] = useState(metronomeEngine.current.playing);
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
        beater!!.style.transform = "translate(-50%) rotate(0deg)";
    };
    const changeSubdivision = (value: number): number => {
        metronomeEngine.current.subdivision = value;
        setSubdivision(metronomeEngine.current.subdivision);
        return metronomeEngine.current.subdivision;
    };
    const changeTimeSignature = (value: number): number => {
        metronomeEngine.current.beatsPerMeasure = value;
        setBeatsPerMeasure(metronomeEngine.current.beatsPerMeasure);
        return metronomeEngine.current.beatsPerMeasure;
    };
    // event handlers to open and set modal content
    const openSubdivideModal = (): void => {
        setModalContent(
            <ModalContent
                title="Subdivide"
                description="Select the number of subdivisions per beat."
                hint="Combine with time signature for complex divisions"
                initialValue={subdivision}
                changeValue={changeSubdivision}
                numberOptions={[1, 2, 3, 4]}
            />
        );
        setModalOpen(true);
    };
    const openTimeSignatureModal = (): void => {
        setModalContent(
            <ModalContent
                title="Time Signature"
                description="Select the number of beats per measure."
                hint="Use the arrows to select a number not listed below."
                initialValue={beatsPerMeasure}
                changeValue={changeTimeSignature}
                numberOptions={[1, 2, 3, 4, 5, 6]}
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
        <div className="flex flex-col-reverse sm:flex-row">
            <SettingsModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                content={modalContent}
            />
            <div
                className="relative mt-28 sm:mt-40 mx-auto"
                style={{ maxWidth: 500 + "px", maxHeight: 750 + "px" }}
            >
                <Image
                    id="base"
                    src="/metronomeBase.png"
                    alt="metronome"
                    width={500}
                    height={750}
                    priority
                />
                <Image
                    id="beater"
                    className="absolute h-full -top-2 left-1/2 origin-bottom -translate-x-1/2"
                    src="/beater.png"
                    alt="metronome"
                    width={50}
                    height={750}
                />
            </div>
            <div className="sm:w-2/5 text-black flex flex-col items-center sm:items-stretch">
                <div className="max-w-xs rounded settings-container my-auto flex flex-col gap-2">
                    <Button
                        label={playing ? "Stop" : "Start"}
                        onClick={startStop}
                        className="bg-primary"
                    />
                    <Button
                        className="bg-primary"
                        label="Subdivide"
                        onClick={openSubdivideModal}
                    />
                    <Button
                        className="bg-primary"
                        label="Time Signature"
                        onClick={openTimeSignatureModal}
                    />
                </div>
                <Slider />
            </div>
        </div>
    );
}
