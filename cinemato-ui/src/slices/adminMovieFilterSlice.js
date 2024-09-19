import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const initialState = {
    language : "ml",
    genre:35,
}


const adminFilterSlice = createSlice({
    name:"adminFilter",
    initialState,
    reducers: {
        setFilter: (state,action) => {
            state.language = action.payload.language || action.language
            state.genre = action.payload.genre || action.genre
        },
        clearFilter: (state) => {
            state.language = initialState.language
            state.genre = initialState.genre
        }
    }
})

export const {setFilter,clearFilter} = adminFilterSlice.actions;

const persistConfig = {
    key:'adminFilter',
    storage
}

export default persistReducer(persistConfig, adminFilterSlice.reducer);

