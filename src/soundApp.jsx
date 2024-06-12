import { Provider } from "react-redux";
import { AppRoutes } from "./AppRoutes";
import { store } from "./store/store";
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importa el ThemeProvider y createTheme
import { useState } from "react";

// Configuración común para ambos temas
const commonThemeConfig = {
  typography: {
    fontFamily: 'Mooli, sans-serif', // Usa tu fuente personalizada aquí
  },
  palette: {
    primary: {
      main: '#b58d67',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#F5F5DC', // color de fondo para toda la app
      paper: '#8B4513',   // color de fondo del Navbar
    },
  },
};

// Define el tema claro aquí
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...commonThemeConfig.palette, // Propiedades comunes
  },
  typography: commonThemeConfig.typography,
  // Ajustes específicos del tema claro
});

// Define el tema oscuro aquí
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Cambia el modo a oscuro
    ...commonThemeConfig.palette, // Propiedades comunes
  },
  typography: commonThemeConfig.typography,
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
  );
};
