import { Provider } from "react-redux"
import { AppRoutes } from "./AppRoutes"
import { store } from "./store/store"
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importa el ThemeProvider y createTheme
import { useState } from "react";

// Define tu tema personalizado aquí
const customTheme = createTheme({
    palette: {
        mode: 'dark', // Puede ser 'light' o 'dark',
        primary: {
          main: '#b58d67', // Cambia el color principal a naranja, por ejemplo
        },
        secondary: {
          /* main: '#2196f3', // Cambia el color secundario a azul, por ejemplo */
          main: '#848081',
        },
       
        // Puedes personalizar otros colores aquí, como error, warning, info, success, etc.
      },
    typography: {
        fontFamily: 'Mooli, sans-serif', // Usa tu fuente personalizada aquí
    },
    // Otros ajustes de tu tema personalizado si los tienes
});


// Configuración común para ambos temas
const commonThemeConfig = {
  primary: {
    main: '#b58d67',
  },
  secondary: {
    main: '#000000',
  },
    // Otros ajustes comunes
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...commonThemeConfig, // Propiedades comunes
  },
  typography: {
    fontFamily: 'Mooli, sans-serif', // Usa tu fuente personalizada aquí
},
  // Ajustes específicos del tema claro
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Cambia el modo a oscuro
    ...commonThemeConfig, // Propiedades comunes
  },
  typography: {
    fontFamily: 'Mooli, sans-serif', // Usa tu fuente personalizada aquí
},
  // Ajustes específicos del tema oscuro
});



export const SoundApp = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };
  
    // Define el tema que se utilizará según el estado `darkMode`
    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AppRoutes toggleDarkMode={toggleDarkMode} />
            </Provider>
        </ThemeProvider>
    )
    
}