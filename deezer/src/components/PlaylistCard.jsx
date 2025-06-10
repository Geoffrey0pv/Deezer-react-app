// src/components/PlaylistCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

export default function PlaylistCard({ name, mood, cover }) {
  // Imagen por defecto si no hay cover
  const defaultCover = '/placeholder-image.jpg';
  
  return (
    <Card sx={{ maxWidth: 345, cursor: 'pointer' }}>

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
    </Card>
  );
}