import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalSeatCount : null,
    selectedMovie : {},
    selectedTheater: null,
    selectedScreen: null,
    selectedSeats: [],
    addedSnacks:[],
    quantities:{},
}


const bookingSlice = createSlice({
    name:'booking',
    initialState,
    reducers : {
        setBooking:(state,action) => {
            state.totalSeatCount = action.payload.totalSeatCount !== undefined ? action.payload.totalSeatCount : state.totalSeatCount
            state.selectedMovie = action.payload.selectedMovie !== undefined ? action.payload.selectedMovie : state.selectedMovie
            state.selectedTheater = action.payload.selectedTheater !==undefined ? action.payload.selectedTheater : state.selectedTheater
            state.selectedScreen = action.payload.selectedScreen !==undefined ? action.payload.selectedScreen : state.selectedScreen
            state.selectedSeats = action.payload.selectedSeats !==undefined ? action.payload.selectedSeats : state.selectedSeats
            state.addedSnacks = action.payload.addedSnacks !==undefined ? action.payload.addedSnacks : state.addedSnacks
            state.quantities = action.payload.quantities !==undefined ? action.payload.quantities : state.quantities

        },
        clearBooking:(state,action) => {
            state.totalSeatCount = null;
            state.selectedSeats = [];
            state.addedSnacks = [];
            state.quantities = {};
            state.selectedTheater = null;
            state.selectedScreen = null
        }
        
    }
})

export const {setBooking, clearBooking} = bookingSlice.actions;

export default bookingSlice.reducer