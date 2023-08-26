import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAlbums } from '../../hooks/useAlbums.js';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const defaultTheme = createTheme();

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Puedes ajustar la cantidad de tarjetas que se muestran simultáneamente
  slidesToScroll: 1,
};


const AlbumPage = () => {
  const navigate = useNavigate();

  const imageURL = `${import.meta.env.VITE_API_MSVC_ALBUM_URL}/albums/img`;

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

  const sliderSettings = {
    dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: 'transparent',
          pt: 3,
          pb: 1,
        }}
      >
        <Container maxWidth="sm">
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
        
          {albums && albums.length > 0 ?
            (<Slider {...sliderSettings}>
              { albums.map((album) =>
                (
                  <div key={album.id}>
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <div>
                        <CardMedia
                          component="div"
                          sx={{
                            pt: '56.25%',
                          }}
                          image={`${imageURL}/${album.id}`}
                          onError={(e) => {
                            e.target.src = '/public/images/image-not-available.jpg';
                          }}
                        />
                      </div>
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
                  </div>
                ))} 
            </Slider>
            ) : (
              <Typography variant="body1">No hay álbumes disponibles.</Typography>
            )
         } 
       
      </Container>
    </ThemeProvider>
  );
};

export default AlbumPage;
