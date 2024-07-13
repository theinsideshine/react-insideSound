import React from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
const AudioPlayer = ({ src, style }) => {
  const theme = useTheme(); // Obtiene el tema personalizado



  
  return (
    <ThemeProvider theme={theme}>
    
    <audio controls src={src} style={style} />

    </ThemeProvider>
  );
};

export default AudioPlayer;
