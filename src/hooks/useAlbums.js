
import { useDispatch, useSelector } from "react-redux";
import { loadingAlbums } from "../store/slices/albums/albumsSlice";
import { findAll } from "../services/albumsService";


export const useAlbums = () => {
    
    const { albums,isLoading } = useSelector(state => state.albums);
    const dispatch = useDispatch();  

    const getAlbums =async() => {
                   
        try { 
            //const result = AlbumData.album;            
            const result = await findAll();
            dispatch(loadingAlbums(result.data));
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