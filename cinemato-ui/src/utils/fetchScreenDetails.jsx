// import React from "react";
// import { useDispatch } from "react-redux";
// import { setScreen } from "../slices/screenFullDetailsSlice";
// import useAxiosInstance from "../axiosConfig";
//     const fetchTheaterDetails = async (id) => {
//         const dispatch = useDispatch()
//         const axiosInstance = useAxiosInstance()

//         try {
//             const response = await axiosInstance.get(`theater/screen-details/${id}`)
//             if (response.status === 200) {
//                 console.log("response got: ", response)
//                 dispatch(setScreen({screen:response.data.data}))
//             } else {
//                 console.error("error response: ", response)
//             }
//         } catch (error) {
//             console.error("something went wrong: ", error)
//         }

//         return
//     }

    


// export default fetchTheaterDetails