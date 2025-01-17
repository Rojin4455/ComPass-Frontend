import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const initialState = {
    user: null,
    profilePhoto: null, 
    status: 'anonymous',
    error: null,
    access_token: null,
    refresh_token: null,
    is_admin: null,
    is_user:null,
    is_owner:null,
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
            state.is_user = action.payload.is_user || state.is_user;
            state.is_owner = action.payload.is_owner || state.is_owner;
            
        },
        clearUser: (state) => {
            state.user = null;
            state.status = 'anonymous';
            state.access_token = null;
            state.refresh_token = null;
            state.profilePhoto = null
            state.is_admin = null
            state.is_user = null
            state.is_owner = null
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
// const persistConfig = {
//     key: 'user',
//     storage,
// };

// Export the persisted reducer
export default userSlice.reducer;
