import SpotifyTrack from "@/interfaces/spotify";
import Image from "next/image";
import { Key } from "react";

export default function TrackPreview({ track }: { track: SpotifyTrack }) {
	console.log(track);
	return (
		<div id={track.id} className="w-full rounded flex p-4 bg-white gap-4">
			<Image
				src={track.albumImg}
				alt="album cover"
				width={75}
				height={75}
			/>
			<div className="flex flex-col">
				<h3 className="text-lg">{track.name}</h3>
				<p className="text-sm">{track.artist}</p>
			</div>
		</div>
	);
}
