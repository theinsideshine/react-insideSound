import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { albumsSlice } from "./slices/albums/albumsSlice";
import { tracksSlice } from "./slices/tracks/tracksSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        auth: authSlice.reducer,
        albums: albumsSlice.reducer,
        tracks: tracksSlice.reducer,
    }
});
