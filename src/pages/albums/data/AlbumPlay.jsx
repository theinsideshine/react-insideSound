import {React, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';

import { useParams } from 'react-router-dom';
import { CssBaseline, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../../../components/layout/Footer';
import { useAlbums } from '../../../hooks/useAlbums';

import AudioPlayerIs from '../../../components/album/AudioPlayerIs';


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
          // height: '130vh', // Ajusta la altura según tus necesidades
          minHeight: '100vh', // Cambié 'height' a 'minHeight' para que se ajuste al contenido

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
                                       <AudioPlayerIs id={id}/>
                  </div>                
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
