import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export const Navbar = () => {
  const { login, handlerLogout } = useAuth();

  return (
    <AppBar position="static" style={{ height: "55px" }}>
      <Toolbar>
        <div>
          <Typography variant="h6" component={Link} to="/" color="inherit" style={{ textDecoration: "none" }}>
            InsideSound
          </Typography>
          
          <Button color="inherit" component={Link} to="/albums">
            Albumes
          </Button>
          <Button color="inherit" component={Link} to="/tracks">
            Canciones
          </Button>
          <Button color="inherit" component={Link} to="/tracks/register">
            Subir
          </Button>
          {login.isAdmin && (
            <Button color="inherit" component={Link} to="/users">
              Usuarios
            </Button>
          )}
        </div>
        
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <Typography variant="body1" color="inherit" style={{ marginRight: "10px" }}>
            {login.user?.username}
          </Typography>
          <Button color="inherit" onClick={handlerLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
