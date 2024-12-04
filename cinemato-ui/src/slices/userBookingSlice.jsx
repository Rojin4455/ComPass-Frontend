import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalSeatCount : null,
    selectedMovie : {},
    selectedTheater: null,
    selectedScreen: null,
    selectedSeats: [],
    addedSnacks:[],
    quantities:{},
    email:"",
    phone:"",
    isProceed:false,
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
            state.email = action.payload.email !==undefined ? action.payload.email : state.email
            state.phone = action.payload.phone !==undefined ? action.payload.phone : state.phone
            state.isProceed = action.payload.isProceed !==undefined ? action.payload.isProceed : state.isProceed

        },
        clearBooking:(state,action) => {
            state.totalSeatCount = null;
            state.selectedSeats = [];
            state.addedSnacks = [];
            state.quantities = {};
            state.selectedTheater = null;
            state.selectedScreen = null
            state.email = ''
            state.phone = ''
            state.isProceed = false
        }
        
    }
})

export const {setBooking, clearBooking} = bookingSlice.actions;

export default bookingSlice.reducer