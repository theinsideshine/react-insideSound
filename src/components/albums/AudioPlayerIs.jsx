import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import WaveSurfer from 'wavesurfer.js';
import { serviceFindAllTrackByAlbumId } from '../../services/tracksService';
import '../../styles.css'
import { useMediaQuery } from '@mui/material';

function AudioPlayerIs(props) {

  const isMobile = useMediaQuery('(max-width: 600px)'); // Define el punto de quiebre según tus necesidades 
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Valor inicial del volumen (1 es el volumen máximo)


  const imageURL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/img`;
  const mp3URL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/mp3`;

  const waveSurferRef = useRef(null);

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    if (waveSurferRef.current) {
      waveSurferRef.current.setVolume(newVolume);
    }
    setVolume(newVolume); // Actualiza el estado del volumen
  };
  

  useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#2196f3',
      progressColor: 'gray',
      barWidth: 0.5,
      barHeight: 0.8,
      heigth:1,
    });

    serviceFindAllTrackByAlbumId(props.id)
      .then(response => {
        const data = response.data;
        console.log('data es:',data);
        setTracks(data);
        setSelectedTrack(data[0]);
      })
      .catch(error => console.error('Error fetching tracks:', error));
  }, [props.id]);

  useEffect(() => {
    if (selectedTrack) {
      if (waveSurferRef.current) {
        waveSurferRef.current.load(`${mp3URL}/${selectedTrack.id}`);
      }
    }
  }, [selectedTrack]);

  useEffect(() => {
    if (waveSurferRef.current) {
      if (isPlaying) {
        waveSurferRef.current.play();
      } else {
        waveSurferRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTrackSelect = track => {
    setIsPlaying(false);
    setSelectedTrack(track);
  };

  const togglePlay = () => {
    setIsPlaying(prevState => !prevState);
  };

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      
      <div style={{
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #000000, #FFFFFF)', /* Cambia estos valores de color según tus preferencias */
      }}>
        <div style={{ width: '66.67%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={togglePlay} style={{ backgroundColor: 'transparent', border: 'none' }}>
            {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </button>
          <div id="waveform" style={{ marginTop: '20px', width: '100%', height: '100px' }}></div>
        </div>
        {!isMobile && (
        <div style={{ width: '33.33%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          
            
          <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume} // `volume` es el estado que almacenará el valor del volumen
              
              onChange={handleVolumeChange}
              />
          
        </div>
        )}
      </div>
      <List style={{ width: '70%', overflowY: 'auto', maxHeight: 'calc(100vh - 500px)' }}>
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
    </div>
  );
  
  
}

export default AudioPlayerIs;
