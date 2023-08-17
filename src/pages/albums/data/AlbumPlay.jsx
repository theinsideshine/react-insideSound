import {React, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';

import { useParams } from 'react-router-dom';
import { CssBaseline, Grid, Typography } from '@mui/material';
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
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          bgcolor: 'transparent',
          pt: 8,
          pb: 6,
        }}
      >
        {albums && albums.length > 0 ? (
          <Container>
            <Grid container spacing={1}> {/* Agregamos el container de Material-UI */}
             
              <Grid item xs={12}> {/* Componente AudioPlayerIs ocupando 10 columnas */}
                <div>
                  <AudioPlayerIs id={id} />
                </div>
              </Grid>
              
            </Grid>
          </Container>
        ) : (
          <Typography variant="body1">No hay álbumes disponibles.</Typography>
        )}
      </Box>
    </main>
    <Footer />
  </ThemeProvider>
);
}
