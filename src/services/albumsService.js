import albumsApi from "../apis/albumsApi";


const BASE_URL = '';

export const serviceFindAllAlbumByUsername = async(username) => {
    try {
        const response = albumsApi.get(`${BASE_URL}/by-username/${username}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const serviceFindPublicAlbumsByUsername = async(username) => {
    try {
        const response = albumsApi.get(`${BASE_URL}/public/by-username/${username}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export const serviceFindAllAlbum = async() => {
    try {
        const response = await albumsApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }

    
}

export const serviceSaveAlbum = async (formData) => {
    
    try {
        return await albumsApi.post(BASE_URL, formData);
    } catch (error) {
        throw error;
    }
}

export const serviceUpdateAlbum = async (formData) => {

    const albumId = parseInt(formData.get('id'), 10); // Convert to number
    
    try {
        return await albumsApi.put(`${BASE_URL}/${albumId}`, formData);
    } catch (error) {
        throw error;
    }
}

export const serviceRemoveAlbum = async (id) => {
    try {
        await albumsApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}