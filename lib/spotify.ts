import SpotifyTrack from "@/interfaces/spotify";

export async function getSpotifyToken(): Promise<string | undefined> {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
	};
	try {
		const response = await fetch(
			"https://accounts.spotify.com/api/token",
			requestOptions
		);
		const data = await response.json();
		return data.access_token;
	} catch (error) {
		console.log(error);
		return;
	}
}

export async function searchSpotify(
	token: string,
	query: string
): Promise<SpotifyTrack[]> {
	const requestOptions = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await fetch(
			`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`,
			requestOptions
		);
		const data = await response.json();
		const tracks: SpotifyTrack[] = data.tracks.items.map((track: any) => {
			return {
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				albumImg: track.album.images[0].url,
			};
		});
		return tracks;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function getTempo(
	token: string,
	id: string
): Promise<number | undefined> {
	const requestOptions = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await fetch(
			`https://api.spotify.com/v1/audio-features/${id}`,
			requestOptions
		);
		const data = await response.json();
		return Math.round(data.tempo);
	} catch (error) {
		console.log(`Error fetching tempo: ${error}`);
		return;
	}
}
