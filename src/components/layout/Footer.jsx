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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        p: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      
      <CopyrightRight sx={{ mt: 5 }} />
      
    </Box>
  );
};
