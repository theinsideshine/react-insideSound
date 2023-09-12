import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { RegisterPage } from "../pages/users/RegisterPage"
import { UsersPage } from "../pages/users/UsersPage"
import { useSelector } from "react-redux"
import AlbumPage from "../pages/albums/AlbumPage"


import TrackPage from "../pages/tracks/TrackPage"
import RegisterTrackPage from "../pages/tracks/RegisterTrackPage"
import { Footer } from "../components/layout/Footer"
import { AlbumPlayPage } from "../pages/albums/AlbumPlayPage"
import RegisterAlbumPage from "../pages/albums/RegisterAlbumPage"

import { useMediaQuery } from "@mui/material";



export const UserRoutes = () => {
    const { isAdmin } = useSelector(state => state.auth);

     // Utiliza el breakpoint "sm" de Material-UI
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
            <Navbar />
            <div style={{ flex: 1,
                         marginBottom: "20px",
                         padding: isSmallScreen ? "10px" : "20px", // Ajusta el espacio según el breakpoint          
                         }}>
                <Routes>
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/page/:page" element={<UsersPage />} />
                    <Route path="albums" element={<AlbumPage />} />
                    <Route path="albums/play/:id" element={<AlbumPlayPage />} />
                    <Route path="albums/register" element={<RegisterAlbumPage/>} />
                    <Route path="albums/edit/:id" element={<RegisterAlbumPage/>} />

                    <Route path="tracks/" element={<TrackPage />} />
                    <Route path="tracks/edit/:id" element={<RegisterTrackPage/>} />
                    <Route path="tracks/register" element={<RegisterTrackPage/>} />

                    {!isAdmin || <>
                        
                        <Route path="users/edit/:id" element={<RegisterPage />} />
                    </>
                    }
                    {/* <Route path="/" element={<Navigate to="/users" />} /> */}
                    <Route path="/" element={<Navigate to="/albums" />} />
                </Routes>
            </div>
            <Footer />
       </div>
      
    )
}