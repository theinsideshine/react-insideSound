import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Stack, Box, Typography, Container, IconButton
} from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAlbums } from '../../hooks/useAlbums.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LoadingIndicator from '../../components/layout/LoadingIndicator.jsx';
import { useAuth } from '../../auth/hooks/useAuth.js';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserFriendlySection from './sections/UserFriendlySection.jsx';

const AlbumPage = ({ usernameNoAuth }) => {
  const theme = useTheme(); // Obtiene el tema personalizado
  const navigate = useNavigate();
  const imageURL = `${import.meta.env.VITE_API_MSVC_ALBUM_URL}/img`;
  const { login } = useAuth();
  const {
    albums, isLoading, getAlbumsByUsername, getPublicAlbumsByUsername, handlerRemoveAlbum,
  } = useAlbums();

  useEffect(() => {
    if (login.isAuth) {
      getAlbumsByUsername(login.user.username);
    } else {
      getPublicAlbumsByUsername(usernameNoAuth);
    }
  }, [login.isAuth, usernameNoAuth]);

  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const handlePlayClick = (albumId) => {
    if (login.isAuth) {
      navigate(`/albums/play/${albumId}`);
    } else {
      navigate(`/albums/homeplay/${albumId}`);
    }
  };

  const handleEditClick = (albumId) => {
    navigate(`/albums/edit/${albumId}`);
  };

  const handleRemoveClick = (albumId) => {
    handlerRemoveAlbum(albumId);
  };

  const handleCreateAlbum = () => {
    navigate(`/albums/register/`);
  };

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', pt: 8, pb: 6 }}>
        <Container maxWidth="sm">
          <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
            La Sinfonia Universal
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            En el silencio se oye un inmenso parlante
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            {login.isAuth && (
              <Button variant="contained" color="primary" onClick={handleCreateAlbum}>
                Crear álbum
              </Button>
            )}
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {albums && albums.length > 0 ? (
          <Slider {...sliderSettings} slidesToShow={slidesToShow}>
            {albums.map((album) => (
              <div key={album.id} style={{ padding: '0 30px' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    borderRadius: '20px', // Añadir borde redondeado
                    boxShadow: theme.shadows[5] // Añadir sombra
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                      borderTopLeftRadius: '20px', // Bordes redondeados
                      borderTopRightRadius: '20px', // Bordes redondeados
                    }}
                    image={`${imageURL}/${album.id}?${new Date().getTime()}`}
                    onError={(e) => { e.target.src = '/public/images/image-not-available.jpg'; }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {album.title}
                    </Typography>
                    <Typography>
                      {album.artist} - {album.age}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handlePlayClick(album.id)}>
                      <PlayArrowIcon style={{ color: theme.palette.primary.main }} />
                    </IconButton>
                    {login.isAuth && (
                      <>
                        <IconButton onClick={() => handleEditClick(album.id)}>
                          <EditIcon style={{ color: theme.palette.primary.main }} />
                        </IconButton>
                        <IconButton onClick={() => handleRemoveClick(album.id)}>
                          <DeleteIcon style={{ color: theme.palette.primary.main }} />
                        </IconButton>
                      </>
                    )}
                  </CardActions>
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <Typography variant="body1">No hay álbumes disponibles.</Typography>
        )}
      </Container>
      <UserFriendlySection />
    </ThemeProvider>
  );
};

export default AlbumPage;
