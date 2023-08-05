import axios from "axios";

const albumsApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_MSVC_ALBUM_URL}/albums`
});

albumsApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default albumsApi;