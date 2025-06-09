import React from 'react';
import { Grid, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import PlaylistCard from '../components/PlaylistCard';
import useFetch from '../hooks/useFetch';
import { getPlaylists } from '../api/deezerApi';

export default function PlaylistsPage() {
  // 1. Llamamos al hook con nuestro fetcher
  const { data: playlists, loading, error, reload } = useFetch(getPlaylists, []);

  // 2. Casos de estado
  if (loading) {
    return <CircularProgress sx={{ margin: 4 }} />;
  }
  if (error) {
    return (
      <Alert severity="error" onClick={reload} sx={{ margin: 4 }}>
        Error cargando playlists. Haz click para reintentar.
      </Alert>
    );
  }

  // 3. Renderizamos cuando ya tenemos datos
  return (
    <Grid container spacing={2} padding={2}>
      {playlists?.map(pl => (
        <Grid key={pl.id} xs={12} sm={6} md={4}>
          <Link to={`/playlists/${pl.id}`} style={{ textDecoration: 'none' }}>
            <PlaylistCard
              name={pl.name}        // Campo del backend
              mood={pl.mood}        // Campo del backend
              cover={pl.cover}      // Si tienes este campo
              onClick={() => {}}
            />
          </Link>
        </Grid>
      )) || []}
    </Grid>
  );
}
