import { createSlice } from "@reduxjs/toolkit";
import NowShowing from "../components/User/Home/NowShowing/NowShowing";



const initialState = {
    address : null,
    lan: null,
    lng: null,
    showModal: true,
    display: false,
    isLocation:false,
    nowShowing:[],
    upComing:[],
    futureShowing:[],   

}

const locationSlice = createSlice({
    name:'location',
    initialState,
    reducers : {
        setLocation: (state,action) => {
            state.address = action.payload.address || state.address;
            state.lat = action.payload.lat || state.lat;
            state.lng = action.payload.lng || state.lng;
            state.showModal = action.payload.address ? false : state.showModal;
            state.display = action.payload.display ? true: false
            state.isLocation = action.payload.isLocation === undefined ? state.isLocation : action.payload.isLocation
            state.nowShowing = action.payload.nowShowing || state.nowShowing;
            state.upComing = action.payload.upComing || state.upComing;
            state.futureShowing = action.payload.futureShowing || state.futureShowing;
        }
    }
})



export const {setLocation} = locationSlice.actions;

export default locationSlice.reducer