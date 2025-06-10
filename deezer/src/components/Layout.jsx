import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Outlet, Link } from 'react-router-dom'; // 
import { PlaylistProvider } from '../context/PlaylistContext';

export default function Layout() { // 
  return (
    <PlaylistProvider>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Deezer App
          </Typography>
          <Button color="inherit" component={Link} to="/"> 
            Playlists
          </Button>
        </Toolbar>
      </AppBar>

      {/* --- MODIFICACIÓN AQUÍ --- */}
      {/* Añadimos propiedades de Flexbox para centrar el contenido de las páginas */}
      <Container 
        sx={{ 
          mt: 4,  // Aumentamos un poco el margen superior para más espacio
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centra horizontalmente el contenido
          textAlign: 'center'    // Centra el texto de los títulos
        }}
      >
        <Outlet />
      </Container>
    </PlaylistProvider>
  );
}