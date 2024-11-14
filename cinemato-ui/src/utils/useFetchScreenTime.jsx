// import { useState, useEffect } from 'react';
// import useAxiosInstance from '../axiosConfig';

// const useFetchScreenTime = (screen_id) => {
//     const axiosInstance = useAxiosInstance();
//     const [addedTimes, setAddedTimes] = useState([]);

//     useEffect(() => {
//         const fetchTimes = async () => {
//             try {
//                 const response = await axiosInstance.get(`screen/screen-time/${screen_id}`);
//                 if (response.status === 200) {
//                     const times = response.data.data.show_times.map((showTime) => new Date(showTime.start_time));
//                     setAddedTimes(times);
//                 } else {
//                     console.error("Error response", response);
//                 }
//             } catch (error) {
//                 console.error("Something went wrong", error);
//             }
//         };

//         fetchTimes();
//     }, [screen_id, axiosInstance]);

//     return addedTimes;
// };

// export default useFetchScreenTime;
