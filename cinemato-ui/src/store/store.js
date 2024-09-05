import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import { persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web


// Combine reducers if you have more slices
const rootReducer = combineReducers({
    user: userReducer,
});

// Create persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // Only persist the user slice
};


const persistedReducer = persistReducer(persistConfig, rootReducer);



// Create the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable the serializable check for redux-persist
        }),
});



// Create a persistor
const persistor = persistStore(store);


export {store, persistor};