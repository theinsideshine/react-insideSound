import React, { useEffect} from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useTracks } from '../../hooks/useTracks.js';
import { useAuth } from '../../auth/hooks/useAuth.js';
import LoadingIndicator from '../../components/layout/LoadingIndicator.jsx';
import { TrackList } from '../../components/tracks/TrackList.jsx';
import { TrackModalForm } from '../../components/tracks/TrackModalForm.jsx';



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
      
        <CssBaseline />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TrackList />
            </Grid>
          </Grid>
        </Container>
     
    </>
  );
}
