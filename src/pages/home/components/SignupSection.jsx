import React from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import backgroundImage from '../../../assets/moviola.png'; // Asegúrate de que la ruta sea correcta
import GoogleIcon from '@mui/icons-material/Google'; // Importar el ícono de Google
import { useNavigate } from 'react-router-dom';


const SignupSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const clickLogin = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
          zIndex: 1,
        },
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '40px 20px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '16px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          ¡Únete!
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          ¡No te quedes afuera!
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: '100%',
            marginBottom: '10px',
            backgroundColor: theme.palette.background.default,
            color: '#555',
            '&:hover': {
              backgroundColor:'gray' ,
            },
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GoogleIcon sx={{ marginRight: '8px' }} />
          Entra con la cuenta de Google
        </Button>
        <Typography variant="body2" gutterBottom align="center">
          o
        </Typography>
        
        <Button onClick={clickLogin}
          variant="contained"
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Entrar con Email
        </Button>
        <Typography variant="caption" display="block" sx={{ marginTop: '10px', color: theme.palette.text.primary, textAlign: 'center' }}>
          Estás de acuerdo con la política de privacidad
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupSection;

