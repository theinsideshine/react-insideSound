import { useDispatch, useSelector } from "react-redux";
import { loadingTracks } from "../store/slices/tracks/tracksSlice";
import { findAllByUser } from "../services/tracksService";



export const useTracks = () => {
    


    const { tracks, isLoading } = useSelector(state => state.tracks);
    const dispatch = useDispatch();

 
    const getTracksUser =async(username) => {
                   
      try { 
                      
          const result = await findAllByUser(username);
          dispatch(loadingTracks(result.data));
      } catch (error) {
          console.log(error);
      }
  } 
    
    return {
        tracks,        
        isLoading,    
        getTracksUser
    }
}