import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const initialState = {
    content: "personalDetails",
    page:'home'
}

const userProfile = createSlice({
    name:'userprofile',
    initialState,
    reducers: {
        setContent: (state,action) => {
            state.content = action.payload.content || state.content
            state.page = action.payload.page || state.page
        }
    }

})


export const {setContent} = userProfile.actions;

// const persistConfig = {
//     key: 'user-profile',
//     storage
// }


export default userProfile.reducer;