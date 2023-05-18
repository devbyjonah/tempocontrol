import Image from "next/image";

export default function Metronome() {
  return (
    <div
      className="metronomeContainer relative mt-20 md:mt-40 mx-auto"
      style={{ maxWidth: 500 + "px", maxHeight: 750 + "px" }}
    >
      <Image
        className=""
        src="/metronomeBase.png"
        alt="metronome"
        width={500}
        height={750}
      />
      <Image
        className="absolute h-full -top-2 left-1/2 transform -translate-x-1/2"
        src="/beater.png"
        alt="metronome"
        width={50}
        height={750}
      />
    </div>
  );
}
