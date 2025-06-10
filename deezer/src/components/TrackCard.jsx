// src/components/TrackCard.jsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TrackCard({ track, onDelete }) {
  // Adaptamos la estructura de datos del backend
  const {
    id,
    title,
    artistName,        // Campo del backend
    albumTitle,        // Campo del backend
    albumCover,        // Campo del backend
    artistPicture
  } = track;

  const coverImage = albumCover || artistPicture || '/placeholder-image.jpg';

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', maxWidth: 500 }}>
      {/* Mini portada */}
      <CardMedia
        component="img"
        image={coverImage}
        alt={`Portada de ${title}`}
        sx={{ width: 80, height: 80, objectFit: 'cover' }}
        onError={(e) => {
          // Fallback si la imagen falla al cargar
          e.target.src = '/placeholder-image.jpg';
        }}
      />

      {/* Contenido: título y artista */}
      <CardContent sx={{ flex: '1 1 auto', pl: 2 }}>
        <Typography variant="subtitle1" noWrap>
          {title || 'Título desconocido'}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {artistName || 'Artista desconocido'}
        </Typography>
        {albumTitle && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {albumTitle}
          </Typography>
        )}
      </CardContent>

      {/* Acción: eliminar */}
      <CardActions>
        <IconButton
          aria-label="eliminar pista"
          onClick={() => onDelete(id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
