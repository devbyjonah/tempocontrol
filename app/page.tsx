import Button from "../components/button";
import Image from "next/image";

export default function Home() {
	return (
		<main className="mt-20 text-white">
			<div id="hero" className="md:mt-40 flex flex-col md:flex-row">
				<div className="md:w-2/3 flex flex-col gap-12 p-10 pl-16">
					<h1 className="text-3xl sm:text-5xl font-bold">
						A <span className="text-primary">simple</span> and{" "}
						<span className="text-primary">effective</span> tool to
						help you improve your{" "}
						<span className="text-accent">tempo control</span>!
					</h1>
					<p className="text-xl">
						Customize our metronome using a wide range of settings,
						create presets to match your warmup routine or song, and
						test your progress with the tempo control game!
					</p>
					<Button
						label="Sign up and improve for free!"
						className="bg-accent"
						hover
					/>
				</div>
				<div className="md:w-1/2 flex gap-12 p-10 justify-center">
					<div className="relative">
						<Image
							src="/metronomeBase.png"
							alt="met"
							width={300}
							height={900}
							className="h-full"
						/>
						<Image
							id="beater"
							className="absolute h-full -top-2 left-1/2 origin-bottom -translate-x-1/2"
							src="/beater.png"
							alt="metronome"
							width={35}
							height={750}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
