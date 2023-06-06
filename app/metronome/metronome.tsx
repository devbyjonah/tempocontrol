"use client";
import Image from "next/image";
import MetronomeEngine from "./metronomeEngine";
import Button from "@/components/button";
import SettingsModal from "./settingsModal";
import { SubdivisionModal } from "./modalContent";

import { useRef, useState, useEffect } from "react";

export default function Metronome() {
  // animation callback is passed to the metronome engine and invoked on each beat
  const animationCallback = (beat: number, secondsPerBeat: number) => {
    const beater: HTMLImageElement | null = document.querySelector("#beater");
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

  // setup for various settings modals
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<>Default Modal</>);
  const openSubdivideModal = () => {
    setModalContent(<SubdivisionModal setSubdivision={() => {}} />);
    setModalOpen(true);
  };

  // event handlers
  const startStop = () => {
    metronomeEngine.current.startStop();
    setPlaying(metronomeEngine.current.playing);
    const beater: HTMLImageElement | null = document.querySelector("#beater");
    beater!!.style.transform = "translate(-50%) rotate(0deg)";
  };

  useEffect(() => {
    // Cleanup function to stop the metronome and remove the audio context
    return () => {
      metronomeEngine.current.startStop();
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
      <div className="sm:w-2/5 text-black flex flex-col">
        <div className="my-auto">
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
        </div>
      </div>
    </div>
  );
}
