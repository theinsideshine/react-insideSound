import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import AlbumData from "../pages/albums/data/AlbumData";
import { loadingAlbums } from "../store/slices/albums/albumsSlice";
import { findAll } from "../services/albumsService";


export const useAlbums = () => {
    
    const { albums,isLoading } = useSelector(state => state.albums);
    const dispatch = useDispatch();  

    const getAlbums =async() => {
                   
        try { 
            const result = AlbumData;  
            console.log('album es:'+result);          
            //const result = await findAll();
            dispatch(loadingAlbums(result));
        } catch (error) {
            console.log(error);
        }
    }
    
    return {
        albums,        
        isLoading,        
        getAlbums,
    }
}