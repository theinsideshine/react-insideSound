import React from 'react'
import Player from "@madzadev/audio-player";

 const Player1 = (props) => {

   const {tracks} = props;



  const colors = `html {
    --tagsBackground: #9440f3;
    --tagsText: #ffffff;
    --tagsBackgroundHoverActive: #2cc0a0;
    --tagsTextHoverActive: #4061F3;
    --searchBackground: #18191f;
    --searchText: #ffffff;
    --searchPlaceHolder: #575a77;
    --playerBackground: #18191f;
    --titleColor: #ffffff; 
    --timeColor: #ffffff;
    --progressSlider: #4061F3;
    --progressUsed: #ffffff;
    --progressLeft: #ffffff;
    --volumeSlider: #4061F3;
    --volumeUsed: #ffffff;
    --volumeLeft:  #ffffff;
    --playlistBackground: #18191f;
    --playlistText: #575a77;
    --playlistBackgroundHoverActive:  #18191f;
    --playlistTextHoverActive: #4061F3;
}`;
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


