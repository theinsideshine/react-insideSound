import { useEffect,  useState } from "react"

import { Container, TextField, Button, Grid, Card, CardMedia, CssBaseline } from '@mui/material';
import { FormControl, FormControlLabel, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import '../../styles.css';

import { useAlbums } from "../../hooks/useAlbums";
import { useAuth } from "../../auth/hooks/useAuth";


export const AlbumForm = ({ albumSelected }) => {

  const UpLoadImageURL = `${import.meta.env.VITE_API_MSVC_ALBUM_URL}/img`;

    const { initialAlbumForm, errors, handlerAddAlbum} = useAlbums();

    const { login } = useAuth();
    
    const [albumForm, setAlbumForm] = useState(initialAlbumForm); 
    const [checked, setChecked] = useState(albumForm.albumprivate);     
    
    const { id, username, title, artist, age, albumprivate, imageURL } = albumForm;    
  
  const [imageFile, setImageFile] = useState(null);
 
  const [imagePreviewUrl, setImagePreviewUrl] = useState(''); 

  useEffect(() => {
    if (albumSelected && albumSelected.id !== 0) {
      setAlbumForm({
        ...albumForm,
        id: albumSelected.id,
        title: albumSelected.title,
        artist: albumSelected.artist,
        age: albumSelected.age,
        albumprivate: albumSelected.albumprivate
      });
  
      // Fetch image file
      fetch(`${UpLoadImageURL}/${albumSelected.id}`)
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
      
    }
  }, [albumSelected]); 

  const handleInputChange = (event, fieldName) => {
    setAlbumForm({
      ...albumForm,
      [fieldName]: event.target.value,
    });
  };

  const onCheckboxChange = () => {
    const newAlbumPrivate = !albumprivate;
    setChecked(newAlbumPrivate);
    setAlbumForm({
        ...albumForm,
        albumprivate: newAlbumPrivate,
    });
};

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    console.log('mp3URL'+URL.createObjectURL(file));
    setAlbumForm({
        ...albumForm,
        imageURL: URL.createObjectURL(file),
    })
  };  

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreviewUrl('');
  };  

  const handleSave = () => {
    const formData = new FormData();
    formData.append("id", albumForm.id);  
    formData.append("username", login.user.username);
    formData.append("title", albumForm.title);
    formData.append("artist", albumForm.artist);
    formData.append("age", albumForm.age);
    formData.append("albumprivate", albumForm.albumprivate);
    console.log("imageFile is: ",imageFile);
    if (imageFile!=null){
    formData.append("imageFile", imageFile); // Here you append the actual file
     }  
     // Iterar sobre formData y mostrar los valores
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
  }
     
    handlerAddAlbum(formData);     
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '50px' }}>
      <CssBaseline />  {/* Para que tome el modo*/}
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
              onChange={(event) => handleInputChange(event, "title")}
              fullWidth
              margin="normal"
            />
            {errors && errors.title && (
                <Alert severity="error">
                  {errors.title}
                </Alert>
              )}       

              <TextField
              label="Artista"
              value={artist}
              onChange={(event) => handleInputChange(event, "artist")}
              fullWidth
              margin="normal"
            />
            {errors && errors.artist && (
                <Alert severity="error">
                  {errors.artist}
                </Alert>
              )}    

               <TextField
              label="Año"
              value={age}
              onChange={(event) => handleInputChange(event, "age")}
              fullWidth
              margin="normal"
            />
            {errors && errors.age && (
                <Alert severity="error">
                  {errors.age}
                </Alert>
              )}    

              <FormControl>
                <FormControlLabel
                  control={<Checkbox
                    name="albumprivado"
                    checked={albumprivate}
                    onChange={onCheckboxChange}
                  />}
                  label="Privado"
                />
              </FormControl>       
            
          </Grid>
         
        </Grid>

        <Button variant="outlined"
                style={{marginTop: '10px' }}
                onClick={handleSave}
                >
          { albumSelected.id > 0 ? 'Guardar ' : 'Crear '}
          Album
        </Button>
      </form> 
    </Container>
  );
}


    
    
    