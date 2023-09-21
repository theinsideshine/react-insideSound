import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid'; // Importa el componente Grid
import '../../styles.css';

import { serviceFindAllTrackByAlbumId } from '../../services/tracksService';


function AudioPlayerIsMobile(props) {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTrackAudio, setSelectedTrackAudio] = useState(null);

  const imageURL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/img`;
  const mp3URL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/mp3`;

  useEffect(() => {
    serviceFindAllTrackByAlbumId(props.id)
      .then(response => {
        const data = response.data;
        console.log('data es:', data);
        setTracks(data);
        setSelectedTrack(data[0]);
      })
      .catch(error => console.error('Error fetching tracks:', error));
  }, [props.id]);

  const handleTrackSelect = track => {
    setSelectedTrack(track);
    setSelectedTrackAudio(`${mp3URL}/${selectedTrack.id}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={4}>
          <div>
            {selectedTrack && (
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`${imageURL}/${selectedTrack.id}`}
                  alt="Imagen de portada"
                />
              </Card>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div>
            <audio controls src={selectedTrackAudio} style={{ maxHeight: '30px', width: '100%', marginRight: '8px' }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <List style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 500px)' }}>
            {tracks.length === 0 ? (
              <ListItem>
                <ListItemText primary="No hay canciones" />
              </ListItem>
            ) : (
              tracks.map(track => (
                <ListItem
                  button
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  selected={selectedTrack && selectedTrack.id === track.id}
                >
                  <ListItemText primary={track.title} />
                </ListItem>
              ))
            )}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default AudioPlayerIsMobile;
