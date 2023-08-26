import React, { useEffect, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer.jsx';
import { useTracks } from '../../hooks/useTracks.js';
import { useAuth } from '../../auth/hooks/useAuth.js';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const defaultTheme = createTheme();

/*
Tema claro (light): 
Tema oscuro (dark):
 */

const theme = createTheme({
  palette: {
    mode: 'light', // Puede ser 'light' o 'dark'
    // ...otros ajustes de color
  },
  // ...otros ajustes de estilo
});

export default function TrackPage() {

  const navigate = useNavigate();
  const imageURL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/img`;
  const mp3URL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/mp3`;

  const { tracks, isLoading, getTracksByUsername,handlerRemoveTrack} = useTracks();

  const { login } = useAuth();

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTrackAudio, setSelectedTrackAudio] = useState(null);


  const handleTrackSelect = (trackId) => {
    setSelectedTrack(trackId === selectedTrack ? null : trackId);
    setSelectedTrackAudio(`${mp3URL}/${trackId}`); // Aquí asignamos la URL del archivo de audio
  };  

  const handleEdit = (trackId) => {
    // Handle edit logic here
    console.log('En handle edit, id:',trackId);
    navigate(`edit/${trackId}`);
  };

  const handleRemove = (trackId) => {
    // Handle remove logic here}
    console.log(trackId);
    handlerRemoveTrack(trackId);
  };
  

  useEffect(() => {
    getTracksByUsername(login.user.username); 
  }, []);

  if (isLoading) {
    return (
      <div className="container my-4">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
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
          <Container>
            <ul style={{ marginBottom: "20px" }}>
            {tracks.map((track) => (
                    <li
                      key={track.id}
                      style={{
                        marginBottom: '8px',
                        borderBottom: '1px solid gray',
                        paddingBottom: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        backgroundColor: selectedTrack === track.id ? 'linear-gradient(to right, #fff, #e0e0e0)' : 'transparent',
                      }}
                      onClick={() => handleTrackSelect(track.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={`${imageURL}/${track.id}`}
                          alt={track.title}
                          style={{ width: '30px', height: '30px', marginRight: '8px' }}
                        />
                        {selectedTrack === track.id && (
                          <audio controls src={selectedTrackAudio} style={{maxHeight: '30px',width: '500px', marginRight: '8px' }} />
                        )}
                        {track.title}
                      </div>
                      
                      <div>

                        
                        <button onClick={() => handleEdit(track.id)}
                        style={{
                          border: 'none', // Esto quitará el borde del botón
                          background: 'transparent', // Esto hará que el fondo del botón sea transparente
                        }}>
                          <ModeEditOutlineOutlinedIcon style={{ color: selectedTrack === track.id ? '#2196f3' : 'black' }} />
                        </button>
                        <button onClick={() => handleRemove(track.id)}
                        style={{
                          border: 'none', // Esto quitará el borde del botón
                          background: 'transparent', // Esto hará que el fondo del botón sea transparente
                        }}>
                          <DeleteOutlineOutlinedIcon style={{ color: selectedTrack === track.id ? 'red' : 'black' }} />
                        </button>
                      </div>
                    </li>
                  ))}

            </ul>
          </Container>
    </Box>
      
      
    </ThemeProvider>
  );
}
