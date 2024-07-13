import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import '../../styles.css';

import WaveSurfer from 'wavesurfer.js';
import { serviceFindAllTrackByAlbumId } from '../../services/tracksService';

const VolumeSlider = styled('input')(({ theme }) => ({
  width: '100%',
  marginTop: '20px',
  accentColor: theme.palette.primary.main,
  '&::-webkit-slider-thumb': {
    background: theme.palette.primary.main,
  },
  '&::-moz-range-thumb': {
    background: theme.palette.primary.main,
  },
  '&::-ms-thumb': {
    background: theme.palette.primary.main,
  },
}));

function AudioPlayerIs(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const imageURL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/img`;
  const mp3URL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/mp3`;

  const waveSurferRef = useRef(null);

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    if (waveSurferRef.current) {
      waveSurferRef.current.setVolume(newVolume);
    }
    setVolume(newVolume);
  };

  useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: theme.palette.primary.main,
      progressColor: 'gray',
      barWidth: 1,
      barHeight: 1,
      height: 128,
    });

    serviceFindAllTrackByAlbumId(props.id)
      .then(response => {
        const data = response.data;
        console.log('data es:', data);
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

  const handleTrackSelect = (track) => {
    setIsPlaying(false);
    setSelectedTrack(track);
  };

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(to left, #000000, #524E4E)',
        borderRadius: '15px',
      }}>
        <div style={{ width: '66.67%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={togglePlay} style={{ backgroundColor: 'transparent', border: 'none' }}>
            {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </button>
          <div id="waveform" style={{ marginTop: '20px', width: '100%', height: '128px' }}></div>
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
            <VolumeSlider
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              theme={theme}
            />
          </div>
        )}
      </div>
      <List style={{ width: '70%', overflowY: 'auto', maxHeight: 'calc(100vh - 500px)' }}>
        {tracks.length === 0 ? (
          <ListItem>
            <ListItemText primary="No hay canciones" style={{ color: theme.palette.primary.main }} />
          </ListItem>
        ) : (
          tracks.map((track) => (
            <ListItem
              button
              key={track.id}
              onClick={() => handleTrackSelect(track)}
              selected={selectedTrack && selectedTrack.id === track.id}
            >
              <ListItemText primary={track.title} style={{ color: theme.palette.primary.main }} />
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
}

export default AudioPlayerIs;
