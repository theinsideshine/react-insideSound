import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AlbumData from './data/AlbumData.js';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer.jsx';
import { useAlbums } from '../../hooks/useAlbums.js';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AlbumPage() {

  const navigate = useNavigate();

  const {
    albums,    
    isLoading,    
    getAlbums,
} = useAlbums();



useEffect(() => {
  getAlbums();
  /* console.log('estoy en useEffect');
  console.log(albums); */
}, []);

  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  function handleClick(albumId) {
  /*   console.log(albumId) */
    setSelectedAlbumId(albumId);
  }

  useEffect(() => {
    if (selectedAlbumId !== null) {
      navigate(`/albums/play/${selectedAlbumId}`);
    }
  }, [selectedAlbumId, navigate]);

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
          // backgroundRepeat: 'repeat',
          height: '100vh', // Ajusta la altura según tus necesidades

        }}>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'transparent', // Fondo transparente para el Box
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Albumes
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Crear album</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {albums && albums.length > 0 ? 
              (
                albums.map((album) => (
                  <Grid item key={album.id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: '56.25%',
                        }}
                        image={album.image}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {album.title}
                        </Typography>
                        <Typography>
                          {album.artist}-{album.age}
                        </Typography>
                      
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => handleClick(album.id)}>View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1">No hay álbumes disponibles.</Typography>
              )
            }
          </Grid>
        </Container>
      </main>

      <Footer />

    </ThemeProvider>
  );
}