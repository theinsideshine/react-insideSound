

import { useParams } from "react-router-dom";
import AlbumPage from "../albums/AlbumPage";

export const HomePageAlbum = () => { 

  const { username } = useParams();

    return (
         <AlbumPage usernameNoAuth={username}/>       
    )
}