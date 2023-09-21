import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/theinsideshine/react-insideSound">
        TheInsideShine
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const Footer = ({ toggleDarkMode }) => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Alinea verticalmente el contenido
      }}
      component="footer"
    >
      <div style={{ height: '24px' }}> {/* Establece una altura fija */}
        <IconButton color="inherit" onClick={toggleDarkMode}>
          <Brightness4Icon />
        </IconButton>
      </div>
      <Copyright />
    </Box>
  );
};


