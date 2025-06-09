import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTracks, addTrack, removeTrack } from '../api/deezerApi';

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [playlistId, setPlaylistId] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar pistas
  const loadTracks = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTracks(id);
      setTracks(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cada vez que cambie playlistId, recargamos
  useEffect(() => {
    if (playlistId) {
      loadTracks(playlistId);
    }
  }, [playlistId, loadTracks]);

  // Métodos de context
  const add = async (track) => {
    await addTrack(playlistId, track);
    loadTracks(playlistId);
  };
  const remove = async (trackId) => {
    await removeTrack(playlistId, trackId);
    loadTracks(playlistId);
  };
  const reload = () => loadTracks(playlistId);

  return (
    <PlaylistContext.Provider
      value={{
        playlistId,
        setPlaylistId,
        tracks,
        loading,
        error,
        add,
        remove,
        reload
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

// Hook para consumir el context
export function usePlaylist() {
  return useContext(PlaylistContext);
}
