import { createSlice } from "@reduxjs/toolkit";

// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// const today = new Date();
// const dates = [];

// const date = new Date(today);
// date.setDate(today.getDate());

// const day = String(date.getDate()).padStart(2, '0');
// const month = months[date.getMonth()];
// const dayOfWeek = daysOfWeek[date.getDay()];
// dates.push({ day, month, dayOfWeek });


const initialState = {
    allDates : null,
    selectedDate : 0,
    selectedTime: null,
    selectedTimeOg: null,
}
const dateSlice = createSlice({
    name:'date',
    initialState,
    reducers : {
        setDate: (state,action) => {
            state.selectedDate = action.payload.selectedDate!==undefined ? action.payload.selectedDate : state.selectedDate
            state.selectedTime = action.payload.selectedTime!==undefined ? action.payload.selectedTime : state.selectedTime
            state.allDates = action.payload.allDates!==undefined ? action.payload.allDates : state.allDates
            state.selectedTimeOg = action.payload.selectedTimeOg!==undefined ? action.payload.selectedTimeOg : state.selectedTimeOg
        },
        clearDates: (state, action) => {
            state.selectedDate = 0;
            state.selectedTime = null;
            state.allDates = null;
            state.selectedTimeOg = null;
        }

        
    }
})


export const {setDate, clearDates} = dateSlice.actions;

export default dateSlice.reducer