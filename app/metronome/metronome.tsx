"use client";
import Image from "next/image";
import MetronomeEngine from "./metronomeEngine";
import PrimaryButton from "@/components/primaryButton";
import SecondaryButton from "@/components/secondaryButton";

import { useRef, useState } from "react";

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

  // event handlers
  const startStop = () => {
    metronomeEngine.current.startStop();
    setPlaying(metronomeEngine.current.playing);
    const beater: HTMLImageElement | null = document.querySelector("#beater");
    beater!!.style.transform = "translate(-50%) rotate(0deg)";
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row">
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
        <div className="h-1/3"></div>
        <div className="h-1/3">
          <PrimaryButton
            label={playing ? "Stop" : "Start"}
            onClick={startStop}
          />
        </div>
        <div className="h-1/3"></div>
      </div>
    </div>
  );
}
