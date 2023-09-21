
import { Navbar } from "../../components/layout/Navbar"
import { Footer } from "../../components/layout/Footer"

import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Grid, Typography, useMediaQuery } from '@mui/material';
import AudioPlayerIsMobile from "../../components/albums/AudioPlayerIsMobile";
import AudioPlayerIs from "../../components/albums/AudioPlayerIs";



export const HomePagePlay = () => { 

    const isMobile = useMediaQuery('(max-width: 600px)');    

    const { id } = useParams();

    return (

        <>
            <Box
            sx={{
              bgcolor: 'transparent',
              pt: 4,
              pb: 0,
            }}
          >
                {id > 0 ? (
                  <Container>
                    <Grid container spacing={1}> {/* Agregamos el container de Material-UI */}
                    
                      <Grid item xs={12}> {/* Componente AudioPlayerIs ocupando 10 columnas */}
                      <div>
                          {isMobile ? (
                            <AudioPlayerIsMobile id={id} />
                          ) : (
                            <AudioPlayerIs id={id} />
                          )}
                        </div>
                      </Grid>
                      
                    </Grid>
                  </Container>
                ) : (
                  <Typography variant="body1">No hay canciones disponibles.</Typography>
                )}
          </Box>              
       </>
      
    )
}