import React, { useState, useRef, useEffect } from 'react';

import '../../styles.css';
import { useTracks } from '../../hooks/useTracks';
import { TrackForm } from '../../components/tracks/TrackForm';
import { useParams } from 'react-router-dom';
;

export default function RegisterTrackPage() {

  const { tracks = [], initialTrackForm } = useTracks();

  const [trackSelected, setTrackSelected] = useState(initialTrackForm);

  const { id } = useParams();

  useEffect(() => {
      console.log('En registerTrackPage id='+id);
      if (id) {
        const track = tracks.find(t => t.id == id) || initialTrackForm;
        //console.log('En registerTrackPage track.id='+track.id);
        //console.log('En registerTrackPage track.title='+track.title);
          setTrackSelected(track);
      }
  }, [id])

  return (   
       
          <TrackForm trackSelected ={trackSelected} />
          )
      
}