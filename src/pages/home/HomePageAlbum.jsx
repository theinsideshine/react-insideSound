
import { Navbar } from "../../components/layout/Navbar"
import { Footer } from "../../components/layout/Footer"
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import AlbumPage from "../albums/AlbumPage";

export const HomePageAlbum = () => { 

  const { username } = useParams();

    return (
         <AlbumPage usernameNoAuth={username}/>       
    )
}