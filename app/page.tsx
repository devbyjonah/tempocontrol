import Image from "next/image";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="home-main h-screen">
      <div className="w-full h-3/4 flex flex-col items-center">
        <div className="h-1/4"></div>
        <div className="h-3/4 w-5/6 sm:w-3/5 2xl:w-1/3 flex flex-col items-center text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            The <span className="text-primary">fastest</span> online metronome
          </h1>
          <p className="my-3 sm:my-10 text-md sm:text-2xl w-4/5 sm:w-full">
            with the <span className="text-primary">precision</span> and{" "}
            <span className="text-primary">accuracy</span> required by
            professional musicians and all of the tools you need to improve your
            craft!
          </p>
        </div>
      </div>
    </main>
  );
}
