import React from 'react';
import { CssBaseline, Typography, useMediaQuery, Grid, Box } from '@mui/material';
import deckRetroImage from '../../assets/deck-retro.png';

export const HomePage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const typographyVariant = isMobile ? 'body2' : 'body1';
  const imagePaths = [deckRetroImage];

  return (
    <>
      <CssBaseline />
      <Box 
        style={{ 
          backgroundColor: '#F5F5DC', 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {imagePaths.map((path, index) => (
            <Grid item xs={12} sm={8} key={index}>
              <img src={path} alt={`Image ${index}`} style={{ width: '100%', borderRadius: '10px' }} />
            </Grid>
          ))}
          <Grid item xs={12} sm={8}>
            <Typography 
              variant={typographyVariant} 
              style={{ 
                fontFamily: "'Courier New', Courier, monospace", 
                lineHeight: 1.6, 
                textAlign: 'center' 
              }}
            >
              El propósito es brindar una plataforma gratuita de difusión de bandas independientes. Los usuarios finales son creadores de música (Rock y pop) los cuales puedan mostrar sus trabajos. El estilo tendrá reminiscencias a lo artesanal y lo nacional. La funcionalidad deberá tener dos accesos principales, “descubrir nuevos temas” subidos e “ingresar temas nuevos”. Agregarle una interpretación de Inteligencia artificial que automáticamente traduzca las letras y así darle visibilidad y que se ponga atención a las letras e incentivar la buena escritura y poesía. Estéticamente debería verse como hecha artesanalmente para remarcar la estética artesanal y nacional, como un pasquín, por medio de recortes de diarios y revistas retro. Para nosotros
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
