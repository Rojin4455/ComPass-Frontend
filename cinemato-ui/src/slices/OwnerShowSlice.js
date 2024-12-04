import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";


const initialState = {
    allSeats: {},
    movie:{},
    totalSeatCount : null,
    selectedSeats: [],
    quantities:{},
    isProceed:false,
    times:[],
    formattedFrontendDate:null,
    allScreens:{},
    selectedTheater:{},
    selectedDate:{}
}



const OwnerShowSlice = createSlice({
    name:'ownershow',
    initialState,
    reducers: {
        setShow:(state, action) => {
            state.allSeats= action.payload.allSeats ?? state.allSeats
            state.totalSeatCount = action.payload.totalSeatCount ?? state.totalSeatCount
            state.selectedSeats= action.payload.selectedSeats ?? state.selectedSeats
            state.quantities= action.payload.quantities ?? state.quantities
            state.isProceed= action.payload.isProceed !==undefined ? action.payload.isProceed : state.isProceed
            state.times= action.payload.times ?? state.times
            state.formattedFrontendDate=action.payload.formattedFrontendDate?? state.formattedFrontendDate
            state.allScreens= action.payload.allScreens ?? state.allScreens
            state.movie= action.payload.movie ?? state.movie
            state.selectedTheater= action.payload.selectedTheater ?? state.selectedTheater
            state.selectedDate= action.payload.selectedDate ?? state.selectedDate
        },

        clearShow:(state,action) => {
            state.allSeats= {};
            state.totalSeatCount = null;
            state.selectedSeats= [];
            state.quantities={};
            state.isProceed=false;
            state.times=[];
            state.formattedFrontendDate=null;
            state.allScreens={};
            state.movie={};
            state.theaterDetails={};
            state.selectedDate = {};
        }
    }
})


export const {setShow, clearShow} = OwnerShowSlice.actions

export default OwnerShowSlice.reducer