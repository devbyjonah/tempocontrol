"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getSpotifyToken, searchSpotify } from "../lib/spotify";
import SpotifyTrack from "@/interfaces/spotify";
import TrackPreview from "./trackPreview";

export default function SpotifySearch() {
	const [token, setToken] = useState(null);
	const [searchResults, setSearchResults] = useState<JSX.Element[]>([]);

	async function search(token: string, query: string) {
		const tracks = await searchSpotify(token, query);
		if (tracks) {
			const previewElements: JSX.Element[] = tracks.map(
				(track: SpotifyTrack) => {
					return <TrackPreview key={track.id} track={track} />;
				}
			);
			setSearchResults(previewElements);
		}
	}

	useEffect(() => {
		async function fetchToken() {
			const token = await getSpotifyToken();
			setToken(token);
		}
		fetchToken();
	}, []);

	return (
		<div
			className="flex flex-col gap-4"
			onClick={() => {
				if (token) {
					search(token, "The Beatles");
				}
			}}
		>
			<h1 className="text-lg text-white">Select BPM of a song</h1>
			{searchResults}
		</div>
	);
}
