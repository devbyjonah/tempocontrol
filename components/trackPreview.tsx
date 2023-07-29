import SpotifyTrack from "@/interfaces/spotify";
import Image from "next/image";
import { truncate } from "../lib/utils";

export default function TrackPreview({ track }: { track: SpotifyTrack }) {
	return (
		<div
			id={track.id}
			className="w-full rounded flex p-4 bg-white border-2 border-primary border-solid gap-4"
		>
			<Image
				src={track.albumImg}
				alt="album cover"
				width={75}
				height={75}
			/>
			<div className="flex flex-col">
				<h3 className="text-lg">{truncate(track.name, 35)}</h3>
				<p className="text-sm">{track.artist}</p>
			</div>
		</div>
	);
}
