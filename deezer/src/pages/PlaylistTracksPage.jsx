// src/pages/PlaylistTracksPage.jsx

import React, { useCallback } from 'react'; // 1. Importa useCallback
import { useParams, Link } from 'react-router-dom';
import { Grid, CircularProgress, Alert, Button, Stack, Typography } from '@mui/material';
import TrackCard from '../components/TrackCard';
import useFetch from '../hooks/useFetch';
import { getTracks, removeTrack } from '../api/deezerApi';

export default function PlaylistTracksPage() {
  const { id: playlistId } = useParams();
  
  const memoizedGetTracks = useCallback(() => getTracks(playlistId), [playlistId]);

  const {
    data: tracks,
    loading,
    error,
    reload
  } = useFetch(memoizedGetTracks, [playlistId]); // 3. Pasa la función memorizada al hook

  if (loading) {
    return <CircularProgress sx={{ m: 4 }} />;
  }
  if (error) {
    return (
      <Alert severity="error" onClick={reload} sx={{ m: 4 }}>
        Error cargando pistas. Haz click para reintentar.
      </Alert>
    );
  }

  return (
    <Stack spacing={2} padding={2} justifyContent="center">
      <Button
        component={Link}
        to={`/playlists/${playlistId}/search`}
        variant="contained"
        
      >
        Buscar y agregar pistas
      </Button>

      <Typography variant="h5">
        Pistas en la playlist
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {tracks?.map(track => (
          <Grid key={track.id} item xs={12} sm={6} md={4}>
            <TrackCard
              track={track}
              onDelete={async (trackId) => {
                try {
                  await removeTrack(playlistId, trackId);
                  reload(); // Llama a reload para refrescar la lista de pistas
                } catch (error) {
                  console.error('Error eliminando track:', error);
                }
              }}
            />
          </Grid>
        )) || []}
      </Grid>

      {tracks?.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No hay pistas en esta playlist. ¡Agrega algunas!
        </Typography>
      )}
    </Stack>
  );
}