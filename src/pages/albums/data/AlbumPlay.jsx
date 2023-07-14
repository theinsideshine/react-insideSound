import {React } from 'react'
import  Player1  from '../../../components/album/Player1'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AlbumData from './AlbumData.js';
import CardMedia from '@mui/material/CardMedia';

import { useParams } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../../../components/layout/Footer';

const defaultTheme = createTheme();

export const Albumplay = () => {

  const { id } = useParams();
  const { image } = AlbumData.album[id - 1];
  const { tracks } = AlbumData.album[id - 1];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main
        style={{
          backgroundImage: `url("/public/images/fondo-marmol.jpg")`, // Ajusta la ruta de la imagen aquí
          backgroundRepeat: 'repeat',
          height: '100vh', // Ajusta la altura según tus necesidades

        }}>
        <Box
          sx={{
            bgcolor: 'transparent',
            pt: 8,
            pb: 6,
          }}
        >
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
                image={image}
              />
            </div>
            <br></br>
            <Player1 tracks={tracks} />
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  )
}
