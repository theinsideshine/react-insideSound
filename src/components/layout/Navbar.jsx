import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import SearchIcon from "@mui/icons-material/Search";
import AlbumIcon from "@mui/icons-material/Album";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PeopleIcon from "@mui/icons-material/People";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { serviceFindAllUsernames } from "../../services/userService";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles"; // Importa useTheme

export const Navbar = () => {
  const theme = useTheme(); // Obtiene el tema personalizado del contexto

  const navigate = useNavigate();
  const { login, handlerLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [usernames, setUsernames] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const clickLogin = () => {
    navigate('/login');
  }

  const clickSignup = () => {
    navigate('/signup');
  }

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);
  };

  const userNoexist =() => {
    console.log("Nombre de usuario no válido");
      Swal.fire(
        'No encontrado!',
        'El usuario no existe!',
        'warning'
    );
  }

  const navigateHomePageAlbum =() => {
    console.log("Nombre de usuario:", searchQuery);
     navigate(`/home/albums/${searchQuery}`);
}

  const handleSearchIconClick = () => {
    if (usernames.includes(searchQuery)) {
      console.log("Nombre de usuario:", searchQuery);
      navigateHomePageAlbum();
    } else {
      
      userNoexist();
    }
  };  

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      if (usernames.includes(searchQuery)) {
        navigateHomePageAlbum();
      } else {
        userNoexist();
       
      }
    }
  };

  useEffect(() => {
    async function loadUsernames() {
      try {
        const usernamesResponse = await serviceFindAllUsernames();
        setUsernames(usernamesResponse);
      } catch (error) {
        console.error("Error al cargar los nombres de usuario:", error);
      }
    }

    loadUsernames();
  }, []);

  return (
    <AppBar position="static" style={{ height: "55px" }}>
      <Toolbar>
        <Hidden mdUp>
          <IconButton color="inherit" edge="start" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
        </Hidden>

        <div>
          <Typography variant="h7" component={Link} to="/" color="inherit" style={{ textDecoration: "none" }}>
            ISound
          </Typography>
        </div>

        <Hidden smDown>
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

        <Hidden mdUp>
          <Drawer anchor="left" 
                  open={menuOpen}
                  onClose={closeMenu}
                  variant="temporary"                 

                  PaperProps={{
                    style: {
                      width: "250px",
                    },
                  }}
                   >
            <div style={{ width: "250px" }}>
              <List>
                <ListItem component={Link} to="/albums" onClick={closeMenu}>
                  <ListItemIcon>
                    <AlbumIcon />
                  </ListItemIcon>
                  <ListItemText primary="Albumes" primaryTypographyProps={{ color: theme.palette.primary.main }}/>
                </ListItem>
                <ListItem component={Link} to="/tracks" onClick={closeMenu}>
                  <ListItemIcon>
                    <MusicNoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Canciones" primaryTypographyProps={{ color: theme.palette.primary.main }}/>
                </ListItem>
                <ListItem component={Link} to="/tracks/register" onClick={closeMenu}>
                  <ListItemIcon>
                    <CloudUploadIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subir" primaryTypographyProps={{ color: theme.palette.primary.main }} />
                </ListItem>
                {login.isAdmin && (
                  <ListItem component={Link} to="/users" onClick={closeMenu}>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" primaryTypographyProps={{ color: theme.palette.primary.main }}/>
                    
                  </ListItem>
                )}
              </List>
            </div>
          </Drawer>
        </Hidden>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
        <SearchIcon style={{ cursor: "pointer" }} onClick={handleSearchIconClick} />
          {/* Condición para mostrar la barra de búsqueda solo si el usuario no ha iniciado sesión */}
            {!login.isAuth && (
              <>
                
                <input
                  type="text"
                  placeholder="Usuarios"
                  value={searchQuery}
                  style={{ width: '100px' }}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchSubmit}
                />
                
              </>
            )}


          {searchResults.length > 0 && (
            <div style={{ position: "absolute", top: "60px", left: "0", right: "0", background: "#fff", zIndex: "999" }}>
              <List>
                {searchResults.map((user) => (
                  <ListItem
                    button
                    key={user.id}
                    component={Link}
                    to={`/user/${user.username}`}
                    onClick={closeMenu}
                  >
                    <ListItemText primary={user.username} />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
          <Typography variant="body1" color="inherit" style={{ marginRight: "10px" }}>
            {login.user?.username}
          </Typography>
          {login.user?.username ? (
            
            <LogoutIcon style={{ cursor: "pointer" }} onClick={handlerLogout} />
          ) : (
            <>
             <LoginIcon style={{ cursor: "pointer" }} onClick={clickLogin} />
             <AppRegistrationIcon style={{ cursor: "pointer" }} onClick={clickSignup} />
            
           </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
