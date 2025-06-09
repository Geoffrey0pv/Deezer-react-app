import { useEffect, useState } from "react";
import { TextField, Button, Box, Container, Typography, Card, CardActionArea, CardContent } from "@mui/material";
import { getAllPlaylist } from "../services/playlistServices";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [playlist, setPlaylist] = useState([]);
    const navigate = useNavigate();

    const handleGetAllCourses = async () => {
        let array = await getAllPlaylist();
        setPlaylist(array);
        console.log(array);
    }

    const handleShowDetails = (playlist) => {
        console.log("Mostrar detalles para:", playlist);
        navigate(`/playlist/${playlist.id}`, { state: { playlistData: playlist } });
    }

    useEffect(() => {
        console.log("Cargando los cursos");
        handleGetAllCourses();
    }, []);

    return (
        <>
            <h2>Bienvenido a Musicaly</h2>
            <h6>Aquí están tus playlist: </h6>
            {
                playlist.map((item, index) => {
                    return (
                        <Card key={index} sx={{ marginBottom: 2 }}>
                            <CardActionArea onClick={() => handleShowDetails(item)}>
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Mood: {item.mood}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })
            }
        </>
    );
}

export default Home;