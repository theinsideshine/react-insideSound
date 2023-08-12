import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './auth/pages/LoginPage';
import { UserRoutes } from './routes/UserRoutes';
import { useSelector } from 'react-redux';
import SignUp from './auth/pages/SignUpPage';

export const AppRoutes = () => {

    const { isAuth } = useSelector(state => state.auth);

    return (
        <Routes>
            {
                isAuth
                    ? (
                        <Route path='/*' element={<UserRoutes />} />
                    )
                    : <>
                        <Route path='/*' element={<UserRoutes />}/>
                        {/*Se saco loggeo
                         <Route path='/login' element={<LoginPage />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/*' element={<Navigate to="/login" />} /> */}
                    </>

            }
        </Routes>
    );
}