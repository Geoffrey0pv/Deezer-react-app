// src/components/SearchResultCard.jsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

/**
 * Muestra una pista para agregarla a la playlist.
 * @param {Object} track - Track de la búsqueda de Deezer
 * @param {Function} onAdd(track) — Callback al pulsar "Agregar".
 */
export default function SearchResultCard({ track, onAdd }) {
  // Estructura de datos de Deezer
  const { title, artist, album, cover } = track;
  
  // Fallbacks para datos que pueden no existir
  const artistName = artist?.name || 'Artista desconocido';
  const albumTitle = album?.title || '';
  const coverImage = album?.cover || cover || 'https://via.placeholder.com/80x80/424242/ffffff?text=♪';

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', maxWidth: 500 }}>
      <CardMedia
        component="img"
        image={coverImage}
        alt={`Portada de ${title}`}
        sx={{ width: 80, height: 80, objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/80x80/424242/ffffff?text=♪';
        }}
      />
      <CardContent sx={{ flex: '1 1 auto', pl: 2 }}>
        <Typography variant="subtitle1" noWrap>
          {title || 'Título desconocido'}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {artistName}
        </Typography>
        {albumTitle && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {albumTitle}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="agregar pista"
          onClick={() => onAdd(track)}
        >
          <AddIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}