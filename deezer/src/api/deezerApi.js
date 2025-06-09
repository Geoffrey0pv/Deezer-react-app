// src/api/deezerApi.js
import axios from 'axios';

// 1. Configuramos el cliente Axios
const api = axios.create({
  baseURL: 'http://localhost:8082/api/v1',  // Puerto típico de Spring Boot
  timeout: 10000,                           // 10s de espera
  headers: {
    'Content-Type': 'application/json'
  }
});

// 2. Funciones que llaman a endpoints concretos

/**
 * Obtiene el listado de playlists.
 * @returns {Promise<Array>} Array de playlists.
 */
export async function getPlaylists() {
  const response = await api.get('/playlists');
  return response.data;
}

/**
 * Crea una nueva playlist.
 * @param {Object} playlistData - { name: string, mood: string }
 * @returns {Promise<Object>} La playlist creada.
 */
export async function createPlaylist(playlistData) {
  const response = await api.post('/playlists', playlistData);
  return response.data;
}

/**
 * Elimina una playlist.
 * @param {number} playlistId
 * @returns {Promise<void>}
 */
export async function deletePlaylist(playlistId) {
  await api.delete(`/playlists/${playlistId}`);
}

/**
 * Obtiene las pistas de una playlist.
 * @param {number} playlistId
 * @returns {Promise<Array>} Array de tracks.
 */
export async function getTracks(playlistId) {
  const response = await api.get(`/playlists/${playlistId}/tracks`);
  return response.data;
}

/**
 * Busca pistas por término usando Deezer API.
 * @param {string} term
 * @returns {Promise<Object>} Respuesta JSON de Deezer (como string).
 */
export async function searchTracks(term) {
  const response = await api.get('/deezer/search', { params: { q: term } });

  return response.data;
}


/**
 * Agrega una pista a la playlist.
 * @param {number} playlistId
 * @param {Object} trackDTO - objeto con los datos del track según TrackDTO
 * @returns {Promise<void>}
 */
export async function addTrack(playlistId, trackDTO) {
  // Mapear datos de Deezer a formato TrackDTO esperado por el backend
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

/**
 * Elimina una pista de la playlist.
 * @param {number} playlistId
 * @param {number} trackId
 * @returns {Promise<void>}
 */
export async function removeTrack(playlistId, trackId) {
  await api.delete(`/playlists/${playlistId}/tracks/${trackId}`);
}