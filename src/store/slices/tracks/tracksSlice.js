import { createSlice } from "@reduxjs/toolkit";


export const tracksSlice = createSlice({
    name: 'tracks',
    initialState: {
        tracks: [],                
        isLoading: true,
    },
    reducers: {
        loadingTracks: (state, { payload }) => {
            // console.log('payload='+payload);
            state.tracks = payload;            
            state.isLoading = false;
        },
    }
});

export const { loadingTracks } = tracksSlice.actions;