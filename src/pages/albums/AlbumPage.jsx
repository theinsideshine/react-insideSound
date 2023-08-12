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
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer.jsx';
import { useAlbums } from '../../hooks/useAlbums.js';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AlbumPage() {

  const navigate = useNavigate();

  const  imageURL= `${import.meta.env.VITE_API_MSVC_ALBUM_URL}/albums/img`; 

  console.log('imageURL: '+imageURL);

  const {
    albums,    
    isLoading,    
    getAlbums,
} = useAlbums();

useEffect(() => {
  getAlbums(); 
}, []);

  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  function handleClick(albumId) {  
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
            backgroundImage: '', // Ajusta la ruta de la imagen aquí
            // backgroundRepeat: 'repeat',
            height: '100vh', // Ajusta la altura según tus necesidades
            display: 'flex',  // Para centrar el contenido verticalmente
            alignItems: 'center',  // Para centrar el contenido verticalmente
          }}
        >
          {/* Agregar el marco gris */}
          <div
            style={{
              flex: 1,
              backgroundColor: 'gray', // Color del marco
              height: '33vh', // Un tercio de la altura de la pantalla
              margin: '0 auto', // Centrar horizontalmente
              borderRadius: '10px', // Borde redondeado opcional
              padding: '20px', // Espaciado interno opcional
              display: 'flex', // Para centrar el contenido de la grilla
              alignItems: 'center', // Para centrar el contenido de la grilla
            }}
          >
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* Resto de tu código de la grilla */}
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
                            image={`${imageURL}/${album.id}.jpg`} // Use the correct URL format
                            onError={(e) => {
                              e.target.src = '/public/images/image-not-available.jpg'; // Ruta de la imagen vacía o de respaldo
                            }}
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
                            <Button size="small" onClick={() => handleClick(album.id)}>Reproducir</Button>
                            <Button size="small">Editar</Button>
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
          </div>
        </main>
  
        {/* Agregar el componente Footer si es necesario */}
      </ThemeProvider>
    );
    

      
 
}