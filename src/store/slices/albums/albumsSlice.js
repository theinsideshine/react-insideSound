import { createSlice } from "@reduxjs/toolkit";



export const initialAlbumForm = {
    id: 0,
    username: '',
    title: '',
    artist: '',
    age: '',
    albumprivate: false,
    imageURL: '',    
    
}

const initialAlbumErrors = {
    username: '',
    title: '',
    artist: '',
    age: '',
    albumprivate: false,
    imageURL: '',
}

export const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        albums: [],  
        albumSelected: initialAlbumForm,        
        errors: initialAlbumErrors,              
        isLoading: true,
    },
    reducers: {
        loadingAlbums: (state, { payload }) => {
            // console.log('payload='+payload);
            state.albums = payload;            
            state.isLoading = false;
        },
        addAlbum: (state, action) => {
            state.albums = [
                ...state.albums,
                {
                    ...action.payload,
                }
            ];
            state.albumSelected = initialAlbumForm;
            
        },
        removeAlbum: (state, action) => {
            state.albums = state.albums.filter(album => album.id !== action.payload);
        },
        updateAlbum: (state, action) => {
            state.albums = state.albums.map(a => {
                if (a.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                }
                return a;
            });
            state.albumSelected = initialAlbumForm;            
        },
        loadingAlbumError: (state, {payload}) => {
            state.errors = payload;
        },
    }
});

export const { loadingAlbums, addAlbum, removeAlbum, updateAlbum, loadingAlbumError } = albumsSlice.actions;