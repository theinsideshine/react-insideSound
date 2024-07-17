import React from 'react';
import { CssBaseline, Typography, useMediaQuery, Grid, Box, Button } from '@mui/material';
import deckRetroImage from '../../assets/deck-retro.png';
import { useTheme } from '@mui/material/styles';
import VintageVibesSection from './components/VintageVibesSection';
import SoundArchitectSection from './components/SoundArchitectSection';
import TestimonialsSection from './components/TestimonialsSection';
import SignupSection from './components/SignupSection';

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
              <img src={path} alt={`Image ${index}`} style={{ width: '100%', borderRadius: '30px', filter: theme.palette.mode === 'dark' ? 'brightness(0.5)' : 'brightness(1)' }} />
            </Grid>
          ))}
        </Grid>

         {/* Texto grande */}
         <Typography variant="h3" sx={{ marginTop: '20px', textAlign: 'center' }}>Todo está guardado en la memoria</Typography>
        {/* Texto pequeño */}
        <Typography variant="subtitle1" sx={{ marginTop: '10px', textAlign: 'center' }}>Oh Madelaine, loco amor, vives junto a la radio</Typography>
        {/* Botón */}
        <Box
  sx={{
    width: '50%',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <Button
    variant="contained"
    sx={{
      width: isMobile ? '50%' : '20%', // Ajusta el ancho del botón dependiendo del tamaño del viewport
      height: '40px', // Altura del botón
      bgcolor: 'primary.main',
      color: 'white',
      fontSize: '0.8rem', // Tamaño de fuente del botón
      '&:hover': {
        bgcolor: 'primary.dark', // Color de fondo al pasar el mouse
      },
    }}
  >
    Escúchala
  </Button>
</Box>

      </Box>

       {/* Agrega el componente VintageVibesSection */}
       <VintageVibesSection/>
        {/* Agrega el componente SoundArchitectSection */}
        <SoundArchitectSection/>
        {/* Agrega el componente TestimonialsSection */}
        <TestimonialsSection />
        {/* Agrega el componente SignupSection */}
        <SignupSection />
    </>
  );
};



