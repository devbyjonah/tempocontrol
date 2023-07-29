"use client";
import { useEffect, useState, useRef } from "react";

import { getSpotifyToken, searchSpotify } from "../lib/spotify";
import SpotifyTrack from "@/interfaces/spotify";
import TrackPreview from "./trackPreview";

export default function SpotifySearch() {
	const [token, setToken] = useState("");
	const [searchResults, setSearchResults] = useState<JSX.Element[]>([]);
	const debounceRef = useRef<NodeJS.Timeout>();

	async function search(token: string, query: string) {
		if (!query.trim()) {
			setSearchResults([]);
			return;
		}
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

	function debounceSearch(query: string) {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		debounceRef.current = setTimeout(() => search(token, query), 300);
	}

	useEffect(() => {
		async function fetchToken() {
			const token = await getSpotifyToken();
			setToken(token);
		}
		fetchToken();
		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
		};
	}, []);

	return (
		<div className="flex flex-col gap-4 mt-8 cursor-pointer">
			<label htmlFor="search" className="text-lg text-white">
				Search for a song and set metronome&apos;s tempo to match.
			</label>
			<input
				id="search"
				className="rounded-md p-2 border-2 border-primary border-solid"
				type="text"
				placeholder="Search songs"
				onChange={(value) => debounceSearch(value.target.value)}
			/>
			{searchResults}
		</div>
	);
}