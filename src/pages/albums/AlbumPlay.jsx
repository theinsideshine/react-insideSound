import {React, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';

import { useParams } from 'react-router-dom';
import { CssBaseline, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../../components/layout/Footer';
import { useAlbums } from '../../hooks/useAlbums';

import AudioPlayerIs from '../../components/albums/AudioPlayerIs';
import LoadingIndicator from '../../components/layout/LoadingIndicator';


const defaultTheme = createTheme();

export const AlbumPlay = () => {

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
         <LoadingIndicator/>
      );
}
  

return (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />    
      <Box
        sx={{
          bgcolor: 'transparent',
          pt: 4,
          pb: 0,
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
 
  </ThemeProvider>
);
}
