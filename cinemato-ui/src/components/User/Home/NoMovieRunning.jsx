import React from 'react'
import { FaSadTear } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../slices/userLocationSlice';
function NoMovieRunning() {

    const dispatch = useDispatch()
    return (
        <div className="flex flex-col items-center justify-center mt-7 mb-7 bg-white text-gray-800">
          {/* Icon/Illustration */}
          <div className="p-8 bg-gray-100 rounded-full shadow-lg">
            <FaSadTear className="text-8xl text-gray-400 opacity-75" />
          </div>
    
          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-bold mt-8 text-center">
            No Movies Available Nearby
          </h2>
          <p className="text-md md:text-lg text-gray-500 mt-4 max-w-md text-center">
            Looks like there are no movies playing in theaters near your location. 
          </p>
    
          {/* Action */}
          <button
            onClick={() => dispatch(setLocation({display:true}))}
            className="mt-8 px-6 py-3 bg-primary text-white font-semibold text-lg rounded-md shadow-md hover:bg-primaryhover transition duration-300"
          >
            Explore Other Locations
          </button>
    
          {/* Optional Additional Text */}
          <p className="text-sm text-gray-400 mt-6 text-center">
            Can't find any movies nearby? Try other locations for the latest releases!
          </p>
        </div>
      );
}

export default NoMovieRunning