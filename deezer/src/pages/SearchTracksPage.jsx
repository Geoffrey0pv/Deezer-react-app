import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Stack,
  Typography,
  Snackbar
} from '@mui/material';
import SearchResultCard from '../components/SearchResultCard';
import { searchTracks, addTrack } from '../api/deezerApi';

export default function SearchTracksPage() {
  const { id: playlistId } = useParams();

  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSearch = async () => {
    if (!term.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchTracks(term);
      setResults(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error(err);
      setError('Error al buscar pistas');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (track) => {
    try {
      await addTrack(playlistId, track);
      setSnackbar({ open: true, message: `Agregaste: ${track.title}` });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Error al agregar pista' });
    }
  };

  return (
    <Stack spacing={2} padding={2}>
      <Typography variant="h5">Buscar pistas para tu playlist</Typography>

      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          label="Término de búsqueda"
          value={term}
          onChange={e => setTerm(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Stack>

      {loading && <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} />}
      {error && (
        <Alert severity="error" onClick={handleSearch}>
          {error}. Haz click para reintentar.
        </Alert>
      )}

      {!loading && !error && results.length > 0 && (
        <Grid container spacing={2} justifyContent="center" >
          {results.map(track => (
            <Grid key={track.id} item xs={12} sm={6} md={4}>
              <SearchResultCard
                track={track}
                onAdd={handleAdd}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && !error && results.length === 0 && term && (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No se encontraron resultados para "{term}"
        </Typography>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Stack>
  );
}