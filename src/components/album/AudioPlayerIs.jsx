import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { findAllByAlbumId } from '../../services/tracksService';

function AudioPlayerIs(props) {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const  imageURL= `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/img`;
  const  mp3URL= `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/mp3`;
  const  trackURL= `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks`;


  const audioRef = useRef(null);
 
  useEffect(() => {
    // Fetch tracks from the backend using your service
    findAllByAlbumId(props.id)
      .then(response => {
        const data = response.data; // Extract the data from the response
        setTracks(data);
        setSelectedTrack(data[0]); // Select the first track by default
       // console.log(data);
      })
      .catch(error => console.error('Error fetching tracks:', error));
     
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
            image={`${imageURL}/${selectedTrack.id}`} // Assuming id is the identifier for the track
            alt="Imagen de portada"
          />
          <audio ref={audioRef} controls style={{ width: '100%' }}>
            <source src={`${mp3URL}/${selectedTrack.id}`} type="audio/mpeg" />
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


