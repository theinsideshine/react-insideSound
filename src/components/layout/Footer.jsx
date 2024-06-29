import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { CopyrightRight } from './FooterCopyright';

export const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        p: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 1200,
          p: 2,
        }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle1" gutterBottom>
            Company
          </Typography>
          <Typography variant="body2">About</Typography>
          <Typography variant="body2">Careers</Typography>
          <Typography variant="body2">Newsroom</Typography>
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle1" gutterBottom>
            Highlights
          </Typography>
          <Typography variant="body2">Speed</Typography>
          <Typography variant="body2">Playlists</Typography>
          <Typography variant="body2">Updates</Typography>
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle1" gutterBottom>
            Social
          </Typography>
          <Typography variant="body2">Twitter</Typography>
          <Typography variant="body2">Instagram</Typography>
          <Typography variant="body2">Threads</Typography>
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle1" gutterBottom>
            Legal
          </Typography>
          <Typography variant="body2">Terms</Typography>
          <Typography variant="body2">Privacy</Typography>
        </Box>
      </Box>
      <CopyrightRight sx={{ mt: 5 }} />
    </Box>
  );
};
