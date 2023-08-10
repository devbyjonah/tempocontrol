import { useEffect, useState, useRef } from "react";

import { getSpotifyToken, searchSpotify, getTempo } from "../lib/spotify";
import SpotifyTrack from "@/interfaces/spotify";
import TrackPreview from "./trackPreview";

export default function SpotifySearch({
	changeTempo,
}: {
	changeTempo: (value: number) => number;
}) {
	const [token, setToken] = useState<string>("");
	const [tokenExpiration, setTokenExpiration] = useState<number>(0);
	const [fetchingToken, setFetchingToken] = useState<boolean>(false);

	const [searchResults, setSearchResults] = useState<JSX.Element[]>([]);
	const debounceRef = useRef<NodeJS.Timeout>();

	async function fetchToken() {
		// exit early if still fetching token
		if (fetchingToken) return;

		setFetchingToken(true);
		const token = await getSpotifyToken();
		if (token) {
			setToken(token);
			setTokenExpiration(Date.now() + 3600000);
		}
		setFetchingToken(false);
	}

	async function search(query: string) {
		if (!query.trim()) {
			setSearchResults([]);
			return;
		}
		if (!token || (Date.now() > tokenExpiration && !fetchingToken)) {
			await fetchToken();
		}
		const tracks = await searchSpotify(token, query);
		if (!tracks) return;

		const previewElements: JSX.Element[] = tracks.map(
			(track: SpotifyTrack) => {
				return (
					<TrackPreview
						key={track.id}
						track={track}
						onClick={setTempoFromTrack}
					/>
				);
			},
		);
		setSearchResults(previewElements);
	}

	function debounceSearch(query: string) {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		debounceRef.current = setTimeout(() => search(query), 300);
	}

	async function setTempoFromTrack(event: React.MouseEvent<HTMLDivElement>) {
		if (!token || Date.now() > tokenExpiration) {
			await fetchToken();
		}
		const trackId = event.currentTarget.id;
		const tempo = await getTempo(token, trackId);
		if (tempo) changeTempo(tempo);
	}

	useEffect(() => {
		const refreshToken = async () => {
			if (!token || (Date.now() > tokenExpiration && !fetchingToken)) {
				await fetchToken();
			}
		};
		refreshToken();

		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, tokenExpiration]);

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
