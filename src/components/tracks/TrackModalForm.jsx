import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Checkbox } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTracks } from "../../hooks/useTracks";
import { useAlbums } from "../../hooks/useAlbums";
import { useAuth } from "../../auth/hooks/useAuth";
import { serviceAssociateAlbumToTrack, serviceFindAlbumIdByTrackId } from "../../services/tracksService";
import { Button } from "@mui/base";
import { useTheme } from '@mui/material/styles'; // Importa useTheme
export const TrackModalForm = () => {

  const { login } = useAuth();

  const imageURL = `${import.meta.env.VITE_API_MSVC_ALBUM_URL}/img`;
  const theme = useTheme(); // Obtiene el tema personalizado
  
  const { trackSelected, handlerCloseTrackModalForm,handlerAssociateAlbumToTrack } = useTracks();
  const {
    albums,
    isLoading,
    getAlbumsByUsername,
    handlerRemoveAlbum,
  } = useAlbums();

  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const [isSelectionValid, setIsSelectionValid] = useState(true);


  const handleAlbumSelection = (albumid) => {
    console.log('album', albumid);
    setIsSelectionValid(true); // Restablece la selección válida
    setSelectedAlbumId(albumid);
  };

  useEffect(() => {
    getAlbumsByUsername(login.user.username);
    console.log('El  trackId a buscar es '+trackSelected.id)
    serviceFindAlbumIdByTrackId(trackSelected.id)
    .then(response => {
        const data = response.data;
        console.log('El tipo de datos de trackSelected.id es:', typeof trackSelected.id);
      console.log('El tipo de datos de data es:', typeof data);
      console.log('El albumId traido es:', data);
      if (data!==0 ) {
        setIsSelectionValid(true);
        setSelectedAlbumId(data);
      }else{
        setIsSelectionValid(false);
        setSelectedAlbumId(data);
      }
      })
      .catch(error => console.error('Error fetching albumId for tracks:', error));
    
    
  }, []);

  const handlerSaveAlbumIdModalForm =()=>{

    if (!selectedAlbumId) {
      // No se ha seleccionado ningún álbum, muestra un mensaje de alerta
      setIsSelectionValid(false);
      return;
    }

    console.log('album.id: ',selectedAlbumId +' track.id: '+trackSelected.id);

    handlerAssociateAlbumToTrack(trackSelected.id, selectedAlbumId);
    
    handlerCloseTrackModalForm();
  }

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogTitle>
        {`Asignar Album a ${trackSelected.title}`}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handlerCloseTrackModalForm}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
      <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Album</TableCell>                  
                  <TableCell>Seleccion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {albums.map((album) => (
                <TableRow key={album.id}>
                  <TableCell>
                  <img
                        src={`${imageURL}/${album.id}`}
                        alt={album.title}
                        style={{ width: '30px', height: '30px', marginRight: '8px' }}
                      />
                    
                    {album.title}
                  
                  </TableCell>
                  <TableCell>
                  <Checkbox
                      checked={selectedAlbumId === album.id} // Compara con el ID del álbum
                      onChange={() => handleAlbumSelection(album.id)}
                    />

                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ margin: "16px 0" }}>
          <Button
              variant="contained" // Puedes ajustar el tipo de botón (contained, outlined, etc.)
              style={{ color: theme.palette.primary.main }}
              onClick={() => handlerSaveAlbumIdModalForm()}
            >
              Guardar
            </Button>

          {!handlerCloseTrackModalForm || (
            <Button
            variant="contained" // Puedes ajustar el tipo de botón (contained, outlined, etc.)
            style={{ color: theme.palette.primary.main }}
              
              onClick={() => handlerCloseTrackModalForm()}
            >
              Cerrar
              </Button>
          )}

            {!isSelectionValid && (
              <div className="alert alert-danger" role="alert">
                Debes seleccionar un álbum antes de guardar.
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
