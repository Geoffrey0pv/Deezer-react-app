import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import { PlaylistProvider } from '../context/PlaylistContext';

export default function Layout() {
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

      {/* Aquí van las rutas hijas */}
      <Container sx={{ mt: 2 }}>
        <Outlet />
      </Container>
    </PlaylistProvider>
  );
}
