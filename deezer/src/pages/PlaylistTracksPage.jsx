import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, CircularProgress, Alert, Button, Stack, Typography } from '@mui/material';
import TrackCard from '../components/TrackCard';
import useFetch from '../hooks/useFetch';
import { getTracks, removeTrack } from '../api/deezerApi';

export default function PlaylistTracksPage() {
  // 1. Extraemos el ID de la playlist de la URL
  const { id: playlistId } = useParams();

  // 2. Usamos useFetch para cargar las pistas
  const {
    data: tracks,
    loading,
    error,
    reload
  } = useFetch(() => getTracks(playlistId), [playlistId]);

  // 3. Manejamos estados de carga y error
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

  // 4. Renderizamos la UI con un botón para ir a buscar más pistas
  return (
    <Stack spacing={2} padding={2}>
      {/* Enlace para buscar nuevas pistas */}
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

      {/* Lista de pistas */}
      <Grid container spacing={2}>
        {tracks?.map(track => (
          <Grid key={track.id} xs={12} sm={6} md={4}>
            <TrackCard
              track={track}
              onDelete={async (trackId) => {
                try {
                  // Llamamos al API para eliminar
                  await removeTrack(playlistId, trackId);
                  // Recargamos la lista
                  reload();
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
