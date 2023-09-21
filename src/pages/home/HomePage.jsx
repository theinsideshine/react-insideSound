

import { CssBaseline, Typography, useMediaQuery } from "@mui/material";
import youtubeRetroImage from "../../assets/youtube_retro.jpg"; // Importa la imagen
import Grid from "@mui/material/Grid"; // Importa Grid de Material-UI

export const HomePage = () => {  
    const isMobile = useMediaQuery("(max-width:600px)");
    // Define la variante de Typography basado en si es móvil o no
  const typographyVariant = isMobile ? "body2" : "body1";
      // Array de rutas de imágenes (puedes agregar más rutas aquí)
  const imagePaths = [ youtubeRetroImage,/* Otras rutas de imágenes */];
    return (
        <>    <CssBaseline />  {/* Para que tome el modo*/}
               {/* Usa la cuadrícula para mostrar las imágenes */}
                <Grid container spacing={2}>
                {imagePaths.map((path, index) => (
                    <Grid item xs={12} sm={3}  key={index}>
                    <img src={path}
                     alt={`Image ${index}`}
                     style={{ width: isMobile ? "80%" : "100%" }} // Ajusta el ancho en dispositivos móviles
                     />
                    </Grid>
                ))}
                    <Grid item xs={12} sm={4} >
                    {/* Aplica la fuente a través de Typography */}
                    <Typography variant={typographyVariant}  >
                        El propósito es brindar una plataforma gratuita de difusión de bandas independientes. Los usuarios finales son creadores de música (Rock y pop) los cuales puedan mostrar sus trabajos.
                        El estilo tendrá reminiscencias a lo artesanal y lo nacional. 
                        La funcionalidad deberá tener dos accesos principales, “descubrir nuevos temas” subidos e “ingresar temas nuevos”.
                        Agregarle una interpretación de Inteligencia artificial que automáticamente traduzca las letras y así darle visibilidad y 
                        que se ponga atención a las letras e incentivar la buena escritura y poesía.

                        Estéticamente debería verse como hecha artesanalmente para remarcar la estética artesanal y nacional, como un pasquín, por medio de recortes de diarios y revistas retro.

                        Para nosotros
                    </Typography>
                    </Grid>
                </Grid>
            
       </>
      
    )
}