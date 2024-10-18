import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const initialState = {
    content: "personalDetails"
}

const userProfile = createSlice({
    name:'userprofile',
    initialState,
    reducers: {
        setContent: (state,action) => {
            state.content = action.payload.content
        }
    }

})


export const {setContent} = userProfile.actions;

// const persistConfig = {
//     key: 'user-profile',
//     storage
// }


export default userProfile.reducer;