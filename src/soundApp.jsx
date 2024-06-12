import React from "react";
import { Provider } from "react-redux";
import { AppRoutes } from "./AppRoutes";
import { store } from "./store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: '#282831', // Color de fondo general
      paper: '#252231',   // Color de fondo para Navbar y Footer
    },
    text: {
      primary: '#EEEEEE', // Color de letra primario para toda la aplicación
    },
    primary: {
      main: '#008A90',    // Color primario para el botón
    },
  },
});

export const SoundApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </ThemeProvider>
  );
};