import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer.jsx';
import { useTracks } from '../../hooks/useTracks.js';
import { useAuth } from '../../auth/hooks/useAuth.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const defaultTheme = createTheme();

export default function TrackPage() {
  const navigate = useNavigate();
  const imageURL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/img`;
  const mp3URL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/mp3`;

  const { tracks, isLoading, getTracksUser } = useTracks();
  const { login } = useAuth();

  const [selectedTrack, setSelectedTrack] = useState(null);

  const [selectedTrackAudio, setSelectedTrackAudio] = useState(null);

  const handleTrackSelect = (trackId) => {
    setSelectedTrack(trackId === selectedTrack ? null : trackId);
    setSelectedTrackAudio(`${mp3URL}/${trackId}`); // Aquí asignamos la URL del archivo de audio
  };
  

  const handleEdit = (trackId) => {
    // Handle edit logic here
  };

  const handleRemove = (trackId) => {
    // Handle remove logic here
  };

  

  useEffect(() => {
    getTracksUser(login.user.username); 
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
      <main style={{ height: '100vh' }}>
        <Box
          sx={{
            bgcolor: 'transparent',
            pt: 8,
            pb: 6,
          }}
        >
          <Container>
            <ul>
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
                        <button onClick={() => handleEdit(track.id)}>
                          <EditIcon style={{ color: selectedTrack === track.id ? 'blue' : 'black' }} />
                        </button>
                        <button onClick={() => handleRemove(track.id)}>
                          <DeleteIcon style={{ color: selectedTrack === track.id ? 'red' : 'black' }} />
                        </button>
                      </div>
                    </li>
                  ))}

            </ul>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
