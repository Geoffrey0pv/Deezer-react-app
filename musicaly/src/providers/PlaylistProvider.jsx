import { useEffect, useState } from "react";
import { PlaylistContext } from "../context/PlaylistContext";

export const PlaylistProvider = ({children}) => {
    const [playlist, setPlaylist] = useState(null);

    useEffect(()=>{
        const storedPlaylist = localStorage.getItem('playlistUser');
        if(storedPlaylist){
            setUser(
                JSON.parse(storedPlaylist)
            );
        }
    }, []);

    return (
        <PlaylistContext.Provider value={{playlist, setPlaylist}}>
            {children}
        </PlaylistContext.Provider>
    );
}