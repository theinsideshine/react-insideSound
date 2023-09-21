
import { useDispatch, useSelector } from "react-redux";
import { loadingAlbums, initialAlbumForm, addAlbum, updateAlbum, removeAlbum, loadingAlbumError } from "../store/slices/albums/albumsSlice";
import {  serviceFindAllAlbum, serviceFindAllAlbumByUsername, serviceFindPublicAlbumsByUsername, serviceRemoveAlbum, serviceSaveAlbum, serviceUpdateAlbum } from "../services/albumsService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export const useAlbums = () => {

    
    
    const { albums,albumSelected, errors, isLoading } = useSelector(state => state.albums);

    const dispatch = useDispatch();  

    const navigate = useNavigate();

    const handlerAddAlbum=async(formData)=>{
        const albumId = parseInt(formData.get('id'), 10); // Convert to number int
        console.log('handlerAddAlbum, albumId: ',albumId);
        let response;
            try {
    
                if (albumId === 0) {                
                    response = await serviceSaveAlbum(formData);               
                     dispatch(addAlbum(response.data))
                } else {
                    response = await serviceUpdateAlbum(formData);
                    dispatch(updateAlbum(response.data));
                }
    
                Swal.fire(
                    (albumId=== 0) ?
                        'Album Creado' :
                        'Album Actualizado',
                    (albumId=== 0) ?
                        'El Album ha sido creado con exito!' :
                        'El Album ha sido actualizado con exito!',
                    'success'
                );     
                handlerCloseAlbum(); //Borra errores       
                navigate('/albums');
                } catch (error) {           
                    
                    if (error.response && error.response.status == 400) {
                        console.log(error.response.data);
                       dispatch(loadingAlbumError(error.response.data));
                    }
                    /*
                    * Una forma de trapear el error de title duplicado es saber el identificardor del campo en la BBDD 
                    */
                    else if (error.response && error.response.status == 500 &&  error.response.data?.message?.includes('constraint')) {

                            if (error.response.data?.message?.includes('UK_albumtitle')) { 
                                dispatch(loadingAlbumError({ title: 'El Album ya existe!' }));
                            }
                    }else if (error.response && error.response.status == 500 &&
                        error.response.data?.message?.includes('Maximum upload size exceeded')) {
                          dispatch(loadingTrackError({ title: 'Los archivos no puede superar lo 10Mbytes' }));
                    }else {
                        console.log(error);
                        throw error;
                    }
                }       
      }

    const getAlbums =async() => {
                   
        try { 
            //const result = AlbumData.album;            
            const result = await serviceFindAllAlbum();
            dispatch(loadingAlbums(result.data));
        } catch (error) {
            console.log(error);
        }
    }

    const getAlbumsByUsername =async(username) => {
                   
        try { 
            //const result = AlbumData.album;            
            const result = await serviceFindAllAlbumByUsername(username);
            dispatch(loadingAlbums(result.data));
        } catch (error) {
            if (error.response?.status == 404) {
                dispatch(loadingAlbums([])); //carga vacio para mostrar no quedarse en isloading=true
            };
        }
    }

    const getPublicAlbumsByUsername =async(username) => {
                   
        try { 
            //const result = AlbumData.album;            
            const result = await serviceFindPublicAlbumsByUsername(username);
            dispatch(loadingAlbums(result.data));
        } catch (error) {
            if (error.response?.status == 404) {
                dispatch(loadingAlbums([])); //carga vacio para mostrar no quedarse en isloading=true
            };
        }
    }

    const handlerRemoveAlbum = (id) => {
        // console.log(id);   
    
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el album sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {
    
                try {
                    await serviceRemoveAlbum(id);
                    dispatch(removeAlbum(id));
    
                    Swal.fire(
                        'Album Eliminado!',
                        'El album ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Error al Eliminar!',
                        'El album no pudo ser eliminado!',
                        'error'
                    );
                }
            }
        })    
    }
    const handlerCloseAlbum = () => {
        
         dispatch(loadingAlbumError({}));//Borra los errores
        }

    return {
        albums,
        albumSelected,
        initialAlbumForm,
        errors,        
        isLoading,        
        getAlbums,
        getAlbumsByUsername,
        getPublicAlbumsByUsername,
        handlerAddAlbum,
        handlerRemoveAlbum,
    }
}