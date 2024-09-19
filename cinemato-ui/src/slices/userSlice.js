import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web

const initialState = {
    user: null,
    profilePhoto: null,
    status: 'anonymous',
    error: null,
    access_token: null,
    refresh_token: null,
    is_admin: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user || state.user;
            state.status = 'login';
            state.access_token = action.payload.access_token || state.access_token;
            state.refresh_token = action.payload.refresh_token || state.refresh_token;
            state.profilePhoto = action.payload.profilePhoto || state.profilePhoto;
            state.is_admin = action.payload.is_admin || state.is_admin;
        },
        clearUser: (state) => {
            state.user = null;
            state.status = 'anonymous';
            state.access_token = null;
            state.refresh_token = null;
            state.profilePhoto = null
            state.is_admin = null

        },
        setLoading: (state) => {
            state.status = 'loading';
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },
        setTokens: (state, action) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        clearTokens: (state) => {
            state.access_token = null;
            state.refresh_token = null;
        },
    },
});

// Export actions
export const { setUser, clearUser, setLoading, setError, setTokens, clearTokens } = userSlice.actions;

// Persist configuration
const persistConfig = {
    key: 'user',
    storage,
};

// Export the persisted reducer
export default persistReducer(persistConfig, userSlice.reducer);
