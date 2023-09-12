import { createSlice } from "@reduxjs/toolkit";


export const initialTrackForm = {
    id: 0,
    username: '',
    title: '',
    imageURL: '',
    mp3URL: '',
}

const initialTrackErrors = {
    username: '',
    title: '',
    imageFile: '',
    mp3File: '',
}


export const tracksSlice = createSlice({
    name: 'tracks',
    initialState: {
        tracks: [], 
        trackSelected: initialTrackForm,   
        visibleModalForm: false,     
        errors: initialTrackErrors,               
        isLoading: true,
    },
    reducers: {
        loadingTracks: (state, { payload }) => {            
            state.tracks = payload;            
            state.isLoading = false;
        },
        addTrack: (state, action) => {
            state.tracks = [
                ...state.tracks,
                {
                    ...action.payload,
                }
            ];
            state.trackSelected = initialTrackForm;
            
        },
        removeTrack: (state, action) => {
            state.tracks = state.tracks.filter(track => track.id !== action.payload);
        },
        updateTrack: (state, action) => {
            state.tracks = state.tracks.map(t => {
                if (t.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                }
                return t;
            });
            state.trackSelected = initialTrackForm;            
        },
        onTrackSelectedModalForm: (state, { payload }) => {
            state.trackSelected = payload;
            state.visibleModalForm = true;
        },
        onOpenTrackModalForm: (state) => {
            state.visibleModalForm = true;
        },
        onCloseTrackModalForm: (state) => {
            state.visibleModalForm = false;          
        },
        loadingTrackError: (state, {payload}) => {
            state.errors = payload;
        },
       
    }
});

export const { 
    loadingTracks,
    addTrack,
    loadingTrackError,
    removeTrack,
    updateTrack,
    onTrackSelectedModalForm,
    onOpenTrackModalForm,
    onCloseTrackModalForm } = tracksSlice.actions;