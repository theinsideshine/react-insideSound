import React from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import backgroundImage from '../../../assets/moviola.png'; // Asegúrate de que la ruta sea correcta
import GoogleIcon from '@mui/icons-material/Google'; // Importar el ícono de Google
const SignupSection = () => {
  const theme = useTheme();

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
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.2)',
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
          Unete
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          No te quedes afuera!!
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: '100%',
            marginBottom: '10px',
            backgroundColor: '#f5f5f5',
            color: '#555',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={GoogleIcon} alt="Google Icon" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
          Entra con la cuenta de Google
        </Button>
        <Typography variant="body2" gutterBottom align="center">
          o
        </Typography>
        <TextField
          label="Entra con Email"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: '10px',
            '& .MuiInputLabel-root': {
              color: theme.palette.text.primary,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.light,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
        <TextField
          label="Direccion de Email"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: '20px',
            '& .MuiInputLabel-root': {
              color: theme.palette.text.primary,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.light,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
        <Button
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
          Esta de acuerdo con la politicas de privacidad
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupSection;
