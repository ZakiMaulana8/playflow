const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export async function getSpotifyCurrentTrack(accessToken: string) {
    const response = await fetch(`${SPOTIFY_API_BASE}/me/player/currently-playing`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status === 204 || response.status > 400) {
        return null;
    }

    return response.json();
}

export async function toggleSpotifyPlayback(accessToken: string, play: boolean) {
    return fetch(`${SPOTIFY_API_BASE}/me/player/${play ? "play" : "pause"}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export async function skipSpotifyPlayback(accessToken: string, next: boolean) {
    return fetch(`${SPOTIFY_API_BASE}/me/player/${next ? "next" : "previous"}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}
