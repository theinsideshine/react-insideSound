import tracksApi from "../apis/tracksApi";

const BASE_URL = '';

export const serviceFindAllTrackByAlbumId = async(id) => {
    try {
        const response = tracksApi.get(`${BASE_URL}/by-album-id/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const serviceFindAlbumIdByTrackId = async(trackId) => {
    try {
        const response = tracksApi.get(`${BASE_URL}/${trackId}/album`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const serviceFindAllTrackByUser = async(username) => {
    try {
        const response = tracksApi.get(`${BASE_URL}/by-username/${username}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const serviceSaveTrack = async (formData) => {
    
    try {
        return await tracksApi.post(BASE_URL, formData);
    } catch (error) {
        throw error;
    }
}

export const serviceUpdateTrack = async (formData) => {

    const trackId = parseInt(formData.get('id'), 10); // Convert to number
    
    try {
        return await tracksApi.put(`${BASE_URL}/${trackId}`, formData);
    } catch (error) {
        throw error;
    }
}

export const serviceRemoveTrack = async (id) => {
    try {
        await tracksApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }    
}

export const serviceAssociateAlbumToTrack = async (trackId, albumId) => {
    try {
        const response = await tracksApi.post(`${BASE_URL}/${trackId}/associateAlbum?albumId=${albumId}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
