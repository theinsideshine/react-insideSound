import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

export const Footer = ({ toggleDarkMode }) => {
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

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
      <IconButton onClick={toggleDarkMode} color="inherit" sx={{ marginLeft: '-8px' }}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Typography variant="body1">
        ISound © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

