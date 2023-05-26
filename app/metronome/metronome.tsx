"use client";
import Image from "next/image";
import MetronomeEngine from "./metronomeEngine";

import { useRef } from "react";

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
  const metronomeEngine = useRef(new MetronomeEngine(animationCallback));
  metronomeEngine.current.startStop();
  return (
    <div
      className="metronomeContainer relative mt-28 sm:mt-40 mx-auto"
      style={{ maxWidth: 500 + "px", maxHeight: 750 + "px" }}
    >
      <Image
        id="base"
        src="/metronomeBase.png"
        alt="metronome"
        width={500}
        height={750}
      />
      <Image
        id="beater"
        className="absolute h-full -top-2 left-1/2 origin-bottom"
        src="/beater.png"
        alt="metronome"
        width={50}
        height={750}
      />
    </div>
  );
}
