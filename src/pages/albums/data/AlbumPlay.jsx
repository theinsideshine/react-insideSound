import {React, useEffect } from 'react'
import  Player1  from '../../../components/album/Player1'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';

import { useParams } from 'react-router-dom';
import { CssBaseline, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../../../components/layout/Footer';
import { useAlbums } from '../../../hooks/useAlbums';


const defaultTheme = createTheme();

export const Albumplay = () => {

  const { id } = useParams();

  const {
    albums,    
    isLoading,    
    getAlbums,
} = useAlbums();


 
useEffect(() => {
  getAlbums();
}, []);

useEffect(() => {
}, [albums]);
  
 
  if (isLoading) {
    return (
        <div className="container my-4">
            {/* <h4>Cargando ...</h4> */}
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main
        style={{
          backgroundImage: `url("/public/images/fondo-marmol.jpg")`, // Ajusta la ruta de la imagen aquí
          backgroundRepeat: 'repeat',
          height: '130vh', // Ajusta la altura según tus necesidades

        }}>
        <Box
          sx={{
            bgcolor: 'transparent',
            pt: 8,
            pb: 6,
          }}
        >
          {albums && albums.length  >0 ?  
              (
                <Container maxWidth="sm">
                  
                  <div>
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '50%',
                        borderRadius: '5%',
                        overflow: 'hidden',
                      }}
                      image={`http://localhost:8090/msvc-albums/albums/img/${id}`} // Use the correct URL format
                      onError={(e) => {
                        e.target.src = '/public/images/image-not-available.jpg'; // Ruta de la imagen vacía o de respaldo
                      }}
                    />
                  </div>
                  <br></br>
                  {/* Se debe generar una nueva matriz tracks ya que no acepta constantes player1 */}
                  <Player1 id={id} />
                </Container>
              ): (
                <Typography variant="body1">No hay álbumes disponibles.</Typography>
              )
            } 
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  )
}
