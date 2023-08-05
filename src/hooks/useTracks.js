import { useDispatch, useSelector } from "react-redux";
import { loadingTracks } from "../store/slices/tracks/tracksSlice";
import { findAllId } from "../services/tracksService";



export const useTracks = () => {
    
 /*    const songs = [
        {
          url: "/public/manzanaNegra/camarera.mp3",
          title: "La camarera del diablo",
          tags: ["rock"],
        },
        {
          url: "/public/manzanaNegra/disfraces.mp3",
          title: "disfraces",
          tags: ["jazz"],
        },
      ]; */

    const { tracks, isLoading } = useSelector(state => state.tracks);
    const dispatch = useDispatch();


 /*    const getTracks =() => {                  
        
            //const result = AlbumData.album; 
            console.log('usetrack');
            console.log(tracks)  ;         
            const result =[...tracks];
            dispatch(loadingTracks(result));
       
    }
   */

    const getTracksId =async(id) => {
                   
        try { 
            //const result = AlbumData.album;            
            const result = await findAllId(id);
            dispatch(loadingTracks(result.data));
        } catch (error) {
            console.log(error);
        }
    } 
    
    return {
        tracks,        
        isLoading,        
        getTracksId,
    }
}