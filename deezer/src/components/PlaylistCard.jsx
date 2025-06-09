// src/components/PlaylistCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

/**
 * Componente presentacional para mostrar una playlist.
 * @param {Object} props
 * @param {string} props.name - Nombre de la playlist (campo del backend).
 * @param {string} props.mood - Mood de la playlist.
 * @param {string} props.cover - URL de la imagen de portada.
 * @param {Function} props.onClick — Callback cuando se hace click en el botón.
 */
export default function PlaylistCard({ name, mood, cover, onClick }) {
  // Imagen por defecto si no hay cover
  const defaultCover = '/placeholder-image.jpg';
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Portada */}
      <CardMedia
        component="img"
        height="140"
        image={cover || defaultCover}
        alt={`Portada de ${name}`}
        onError={(e) => {
          e.target.src = defaultCover;
        }}
      />

      {/* Contenido: título y mood */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name || 'Playlist sin nombre'}
        </Typography>
        {mood && (
          <Typography variant="body2" color="text.secondary">
            Mood: {mood}
          </Typography>
        )}
      </CardContent>

      {/* Acción: por ejemplo, ir a detalles */}
      <CardActions>
        <Button size="small" onClick={onClick}>
          Ver detalles
        </Button>
      </CardActions>
    </Card>
  );
}