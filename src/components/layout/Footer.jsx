import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.youtube.com/@educacionytecnologiaaplica2512">
                TheInsideShine
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', p: 2 }} component="footer">
            <Copyright />
        </Box>
    );
};


