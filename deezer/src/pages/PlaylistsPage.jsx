import React from 'react';
import { Grid, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import PlaylistCard from '../components/PlaylistCard';
import useFetch from '../hooks/useFetch';
import { getPlaylists } from '../api/deezerApi';

export default function PlaylistsPage() {
  const { data: playlists, loading, error, reload } = useFetch(getPlaylists, []);

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

  return (
    <Grid container spacing={2} padding={2} justifyContent="center" >
      {playlists?.map(pl => (
        <Grid key={pl.id} item xs={12} sm={6} md={4}>
          <Link to={`/playlists/${pl.id}`} style={{ textDecoration: 'none' }}>
            <PlaylistCard
              name={pl.name}        
              mood={pl.mood}        
              cover={pl.cover}  
              onClick={() => {}}
            />
          </Link>
        </Grid>
      )) || []}
    </Grid>
  );
}
