import React from 'react';
import { CssBaseline, Typography, useMediaQuery, Grid, Box, Button } from '@mui/material';
import deckRetroImage from '../../assets/deck-retro.png';
import { useTheme } from '@mui/material/styles';

export const HomePage = () => {
  const theme = useTheme(); // Obtén el tema actual

  const isMobile = useMediaQuery('(max-width:600px)');
  const typographyVariant = isMobile ? 'body2' : 'body1';
  const imagePaths = [deckRetroImage];

  return (
    <>
      <CssBaseline />
      <Box 
        style={{ 
          backgroundColor: theme.palette.background.default, // Utiliza el color de fondo de la paleta para el fondo
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {imagePaths.map((path, index) => (
            <Grid item xs={12} sm={6} key={index}> {/* Cambia el tamaño de la cuadrícula para la imagen */}
              <img src={path} alt={`Image ${index}`} style={{ width: '100%', borderRadius: '10px', filter: theme.palette.mode === 'dark' ? 'brightness(0.5)' : 'brightness(1)' }} />
            </Grid>
          ))}
        </Grid>

        {/* Texto grande */}
        <Typography variant="h3" sx={{ marginTop: '20px', textAlign: 'center' }}>Todo está guardado en la memoria</Typography>
        {/* Texto pequeño */}
        <Typography variant="subtitle1" sx={{ marginTop: '10px', textAlign: 'center' }}>Siente el swing</Typography>
        {/* Botón */}
        <Button variant="contained" sx={{ mt: 4, bgcolor: 'primary.main', color: 'white' }}>Escúchala</Button>
      </Box>
    </>
  );
};



