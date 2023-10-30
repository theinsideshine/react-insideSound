import axios from "axios";

const tracksApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_MSVC_TRACK_URL}`
});

tracksApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default tracksApi;