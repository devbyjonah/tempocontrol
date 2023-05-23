"use client";
import Image from "next/image";
import MetronomeEngine from "./metronomeEngine";

import { useRef } from "react";

export default function Metronome() {
  const animationCallback = (beat: number, secondsPerBeat: number) => {
    console.log(beat, secondsPerBeat);
  };
  const metronomeEngine = useRef(new MetronomeEngine(animationCallback));
  metronomeEngine.current.startStop();
  return (
    <div
      className="metronomeContainer relative mt-28 sm:mt-40 mx-auto"
      style={{ maxWidth: 500 + "px", maxHeight: 750 + "px" }}
    >
      <Image
        id="base"
        className=""
        src="/metronomeBase.png"
        alt="metronome"
        width={500}
        height={750}
      />
      <Image
        id="beater"
        className="absolute h-full -top-2 left-1/2 transform -translate-x-1/2"
        src="/beater.png"
        alt="metronome"
        width={50}
        height={750}
      />
    </div>
  );
}
