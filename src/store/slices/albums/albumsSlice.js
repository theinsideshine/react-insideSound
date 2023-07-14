import { createSlice } from "@reduxjs/toolkit";
import AlbumData from "../../../pages/albums/data/AlbumData";



export const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        albums: AlbumData.album,                
        isLoading: true,
    },
    reducers: {
        loadingAlbums: (state, { payload }) => {
            // console.log('payload='+payload);
            state.albums = payload;            
            state.isLoading = false;
        },
    }
});

export const { loadingAlbums } = albumsSlice.actions;