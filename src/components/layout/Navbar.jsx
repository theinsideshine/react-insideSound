import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

import HomeIcon from "@mui/icons-material/Home"; // Importa el ícono que desees
import AlbumIcon from "@mui/icons-material/Album"; // Importa el ícono que desees
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // Importa el ícono que desees
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Importa el ícono que desees
import PeopleIcon from "@mui/icons-material/People"; // Importa el ícono que desees


export const Navbar = () => {
  const { login, handlerLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <AppBar position="static" style={{ height: "55px" }}>
      <Toolbar>
        <Hidden mdUp>
          {/* Mostrar el botón del menú hamburguesa en pantallas más pequeñas */}
          <IconButton color="inherit" edge="start" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
        </Hidden>

        <div>
          <Typography variant="h6" component={Link} to="/" color="inherit" style={{ textDecoration: "none" }}>
            InsideSound
          </Typography>
        </div>

        <Hidden smDown>
          {/* Mostrar el menú de escritorio en pantallas más grandes */}
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
        </Hidden>

        {/* Mostrar el menú Drawer en pantallas más pequeñas */}
        <Hidden mdUp>
        
          <Drawer anchor="left" open={menuOpen} onClose={closeMenu} variant="temporary" >
          <div style={{ width: "250px"}} >
              <List>
                <ListItem  component={Link} to="/albums" onClick={closeMenu}>
                  <ListItemIcon>
                    <AlbumIcon /> {/* Icono para Albumes */}
                  </ListItemIcon>
                  <ListItemText primary="Albumes" />
                </ListItem>
                <ListItem  component={Link} to="/tracks" onClick={closeMenu}>
                  <ListItemIcon>
                    <MusicNoteIcon /> {/* Icono para Canciones */}
                  </ListItemIcon>
                  <ListItemText primary="Canciones" />
                </ListItem>
                <ListItem  component={Link} to="/tracks/register" onClick={closeMenu}>
                  <ListItemIcon>
                  <CloudUploadIcon /> {/* Icono para Subir */}
                  </ListItemIcon>
                  <ListItemText primary="Subir" />
                </ListItem>
                {login.isAdmin && (
                  <ListItem  component={Link} to="/users" onClick={closeMenu}>
                    <ListItemIcon>
                      <PeopleIcon /> {/* Icono para Usuarios */}
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                  </ListItem>
                )}
              </List>
            </div>
          </Drawer>
          
        </Hidden>

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
