import React, { useEffect, useState } from 'react';
import { IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useTracks } from '../../hooks/useTracks.js';
import { useAuth } from '../../auth/hooks/useAuth.js';

import LoadingIndicator from '../../components/layout/LoadingIndicator.jsx';
import { TrackList } from '../../components/tracks/TrackList.jsx';
import { TrackModalForm } from '../../components/tracks/TrackModalForm.jsx';

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    mode: 'light', // Puede ser 'light' o 'dark'
  },
});

export default function TrackPage() {
  const { tracks, isLoading, getTracksByUsername, visibleModalForm } = useTracks();
  const { login } = useAuth();

  useEffect(() => {
    getTracksByUsername(login.user.username);
  }, []);

  if (isLoading) {
    return (
      <LoadingIndicator />
    );
  }

  return (
    <>
      {!visibleModalForm || <TrackModalForm />}
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TrackList />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
