import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { RegisterPage } from "../pages/RegisterPage"
import { UsersPage } from "../pages/UsersPage"
import { useSelector } from "react-redux"
import AlbumPage from "../pages/AlbumPage"

export const UserRoutes = () => {
    const { isAdmin } = useSelector(state => state.auth);
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="users" element={<UsersPage />} />
                <Route path="users/page/:page" element={<UsersPage />} />
                <Route path="albums" element={<AlbumPage />} />

                {!isAdmin || <>
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="users/edit/:id" element={<RegisterPage />} />
                </>
                }
                {/* <Route path="/" element={<Navigate to="/users" />} /> */}
                <Route path="/" element={<Navigate to="/albums" />} />
            </Routes>
        </>
    )
}