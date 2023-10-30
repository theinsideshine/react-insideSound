import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { Copyright } from './FooterLogin';





const initialLoginForm = {
  username: '',
  password: '',
}
export const LoginPage = () => {

  const { handlerLogin } = useAuth();
  
  const [loginForm, setLoginForm] =  useState(initialLoginForm);
 // console.log(loginForm);

  const onSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username =  data.get('username');
    const password =  data.get('password');

    if (!username || !password) {
        Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
    }
   console.log({username,password});
    // aca implementamos el login
    handlerLogin({username, password});
    
    setLoginForm(initialLoginForm);
}

  return (
    <>
      <Grid container /* component="main" sx={{ height: '100vh' }} */>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
        
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usdejareername"
                label="Username"
                name="username"
                autoComplete='off'
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
               
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"No tienes cuenta? Registrate"}
                  </Link>
                  
                </Grid>
                
              </Grid>
              <Link href="/" variant="body2">
                    {"Volver"}
              </Link>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
