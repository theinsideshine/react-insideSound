import { useDispatch, useSelector } from "react-redux";
import { loadingTracks, initialTrackForm, addTrack, loadingTrackError, removeTrack, updateTrack, onTrackSelectedModalForm, onOpenTrackModalForm, onCloseTrackModalForm} from "../store/slices/tracks/tracksSlice";
import { serviceAssociateAlbumToTrack, serviceFindAllTrackByUser, serviceRemoveTrack, serviceSaveTrack, serviceUpdateTrack } from "../services/tracksService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export const useTracks = () => {   


    const { tracks, trackSelected, errors ,isLoading,visibleModalForm } = useSelector(state => state.tracks);
    const dispatch = useDispatch();

    const navigate = useNavigate();
 
    const getTracksByUsername =async(username) => {
                   
      try { 
                      
          const result = await serviceFindAllTrackByUser(username);
          dispatch(loadingTracks(result.data));
      } catch (error) {
          console.log(error);
      }
  } 

  const handlerAddTrack=async(formData)=>{
    const trackId = parseInt(formData.get('id'), 10); // Convert to number
  
    let response;
        try {

            if (trackId === 0) {                
                response = await serviceSaveTrack(formData);               
                dispatch(addTrack(response.data))
            } else {
                response = await serviceUpdateTrack(formData);
                dispatch(updateTrack(response.data));
            }

            Swal.fire(
                (trackId=== 0) ?
                    'Track Creado' :
                    'Track Actualizado',
                (trackId=== 0) ?
                    'El Track ha sido creado con exito!' :
                    'El Track ha sido actualizado con exito!',
                'success'
            );     
            handlerCloseTrack(); //Borra errores       
            navigate('/tracks');
            } catch (error) {      
                console.log(error);      
                
                if (error.response && error.response.status == 400) {
                    console.log(error.response.data);
                   dispatch(loadingTrackError(error.response.data));
                }
                /*
                    * Una forma de trapear el error de title duplicado es saber el identificardor del campo en la BBDD 
                    */
                else if (error.response && error.response.status == 500 &&  error.response.data?.message?.includes('constraint')) {

                    if (error.response.data?.message?.includes('UK_tracktitle')) { 
                        dispatch(loadingTrackError({ title: 'El Track ya existe!' }));
                    }                    
                   
                }else if (error.response && error.response.status == 500 &&
                          error.response.data?.message?.includes('Maximum upload size exceeded')) {
                            dispatch(loadingTrackError({ title: 'Los archivos no puede superar lo 10Mbytes' }));
                }else {
                    console.log(error.response.data)
                    throw error;
                }
            }       
  }

  const handlerAssociateAlbumToTrack = ( trackId, albumId) => {

  serviceAssociateAlbumToTrack(trackId, albumId)
  .then(response => {
    
      console.log('se guardo ok');
  })
  .catch(error => {
    console.log('Error al guardar: '+error.response.data);
  });

}

  const handlerRemoveTrack = (id) => {
    // console.log(id);   

    Swal.fire({
        title: 'Esta seguro que desea eliminar?',
        text: "Cuidado el track sera eliminado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then( async(result) => {
        if (result.isConfirmed) {

            try {
                await serviceRemoveTrack(id);
                dispatch(removeTrack(id));

                Swal.fire(
                    'Track Eliminado!',
                    'El track ha sido eliminado con exito!',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error al Eliminar!',
                    'El track no pudo ser eliminado!',
                    'error'
                );
            }
        }
    })    
}
    const handlerTrackSelectedModalForm = (track) => {
        dispatch(onTrackSelectedModalForm({ ...track }));
    }

    const handlerOpenTrackModalForm = () => {
        dispatch(onOpenTrackModalForm());
    }

    const handlerCloseTrackModalForm = () => {
        dispatch(onCloseTrackModalForm());
        
    }

    const handlerCloseTrack = () => {
    // dispatch(onCloseUserForm());
     dispatch(loadingTrackError({}));//Borra los errores
    }
    return {
        tracks, 
        trackSelected,  
        initialTrackForm,
        errors,
        visibleModalForm,
        isLoading,            
        getTracksByUsername,
        handlerAddTrack,
        handlerRemoveTrack,
        handlerCloseTrack,
        handlerTrackSelectedModalForm,
        handlerCloseTrackModalForm,
        handlerOpenTrackModalForm,
        handlerAssociateAlbumToTrack
    }
}