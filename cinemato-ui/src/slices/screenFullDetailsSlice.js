import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    theater:{},
    screen:{},
    showScreen:{},
    showScreenBacic:{}
}


const screenDetails = createSlice({
    name:'screendetails',
    initialState,
    reducers: {
        setScreen: (state,action) => {
            state.theater = action.payload.theater || state.theater
            state.screen = action.payload.screen || state.screen
            state.showScreen = action.payload.showScreen || state.showScreen
            state.showScreenBacic = action.payload.showScreenBacic || state.showScreenBacic
        },
        clearScreen: (state,action) => {
            state.screen = {}
            state.showScreen = {}
            state.showScreenBacic = {}
        }
    }
})

export const {setScreen, clearScreen} = screenDetails.actions

export default screenDetails.reducer;








// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import useAxiosInstance from "../axiosConfig";
// // Async thunk to fetch theater screen details
// const axiosInstance = useAxiosInstance()
// export const fetchTheaterDetails = createAsyncThunk(
//   'screendetails/fetchTheaterDetails',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`theater/screen-details/${id}`);
//       if (response.status === 200) {
//         return response.data.data;
//       } else {
//         return rejectWithValue("Failed to fetch theater details");
//       }
//     } catch (error) {
//       return rejectWithValue(error.message || "Something went wrong");
//     }
//   }
// );

// // Redux slice
// const screenDetailsSlice = createSlice({
//   name: 'screendetails',
//   initialState: {
//     screen: {}, // Initial empty screen object
//     loading: false, // For tracking loading state
//     error: null, // For tracking errors
//   },
//   reducers: {
//     setScreen: (state, action) => {
//       state.screen = action.payload.screen; // Manually setting screen details
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTheaterDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTheaterDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.screen = action.payload; // Set the fetched screen details
//       })
//       .addCase(fetchTheaterDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; // Capture any errors
//       });
//   },
// });

// export const { setScreen } = screenDetailsSlice.actions;

// export default screenDetailsSlice.reducer;
