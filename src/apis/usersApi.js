import axios from "axios";

const usersApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_MSVC_SECURITY_URL}/users`
});

usersApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default usersApi;