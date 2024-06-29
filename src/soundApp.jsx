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
      default: '#282831',
      paper: '#252231',
    },
    text: {
      primary: '#CDC8C8',
      secondary: '#008A90',
    },
    primary: {
      main: '#008A90',
    },
  },
  typography: {
    fontFamily: 'Mooli, sans-serif', // Fuente predeterminada
    h3: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 700, // Bold
    },
    subtitle1: {
      fontFamily: 'Lato, sans-serif',
    },
    button: {
      fontFamily: 'Mooli, sans-serif',
    },
  },
});
export default theme;

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
