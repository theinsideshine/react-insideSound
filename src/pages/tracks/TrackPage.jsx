import React, { useEffect, useState } from 'react';
import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTracks } from '../../hooks/useTracks.js';
import { useAuth } from '../../auth/hooks/useAuth.js';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingIndicator from '../../components/layout/LoadingIndicator.jsx';

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    mode: 'light', // Puede ser 'light' o 'dark'
  },
});

export default function TrackPage() {
  const navigate = useNavigate();
  const imageURL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/img`;
  const mp3URL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/mp3`;

  const { tracks, isLoading, getTracksByUsername, handlerRemoveTrack } = useTracks();
  const { login } = useAuth();

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTrackAudio, setSelectedTrackAudio] = useState(null);

  const handleTrackSelect = (trackId) => {
    setSelectedTrack(trackId === selectedTrack ? null : trackId);
    setSelectedTrackAudio(`${mp3URL}/${trackId}`);
  };

  const handleEdit = (trackId) => {
    navigate(`edit/${trackId}`);
  };

  const handleRemove = (trackId) => {
    handlerRemoveTrack(trackId);
  };

  useEffect(() => {
    getTracksByUsername(login.user.username);
  }, []);

  if (isLoading) {
    return (
           <LoadingIndicator/>
        );
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'transparent', pt: 3, pb: 1 }}>
      {tracks && tracks.length > 0 ?
        (<Container>
        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cancion</TableCell>                  
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tracks.map((track) => (
                  <TableRow
                    key={track.id}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedTrack === track.id ? 'linear-gradient(to right, #fff, #e0e0e0)' : 'transparent',
                    }}
                    onClick={() => handleTrackSelect(track.id)}
                  >
                   <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={`${imageURL}/${track.id}`}
                        alt={track.title}
                        style={{ width: '30px', height: '30px', marginRight: '8px' }}
                      />
                      {selectedTrack === track.id && (
                        <audio controls src={selectedTrackAudio} style={{ maxHeight: '30px', width: '500px', marginRight: '8px' }} />
                      )}
                      <span style={{ marginLeft: '8px' }}>{track.title}</span> {/* Ajustamos el margin left para acercar el título */}
                    </div>
                  </TableCell>
                    
                    <TableCell>
                      <IconButton onClick={() => handleEdit(track.id)}>
                        <EditIcon style={{ color: selectedTrack === track.id ? '#2196f3' : 'black' }} />
                      </IconButton>
                      <IconButton onClick={() => handleRemove(track.id)}>
                        <DeleteIcon style={{ color: selectedTrack === track.id ? 'red' : 'black' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        ): (
          <Typography variant="body1">No hay canciones disponibles.</Typography>
        )
       }
      </Box>
    </ThemeProvider>
  );
}
