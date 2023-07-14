import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import AlbumData from "../pages/albums/data/AlbumData";
import { loadingAlbums } from "../store/slices/albums/albumsSlice";


export const useAlbums = () => {
    
    const { albums,isLoading } = useSelector(state => state.albums);
    const dispatch = useDispatch();

    const navigate = useNavigate();    

    const getAlbums =() => {
                   
            const result = AlbumData.album;            
            dispatch(loadingAlbums(result));
       
    }
    
    return {
        albums,        
        isLoading,        
        getAlbums,
    }
}