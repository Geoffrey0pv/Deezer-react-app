import { useState } from "react";
import { TextField, Button, Box, Container, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemAvatar, Avatar,IconButton 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { searchTracks } from "../services/playlistServices";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setIsSearching(true); 
        try {
            const results = await searchTracks(searchTerm);
            setSearchResults(results);
            setIsSearching(false);
            setSearchTerm(""); // Limpiar el campo de búsqueda después de la búsqueda
        } catch (error) {
            console.error("Error al buscar canciones:", error);
            setIsSearching(false);
        }
    };
    const handleAddToPlaylist = (track) => {
        console.log("Agregar a playlist:", track);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">Buscar Canciones</Typography>
            </Box>

            <Box component="form" onSubmit={handleSearch} sx={{ mb: 3, display: 'flex' }}>
                <TextField
                    fullWidth
                    label="Buscar canciones"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <Button 
                    type="submit"
                    variant="contained" 
                    disabled={isSearching || !searchTerm.trim()}
                    startIcon={<SearchIcon />}
                >
                    Buscar
                </Button>
            </Box>

            {isSearching ? (
                <Typography variant="body1">Buscando canciones...</Typography>
            ) : searchResults.length > 0 ? (
                <List>
                    {searchResults.map((track) => (
                        <Card key={track.id} sx={{ mb: 2 }}>
                            <CardContent sx={{ p: 2 }}>
                                <ListItem 
                                    disablePadding 
                                    secondaryAction={
                                        <IconButton 
                                            edge="end" 
                                            onClick={() => handleAddToPlaylist(track)}
                                            color="primary"
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar 
                                            src={track.albumCover} 
                                            alt={track.title}
                                            variant="square"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={track.title}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    {track.artist}
                                                </Typography>
                                                {` • ${track.album}`}
                                            </>
                                        }
                                    />
                                </ListItem>
                            </CardContent>
                        </Card>
                    ))}
                </List>
            ) : searchTerm.trim() && (
                <Typography variant="body1">No se encontraron resultados.</Typography>
            )}
        </Container>
    );
};

export default Search;