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
import LoadingIndicator from '../../components/layout/LoadingIndicator.jsx';

import { useAuth } from '../../auth/hooks/useAuth.js';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const defaultTheme = createTheme();

const AlbumPage = () => {
  const navigate = useNavigate();
  const imageURL = `${import.meta.env.VITE_API_MSVC_ALBUM_URL}/albums/img`;
  const { login } = useAuth();
  const {
    albums,
    isLoading,
    getAlbumsByUsername,
    handlerRemoveAlbum,
  } = useAlbums();

  useEffect(() => {
    getAlbumsByUsername(login.user.username);
  }, []);

  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  function handlePlayClick(albumId) {
    navigate(`/albums/play/${albumId}`);
  }

  function handleEditClick(albumId) {
    navigate(`/albums/edit/${albumId}`);
  }

  function handleRemoveClick(albumId) {
    handlerRemoveAlbum(albumId);
  }

  function handleCreateAlbum() {
    navigate(`/albums/register/`);
  }

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoPlay: false,
    autoplaySpeed: 1000,
  };

  // Determina el número de slides a mostrar en función del ancho de la pantalla
  let slidesToShow = 3;
  if (window.innerWidth <= 768) {
    slidesToShow = 1; // En pantallas más pequeñas, muestra solo 1 slide
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

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
            <Button variant="contained" onClick={() => handleCreateAlbum()}>
              Crear álbum
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {albums && albums.length > 0 ? (
          <Slider {...sliderSettings} slidesToShow={slidesToShow}>
            {albums.map((album) => (
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
                      image={`${imageURL}/${album.id}?${new Date().getTime()}`}
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
                    <IconButton onClick={() => handlePlayClick(album.id)}>
                      <PlayArrowIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(album.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveClick(album.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <Typography variant="body1">No hay álbumes disponibles.</Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default AlbumPage;
