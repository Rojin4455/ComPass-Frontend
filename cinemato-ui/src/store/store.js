import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import { persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web
import userProfileReducer from '../slices/userProfileSlice';
import adminFilterReducer from '../slices/adminMovieFilterSlice'
import OwnerScreenReducer from '../slices/OwnerScreenSlice';
import ScreenDetailsReducer from '../slices/screenFullDetailsSlice'
import UserLocationReducer from '../slices/userLocationSlice'
import DateReducer from '../slices/userSelectedDateSlice'
import BookingReducer from '../slices/userBookingSlice'

// Combine reducers if you have more slices
const rootReducer = combineReducers({
    user: userReducer,
    userprofile: userProfileReducer,
    adminfilter:adminFilterReducer,
    ownerscreen:OwnerScreenReducer,
    screendetails:ScreenDetailsReducer,
    location:UserLocationReducer,
    date:DateReducer,
    booking:BookingReducer,

});

// Create persist configuration
const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['user','userProfile','adminfilter','ownerscreen'],
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