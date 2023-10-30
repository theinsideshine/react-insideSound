import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme} from '@mui/material/styles';
import { useUsers } from '../../hooks/useUsers';
import { Copyright } from './FooterLogin';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {


    const { initialUserForm, handlerAddUser, errors } = useUsers();
    

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    });    
        
    handlerAddUser({        
                    id:0,
                    username:data.get('username') ,
                    email:data.get('email') ,
                    password:data.get('password'),
                    admin: false
                  });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                />
                {errors && errors.username && (
                <Alert severity="error">
                  {errors.username}
                </Alert>
              )}
              </Grid>

             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errors && errors.email && (
                <Alert severity="error">
                  {errors.email}
                </Alert>
              )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Tienes una cuenta? Entrar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Link href="/" variant="body2">
                    {"Volver"}
         </Link>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}

