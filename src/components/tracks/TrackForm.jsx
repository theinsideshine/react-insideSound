import { useEffect, useRef, useState } from "react"
import { useTracks } from "../../hooks/useTracks";
import { Container, TextField, Button, Grid, Card, CardMedia } from '@mui/material';
import { useAuth } from "../../auth/hooks/useAuth";
import Alert from '@mui/material/Alert';

import '../../styles.css';


export const TrackForm = ({ trackSelected }) => {

  const UpLoadImageURL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/img`;
  const UpLoadMp3URL = `${import.meta.env.VITE_API_MSVC_TRACK_URL}/tracks/mp3`;


    const { initialTrackForm, handlerAddTrack, errors } = useTracks();

    const { login } = useAuth();
    
    const [trackForm, setTrackForm] = useState(initialTrackForm);      
    
    const { id, username, title, imageURL, mp3URL } = trackForm;  
   
  
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [audioPreviewUrl, setAudioPreviewUrl] = useState('');
  const [audioFileName, setAudioFileName] = useState('');

  useEffect(() => {
    if (trackSelected && trackSelected.id !== 0) {
      setTrackForm({
        ...trackForm,
        id: trackSelected.id,
        title: trackSelected.title,
      });
  
      // Fetch image file
      fetch(`${UpLoadImageURL}/${trackSelected.id}`)
        .then(response => response.blob())
        .then(imageBlob => {
          const imageFile = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' });
          setImageFile(imageFile);
          setImagePreviewUrl(URL.createObjectURL(imageFile));
        })
        .catch(error => {
          console.error('Error fetching image:', error);
        });
  
      // Fetch audio file
      fetch(`${UpLoadMp3URL}/${trackSelected.id}`)
        .then(response => response.blob())
        .then(mp3Blob => {
          const mp3File = new File([mp3Blob], 'audio.mp3', { type: 'audio/mpeg' });
          setAudioFile(mp3File);
          setAudioPreviewUrl(URL.createObjectURL(mp3File));
          setAudioFileName('audio.mp3');
        })
        .catch(error => {
          console.error('Error fetching audio:', error);
        });
    }
  }, [trackSelected]);

  const audioInputRef = useRef(null);

  const handleTitleChange = (event) => {
    //setTitle(event.target.value);
    setTrackForm({
        ...trackForm,
        title: (event.target.value),
    })
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    console.log('mp3URL'+URL.createObjectURL(file));
    setTrackForm({
        ...trackForm,
        imageURL: URL.createObjectURL(file),
    })
  };

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    setAudioPreviewUrl(URL.createObjectURL(file));
    console.log('mp3URL'+URL.createObjectURL(file));
    setAudioFileName(file.name);
    setTrackForm({
        ...trackForm,
        mp3URL: URL.createObjectURL(file),
    })
    //setTitle('');
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreviewUrl('');
  };

  const handleRemoveAudio = () => {
    setAudioFile(null);
    setAudioPreviewUrl('');
    setAudioFileName('');
    if (audioInputRef.current) {
      audioInputRef.current.value = ''; // Reset the value of the input
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("id", trackForm.id);  
    formData.append("username", login.user.username);
    formData.append("title", trackForm.title);
    formData.append("imageFile", imageFile); // Here you append the actual file
    formData.append("mp3File", audioFile); // Here you append the actual file    
    handlerAddTrack(formData);     
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '50px' }}>
      
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {imagePreviewUrl ? (
              <Card >
                <CardMedia component="img" image={imagePreviewUrl} />
                <Button variant="outlined"  onClick={handleRemoveImage}>
                  Eliminar imagen
                </Button>
              </Card>
            ) : (
              <Card className="gradient-card">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <Button 
                  variant="outlined"
                   component="span"
                  >
                    Subir imagen
                  </Button>
                </label>   
                            
              </Card>   
                         
            )}
            {errors && errors.imageFile && (
                <Alert severity="error">
                  {errors.imageFile}
                </Alert>
              )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Titulo"
              value={title}
              onChange={handleTitleChange}
              fullWidth
              margin="normal"
            />
            {errors && errors.title && (
                <Alert severity="error">
                  {errors.title}
                </Alert>
              )} 
            <input
              type="file"
              accept="audio/mpeg"
              onChange={handleAudioChange}
              ref={audioInputRef} // Attach the ref to the input element
              style={{ display: 'none' }} // Oculta el input real
              id="audio-input" // Agrega un id al input
            />
            <label htmlFor="audio-input">
                <Button
                  variant="outlined"
                  component="span"                 
                 
                >
                  Subir mp3
                </Button>
              </label>
            {audioPreviewUrl && (
              <div>
                <audio controls src={audioPreviewUrl} style={{ marginTop: '16px' }} />
                <Button variant="outlined" onClick={handleRemoveAudio} >
                  Eliminar audio
                </Button>
              </div>
            )}
            {errors && errors.mp3File && (
                <Alert severity="error">
                  {errors.mp3File}
                </Alert>
              )} 
          </Grid>
        </Grid>

        <Button variant="outlined"
                style={{marginTop: '10px' }}
                onClick={handleSave}
                >
          { trackSelected.id > 0 ? 'Guardar ' : 'Crear '}
          Track
        </Button>
      </form> 
    </Container>
  );
}


    
    
    