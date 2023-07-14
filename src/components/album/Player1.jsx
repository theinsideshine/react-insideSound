import React from 'react'
import Player from "@madzadev/audio-player";
import { colors } from './colorScheme';


 const Player1 = (props) => {

   const {tracks} = props;

   
  
  console.log(tracks);

 
  return (

    <Player
        trackList={tracks}
        includeTags={false}
        includeSearch={false}
        showPlaylist={true}
        autoPlayNextTrack={true}
        customColorScheme={colors}
/>
  )
}

export default Player1;


