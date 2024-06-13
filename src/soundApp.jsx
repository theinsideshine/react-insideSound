import React from 'react';
import { Provider } from 'react-redux';
import { AppRoutes } from './AppRoutes';
import { store } from './store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    background: {
      default: '#282831', // Color de fondo general
      paper: '#252231',   // Color de fondo para Navbar y Footer
    },
    text: {
      primary: '#EEEEEE', // Color de letra primario para toda la aplicación
      secondary: '#008A90', // Color de texto secundario
    },
    primary: {
      main: '#008A90',    // Color primario para el botón
    },
  },
});

export const SoundApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
          a: {
            color: theme.palette.primary.main,
            textDecoration: 'none', // Quita la subrayado de los enlaces
            '&:hover': {
              color: theme.palette.primary.dark,
            },
          },
        }}
      />
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </ThemeProvider>
  );
};
