import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { findAllByAlbumId } from '../../services/tracksService';
import { data, data2 } from '../../pages/albums/data/TrackData';

function AudioPlayerIs(props) {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const  imageURL= `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/img`;
  const  mp3URL= `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/mp3`;
  const  trackURL= `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks`;


  const audioRef = useRef(null);
 
  useEffect(() => {
   
  
    setTracks(data);
    setSelectedTrack(data[0]); // Select the first track by default
   
        
       
        
        
      
     
  }, [props.id]);
  
  useEffect(() => {
    console.log('Updated tracks:', tracks);
  }, [tracks]);
  
  const handleTrackSelect = (track) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
    setSelectedTrack(track);
  };

  return (
    <div style={{ width: '500px', height: '500px' }}>
      {selectedTrack && (
        <Card style={{ marginBottom: '10px' }}>
          <CardMedia
            component="img"
            height="300"
            image={`${imageURL}/${selectedTrack.id}.jpg`} // Assuming id is the identifier for the track
            alt="Imagen de portada"
          />
          <audio ref={audioRef} controls style={{ width: '100%' }}>
            <source src={`${mp3URL}/${selectedTrack.id}.mp3`} type="audio/mpeg" />
            Tu navegador no soporta la reproducción de audio.
          </audio>
        </Card>
      )}
      <List style={{ overflowY: 'auto', maxHeight: '200px' }}>
        {tracks.map((track) => (
          <ListItem
            button
            key={track.id}
            onClick={() => handleTrackSelect(track)}
            selected={selectedTrack && selectedTrack.id === track.id}
          >
            <ListItemText primary={track.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default AudioPlayerIs;


