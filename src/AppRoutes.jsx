import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './auth/pages/LoginPage';
import { HomePage } from './pages/home/HomePage';
import { useSelector } from 'react-redux';
import SignUp from './auth/pages/SignUpPage';
import { UserRoutes } from './routes/UserRoutes';
import { HomePageAlbum } from './pages/home/HomePageAlbum';
import { HomePagePlay } from './pages/home/HomePagePlay';
import { useMediaQuery } from "@mui/material";
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

export const AppRoutes = ({ toggleDarkMode }) => {

    const { isAuth } = useSelector(state => state.auth);
    
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
                    {
                        isAuth
                            ? (
                                <Route path='/*' element={<UserRoutes />} />
                            )
                            : <>
                                <Route path='/login' element={<LoginPage />} />
                                <Route path='/signup' element={<SignUp />} />
                                <Route path='/*' element={<HomePage/>} />
                                <Route path="/home/albums/:username" element={<HomePageAlbum/>} />
                                <Route path="albums/homeplay/:id" element={<HomePagePlay />} />
                            </>

                    }
                </Routes>
            </div>
            <Footer toggleDarkMode={toggleDarkMode}/>
       </div>
    );
}