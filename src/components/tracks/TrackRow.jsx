import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { useTracks } from "../../hooks/useTracks";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

export const TrackRow = ({ id, title }) => {
  const { handlerRemoveTrack, handlerTrackSelectedModalForm } = useTracks();

  const navigate = useNavigate();
  const imageURL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/img`;
  const mp3URL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/mp3`;

  const isMobile = useMediaQuery('(max-width: 600px)'); // Define el punto de quiebre según tus necesidades

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTrackAudio, setSelectedTrackAudio] = useState(null);

  const handleTrackSelect = (id) => {
    setSelectedTrack(id === selectedTrack ? null : id);
    setSelectedTrackAudio(id === selectedTrack ? null : `${mp3URL}/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleRemove = (id) => {
    handlerRemoveTrack(id);
  };

  return (
    <>
    
      <TableRow
        style={{
          cursor: 'pointer',
          backgroundColor: selectedTrack === id ? 'linear-gradient(to right, #fff, #e0e0e0)' : 'transparent',
        }}
        onClick={() => handleTrackSelect(id)}
      >
        
        <TableCell>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={`${imageURL}/${id}`}
              alt={title}
              style={{ width: '30px', height: '30px', marginRight: '8px' }}
            />
            {!isMobile && selectedTrack === id && selectedTrackAudio && (
       
          <audio controls src={selectedTrackAudio} style={{ maxHeight: '30px', width: '300px', marginRight: '8px' }} />
        
           )}
            <span style={{ marginLeft: '8px' }}>{title}</span>
          </div>
        </TableCell>

        <TableCell>
          <IconButton onClick={() => handlerTrackSelectedModalForm({ id, title })}>
            <AddIcon style={{ color: selectedTrack === id ? '#2196f3' : 'black',fontSize: isMobile ? 16 : 24  }} />
          </IconButton>
          <IconButton onClick={() => handleEdit(id)}>
            <EditIcon style={{ color: selectedTrack === id ? '#2196f3' : 'black', fontSize: isMobile ? 16 : 24  }} />
          </IconButton>
          <IconButton onClick={() => handleRemove(id)}>
            <DeleteIcon style={{ color: selectedTrack === id ? 'red' : 'black', fontSize: isMobile ? 16 : 24  }} />
          </IconButton>
        </TableCell>
      </TableRow>

      {isMobile && selectedTrack === id && selectedTrackAudio && (
        <TableRow>
          <TableCell colSpan={2}>
          <audio controls src={selectedTrackAudio} style={{ maxHeight: '30px', width: '300px', marginRight: '8px' }} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
