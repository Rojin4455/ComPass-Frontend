import { createSlice } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import userProfileSlice from "./userProfileSlice";


const initialState = {
    content: "details",
    subContent:"",
}


const ownerScreen = createSlice({
    name:'ownerscreen',
    initialState,
    reducers: {
        setContent: (state,action) => {
            state.content = action.payload.content || state.content
            state.subContent = action.payload.subContent || state.subContent;
        }
    }
})


export const {setContent} = ownerScreen.actions

// const persistConfig = {
//     key: 'owner-screen',
//     storage
// }

export default ownerScreen.reducer;
