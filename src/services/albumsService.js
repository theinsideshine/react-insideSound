import albumsApi from "../apis/albumsApi";


const BASE_URL = '';

export const findAll = async() => {
    try {
        const response = await albumsApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

