import React, { useState, useRef, useEffect } from 'react';

import '../../styles.css';


import { useParams } from 'react-router-dom';
import { useAlbums } from '../../hooks/useAlbums';
import { AlbumForm } from '../../components/albums/AlbumForm';
;

export default function RegisterAlbumPage() {

  const { albums = [], initialAlbumForm } = useAlbums();

  const [albumSelected, setAlbumSelected] = useState(initialAlbumForm);

  const { id } = useParams();

  useEffect(() => {
      console.log('En registerAlbumPage id='+id);
      if (id) {
        const album = albums.find(a => a.id == id) || initialAlbumForm;
        //console.log('En registerTrackPage track.id='+track.id);
        //console.log('En registerTrackPage track.title='+track.title);
        setAlbumSelected(album);
      }
  }, [id])

  return (   
       
          <AlbumForm albumSelected ={albumSelected} />
          )
      
}