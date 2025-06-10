// src/api/deezerApi.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/api/v1', 
  timeout: 100000,                          
  headers: {
    'Content-Type': 'application/json'
  }
});


export async function getPlaylists() {
  const response = await api.get('/playlists');
  return response.data;
}


export async function createPlaylist(playlistData) {
  const response = await api.post('/playlists', playlistData);
  return response.data;
}


export async function deletePlaylist(playlistId) {
  await api.delete(`/playlists/${playlistId}`);
}


export async function getTracks(playlistId) {
  const response = await api.get(`/playlists/${playlistId}/tracks`);
  return response.data;
}

export async function searchTracks(term) {
  console.log("searchTracks", term);
  const response = await api.get('/deezer/search', { params: { q: term } });
  return response.data;
}


export async function addTrack(playlistId, trackDTO) {
  const trackData = {
    id: trackDTO.id,
    title: trackDTO.title,
    duration: trackDTO.duration,
    rank: trackDTO.rank || 0,
    artistName: trackDTO.artist?.name || trackDTO.artistName,
    albumTitle: trackDTO.album?.title || trackDTO.albumTitle,
    artistPicture: trackDTO.artist?.picture || trackDTO.artistPicture,
    albumCover: trackDTO.album?.cover || trackDTO.albumCover || trackDTO.cover
  };
  
  await api.post(`/playlists/${playlistId}/tracks`, trackData);
}

export async function removeTrack(playlistId, trackId) {
  await api.delete(`/playlists/${playlistId}/tracks/${trackId}`);
}