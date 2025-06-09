import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Typography, List, ListItem, ListItemText, Card, CardContent, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Asegúrate de importar el icono
import { getTracksByPlaylist } from "../services/playlistServices";
import { Button } from "@mui/material";

const PlaylistPage = () => {
    const { playlistId } = useParams();
    const location = useLocation();
    const navigate = useNavigate(); // Añadido para poder navegar
    const playlistData = location.state?.playlistData || {};
    const [songs, setSongs] = useState([]);

    const handleNavigateToSearch = () => {
        navigate('/search', { state: { playlistId, playlistName: playlistData.name } });
    }

    useEffect(() => {
        const fetchSongs = async () => { 
            try {
                const data = await getTracksByPlaylist(playlistId); 
                setSongs(data);
            } catch (error) {
                console.error("Error al cargar las canciones:", error);
                setSongs([]);
            }
        };
        
        fetchSongs();
    }, [playlistId]);

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', pb: 10 }} className="playlist-page">
            <Card sx={{ mb: 4, p: 2 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{playlistData.name || "Playlist"}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Mood: {playlistData.mood || "N/A"}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        ID: {playlistId}
                    </Typography>
                </CardContent>
            </Card>
            
            <Typography variant="h5" gutterBottom>Canciones</Typography>
            
            {songs.length === 0 ? (
                <Typography variant="body1">No hay canciones en esta playlist.</Typography>
            ) : (
                <List>
                    {songs.map((song, index) => (
                        <Card key={song.id || index} sx={{ mb: 2 }}>
                            <CardContent>
                                <ListItem disablePadding>
                                    <ListItemText
                                        primary={
                                            <>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                    <img 
                                                        src={song.artistPicture || "https://via.placeholder.com/150"} 
                                                        alt={song.artistName} 
                                                        style={{ width: 100, height: 100, marginRight: 10 }} 
                                                    />
                                                    <Typography component="span" variant="body2">
                                                        {song.artistName}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" >
                                                    Album: {song.albumTitle}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Duración: {song.duration}
                                                </Typography>
                                            </>
                                        }
                                        secondary={song.title}
                                    />
                                </ListItem>
                            </CardContent>
                        </Card>
                    ))}
                </List>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 5 }}>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleNavigateToSearch}
                    startIcon={<AddIcon />}
                >
                    Agregar canciones
                </Button>
            </Box>
        </Box>
    );
}

export default PlaylistPage;