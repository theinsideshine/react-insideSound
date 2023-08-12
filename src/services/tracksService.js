
import tracksApi from "../apis/tracksApi";



const BASE_URL = '';

export const findAllId = async(id) => {
    try {
        const response = tracksApi.get(`${BASE_URL}/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const findAllByAlbumId = async(id) => {
    try {
        const response = tracksApi.get(`${BASE_URL}/by-album-id/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
