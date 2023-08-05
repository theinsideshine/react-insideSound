import { createSlice } from "@reduxjs/toolkit";

export const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        albums: [],                
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