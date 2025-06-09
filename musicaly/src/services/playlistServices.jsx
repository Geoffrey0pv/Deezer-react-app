import axios from "axios";
import {URL_BASE} from "../constants/globals";

export const getAllPlaylist = async ()=>{
    let result = await axios.get(
            `${URL_BASE}/api/v1/playlists`,
        );
    return result.data;
}

export const getTracksByPlaylist = async (playlistId)=>{
    let result = await axios.get(
        `${URL_BASE}/api/v1/playlists/${playlistId}/tracks`,
    );
    return result.data;
}
export const addTrackToPlaylist = async (playlistId, trackId)=>{
    let result = await axios.post(
        `${URL_BASE}/api/v1/playlists/${playlistId}/tracks`,
        { trackId }
    );
    return result.data;
}

export const deleteTrackFromPlaylist = async (playlistId, trackId)=>{
    let result = await axios.delete(
        `${URL_BASE}/api/v1/playlists/${playlistId}/tracks/${trackId}`,
    );
    return result.data;
}

export const searchTracks = async (query) => {
    let result = await axios.get(
        `${URL_BASE}/api/v1/deezer/search/`,
        {
            params: { q: query }
        }
    );
    return result.data;
}