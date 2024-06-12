import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        p: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <IconButton /* onClick={toggleDarkMode} */ color="inherit" sx={{ marginLeft: '-8px' }}>
        <Brightness4Icon />
      </IconButton>
      <Typography variant="body1">
        ISound © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};
