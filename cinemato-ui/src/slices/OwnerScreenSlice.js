import React from "react";
import { createSlice } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import userProfileSlice from "./userProfileSlice";


const initialState = {
    content: "details",
    subContent: "",
    snackContent: ''
}


const ownerScreen = createSlice({
    name: 'ownerscreen',
    initialState,
    reducers: {
        setContent: (state, action) => {
            state.content = action.payload.content || state.content
            state.subContent = action.payload.subContent || state.subContent;
            state.snackContent = action.payload.snackContent || state.snackContent;
        },
        clearContent: (state, action) => {
            state.content = "details";
            state.subContent = "";
            state.snackContent = '';
        }
    }
})


export const { setContent, clearContent } = ownerScreen.actions

// const persistConfig = {
//     key: 'owner-screen',
//     storage
// }

export default ownerScreen.reducer;
