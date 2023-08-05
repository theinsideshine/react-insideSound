import React from 'react'
import Player from "@madzadev/audio-player";
import { colors } from './colorScheme';
import { useTracks } from '../../hooks/useTracks';
import { useEffect } from 'react';
import { Typography } from '@mui/material';



  const songs = [
        {
          url: ".",
          title: "",
          tags: [""],
        },
       
      ]; 

 const Player1 = (props) => {

   const {
    tracks,    
    isLoading,    
    getTracksId,
} = useTracks();


 
useEffect(() => {
  //console.log('useEffect :',props.id);
  getTracksId(props.id);
}, []);


  
 
  if (isLoading) {
    return (
        <div className="container my-4">
            {/* <h4>Cargando ...</h4> */}
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
  
 
  return ( 
    <>
        {tracks && tracks.length  >0 ?  (

          <Player
            trackList={tracks.slice()}
            includeTags={false}
            includeSearch={false}
            showPlaylist={true}
            autoPlayNextTrack={true}
            customColorScheme={colors}
          />
          ): (
            <Typography variant="body1">No hay álbumes disponibles.</Typography>
          )
        
        }
    </>  

        
  )
}

export default Player1;


